import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);

        const docRef = doc(db, 'products', itemId);

        getDoc(docRef)
            .then(response => {
                const data = response.data();
                const productAdapted = { id: response.id, ...data };
                setProduct(productAdapted);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [itemId]);

    if (loading) {
        return <h1>Cargando detalle...</h1>
    }

    if (!product) {
        return <h1>El producto no existe</h1>
    }

    return (
        <div className='ItemDetailContainer'>
            <ItemDetail {...product} />
        </div>
    );
};

export default ItemDetailContainer;
