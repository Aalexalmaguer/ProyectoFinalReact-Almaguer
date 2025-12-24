import { useState } from 'react';
import './ItemCount.css'; // Assuming we might add some styles, or just inline for now.

const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(initial);

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="ItemCount">
            <div className="controls">
                <button className="button" onClick={decrement}>-</button>
                <h4 className="number">{quantity}</h4>
                <button className="button" onClick={increment}>+</button>
            </div>
            <div>
                <button className="button" onClick={() => onAdd(quantity)} disabled={!stock}>
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
};

export default ItemCount;
