import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './containers/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import { CartProvider } from './context/CartContext';
import { uploadProducts } from './firebase/uploadProducts';
import { useState } from 'react';

function App() {
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    if (confirm("¿Estás seguro que quieres subir los productos? Esto podría duplicarlos si ya existen.")) {
        setSeeding(true);
        try {
            await uploadProducts();
            alert("¡Productos subidos correctamente! Recarga la página.");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error al subir productos: " + error.message);
        } finally {
            setSeeding(false);
        }
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <NavBar />

          {/* Temporary Seed Button */}
          <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
             <button
                onClick={handleSeed}
                disabled={seeding}
                style={{
                    background: seeding ? '#9ca3af' : '#ef4444',
                    color: 'white',
                    fontSize: '12px',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    border: 'none',
                    cursor: seeding ? 'wait' : 'pointer'
                }}>
                 {seeding ? 'SEEDING...' : 'SEED DB'}
             </button>
          </div>

          <div className="container">
            <Routes>
              <Route path="/" element={<ItemListContainer greeting="Nuestros Productos" />} />
              <Route path="/category/:categoryId" element={<ItemListContainer greeting="Categoría" />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<h1 className="text-center">404 NOT FOUND</h1>} />
            </Routes>
          </div>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
