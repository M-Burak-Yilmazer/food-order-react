import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "./util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (sum, int) => sum + int.quantity * int.price,
    0
  );
  const userProgressctx = useContext(UserProgressContext);
  function closeCheckout() {
    userProgressctx.hideCheckout();
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    console.log(fd);
    const customerData = Object.fromEntries(fd.entries());
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }
  return (
    <Modal
      open={userProgressctx.progress === "checkout"}
      onClose={closeCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p> Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street " type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />

          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button onClick={closeCheckout} type="button" textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
