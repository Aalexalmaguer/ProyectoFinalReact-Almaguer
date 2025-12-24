import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { db } from '../../firebase/config';
import { collection, addDoc, Timestamp, writeBatch, documentId, query, where, getDocs } from 'firebase/firestore';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    // User form state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');

    const { cart, totalQuantity, totalPrice, clearCart } = useCart();

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
        return <h1>Se está generando su orden...</h1>;
    }

    if (orderId) {
        return (
            <div>
                <h1>El id de su orden es: {orderId}</h1>
                <p>Gracias por su compra.</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return <h1>No hay items en el carrito para comprar.</h1>
    }

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
                <label>
                    Nombre:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Teléfono:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Confirmar Email:
                    <input type="email" value={emailConfirm} onChange={(e) => setEmailConfirm(e.target.value)} required />
                </label>
                <button type="submit" disabled={cart.length === 0} style={{ marginTop: '20px' }}>Generar Orden</button>
            </form>
        </div>
    );
};

export default Checkout;
