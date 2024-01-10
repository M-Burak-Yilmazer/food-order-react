import { currencyFormatter } from "./util/formatting";

export default function CardItem({ item, onDecrease, onIncrease }) {
  const { name, price, quantity } = item;
  return (
    <li className="cart-item">
      <p>
        {name}-{quantity}*{currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
