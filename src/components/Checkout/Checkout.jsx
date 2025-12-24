import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { db } from '../../firebase/config';
import { collection, addDoc, Timestamp, writeBatch, documentId, query, where, getDocs } from 'firebase/firestore';
import './Checkout.css';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    
    // User form state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');

    const { cart, totalPrice, clearCart } = useCart();

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);

        try {
            const objOrder = {
                buyer: {
                    name, phone, email
                },
                items: cart,
                total: totalPrice(),
                date: Timestamp.fromDate(new Date())
            };

            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map(prod => prod.id);
            const productsRef = collection(db, 'products');
            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)));
            const { docs } = productsAddedFromFirestore;

            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();

                const orderRef = collection(db, 'orders');
                const orderAdded = await addDoc(orderRef, objOrder);

                setOrderId(orderAdded.id);
                clearCart();
            } else {
                console.error('Hay productos que están fuera de stock');
                // Could show a message to the user here listing out of stock items
                alert("Algunos productos no tienen stock suficiente.");
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email !== emailConfirm) {
            alert("Los emails no coinciden");
            return;
        }

        if (name && phone && email) {
            createOrder({ name, phone, email });
        } else {
            alert("Por favor completa todos los campos");
        }
    };

    if (loading) {
        return <h2 className="text-center">Se está generando su orden...</h2>;
    }

    if (orderId) {
        return (
            <div className="checkout-success text-center">
                <h1>¡Gracias por su compra!</h1>
                <p>El ID de su orden es:</p>
                <div className="order-id">{orderId}</div>
            </div>
        );
    }

    if (cart.length === 0) {
        return <h2 className="text-center">No hay items en el carrito para comprar.</h2>
    }

    return (
        <div className="checkout-container">
            <h2>Finalizar Compra</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Tu nombre completo" />
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Tu número de teléfono" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Tu email" />
                </div>
                <div className="form-group">
                    <label>Confirmar Email:</label>
                    <input type="email" value={emailConfirm} onChange={(e) => setEmailConfirm(e.target.value)} required placeholder="Confirma tu email" />
                </div>
                <button type="submit" className="btn-primary" disabled={cart.length === 0}>Generar Orden</button>
            </form>
        </div>
    );
};

export default Checkout;
