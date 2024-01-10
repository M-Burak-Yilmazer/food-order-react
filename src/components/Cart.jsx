import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";

export default function Cart(){
    const cartctx=useContext(CartContext)
 
 return <Modal className="cart">
        <h2>Your Cart </h2>
        <ul>
{
    cartctx.items.map((item)=>{
        <li key={item.id}>{item.name}-{item.quantity}</li>
    })
}
        </ul>
    </Modal>
}