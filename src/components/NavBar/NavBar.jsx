import {Link, NavLink} from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="font-bold text-2xl text-blue-600">
                        MiTienda
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                        <NavLink 
                            to="/category/ropa" 
                            className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-500"}
                        >
                            Ropa
                        </NavLink>
                        <NavLink 
                            to="/category/calzado" 
                            className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-500"}
                        >
                            Calzado
                        </NavLink>
                        <NavLink 
                            to="/category/accesorios" 
                            className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-500"}
                        >
                            Accesorios
                        </NavLink>
                    </div>

                    <div className="flex items-center">
                        <CartWidget />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
