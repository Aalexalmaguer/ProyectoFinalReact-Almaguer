import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

// Example simple NavBar
const NavBar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#eee' }}>
            <Link to='/'>
                <h3>Ecommerce</h3>
            </Link>
            <div className='Categories'>
                <Link to='/category/ropa' style={{ margin: '0 10px' }}>Ropa</Link>
                <Link to='/category/electronica' style={{ margin: '0 10px' }}>Electronica</Link>
                <Link to='/category/hogar' style={{ margin: '0 10px' }}>Hogar</Link>
            </div>
            <CartWidget />
        </nav>
    );
};

export default NavBar;
