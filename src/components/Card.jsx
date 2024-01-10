import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "./util/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import CardItem from "./CardItem";

export default function Card() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (sum, int) => sum + int.quantity * int.price,
    0
  );
  const userProgressCtx = useContext(UserProgressContext);

  function handleCloseCart() {
    userProgressCtx.hideCart();
    console.log("handleClose");
  }
  console.log(cartCtx);
  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart </h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CardItem
              key={item.id}
              item={item}
              onDecrease={() => cartCtx.removeItem(item.id)}
              onIncrease={() => cartCtx.addItem(item)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={() => handleCloseCart()} textOnly>
          Close
        </Button>
        <Button onClick={handleCloseCart}> Go To Checkout</Button>
      </p>
    </Modal>
  );
}
