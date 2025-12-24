import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, clearCart, removeItem, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-container">
                <h1>No hay items en el carrito</h1>
                <Link to="/" className="Option">Productos</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            {cart.map(p => (
                <div key={p.id} className="cart-item">
                    <h3>{p.name}</h3>
                    <p>Cantidad: {p.quantity}</p>
                    <p>Precio x unidad: ${p.price}</p>
                    <p>Subtotal: ${p.quantity * p.price}</p>
                    <button onClick={() => removeItem(p.id)} className="Button">X</button>
                </div>
            ))}
            <h3>Total: ${totalPrice()}</h3>
            <button onClick={() => clearCart()} className="Button">Limpiar Carrito</button>
            <Link to="/checkout" className="Option">Terminar Compra</Link>
        </div>
    );
};

export default Cart;
