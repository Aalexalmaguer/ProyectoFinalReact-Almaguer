import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, clearCart, removeItem, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-empty text-center">
                <h2>No hay items en el carrito</h2>
                <Link to="/" className="btn-primary">Volver a Productos</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            <div className="cart-items">
                {cart.map(p => (
                    <div key={p.id} className="cart-item-row">
                        <div className="cart-item-info">
                            <h3>{p.name}</h3>
                            <span className="price">${p.price}</span>
                        </div>
                        <div className="cart-item-quantity">
                            <span>Cant: {p.quantity}</span>
                        </div>
                        <div className="cart-item-subtotal">
                            <span>Subtotal: ${p.quantity * p.price}</span>
                        </div>
                        <button onClick={() => removeItem(p.id)} className="btn-remove">Eliminar</button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total: ${totalPrice()}</h3>
                <div className="cart-actions">
                    <button onClick={() => clearCart()} className="btn-danger">Limpiar Carrito</button>
                    <Link to="/checkout" className="btn-primary">Terminar Compra</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
