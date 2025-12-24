import { Link, NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to='/' className="logo">
                    Ecommerce
                </Link>
                <div className='categories'>
                    <NavLink to='/category/ropa' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Ropa</NavLink>
                    <NavLink to='/category/electronica' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Electrónica</NavLink>
                    <NavLink to='/category/hogar' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Hogar</NavLink>
                </div>
                <CartWidget />
            </div>
        </nav>
    );
};

export default NavBar;
