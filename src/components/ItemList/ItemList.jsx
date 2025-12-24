import { Link } from 'react-router-dom';

const ItemList = ({ products }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {products.map(prod => (
                <div key={prod.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                    <img src={prod.img} alt={prod.name} style={{ width: '100%' }} />
                    <h3>{prod.name}</h3>
                    <p>Precio: ${prod.price}</p>
                    <Link to={`/item/${prod.id}`}>Ver Detalle</Link>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
