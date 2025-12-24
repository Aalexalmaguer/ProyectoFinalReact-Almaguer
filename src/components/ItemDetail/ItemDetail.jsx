import { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ItemDetail.css';

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);

    const { addItem } = useCart();

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);
        
        const item = {
            id, name, price, img // Added img to cart item for better cart view
        };

        addItem(item, quantity);
    };

    return (
        <article className="item-detail-card">
            <div className="item-detail-image-col">
                <img src={img} alt={name} className="item-detail-img" />
            </div>
            <section className="item-detail-info-col">
                <header>
                    <h2 className="item-detail-title">{name}</h2>
                    <span className="badge">{category}</span>
                </header>
                <p className="item-detail-description">
                    {description}
                </p>
                <p className="item-detail-price">
                    ${price}
                </p>
                <p className="item-detail-stock">
                    Stock disponible: {stock}
                </p>
                
                <div className="item-detail-actions">
                    {
                        quantityAdded > 0 ? (
                            <div className="checkout-options">
                                <Link to='/cart' className='btn-primary'>Terminar compra</Link>
                                <Link to='/' className='btn-secondary'>Seguir comprando</Link>
                            </div>
                        ) : (
                            <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
                        )
                    }
                </div>
            </section>
        </article>
    );
};

export default ItemDetail;
