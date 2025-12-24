import { Link } from 'react-router-dom';
import './ItemList.css';

const ItemList = ({ products }) => {
    if (products.length === 0) {
        return <p className="text-center">No hay productos disponibles.</p>;
    }

    return (
        <div className="product-grid">
            {products.map(prod => (
                <div key={prod.id} className="product-card">
                    <div className="product-image-container">
                        <img src={prod.img} alt={prod.name} className="product-image" />
                    </div>
                    <div className="product-info">
                        <h3 className="product-title">{prod.name}</h3>
                        <p className="product-price">${prod.price}</p>
                        <Link to={`/item/${prod.id}`} className="view-detail-btn">Ver Detalle</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
