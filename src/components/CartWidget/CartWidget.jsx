import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartWidget = () => {
    const { totalQuantity } = useCart();
    const quantity = totalQuantity();

    return (
        <Link to='/cart' style={{ display: quantity > 0 ? 'flex' : 'none', alignItems: 'center', textDecoration: 'none', color: 'black' }}>
             <ShoppingCart size={24} />
             <span style={{ marginLeft: '5px' }}>{quantity}</span>
        </Link>
    );
};

export default CartWidget;
