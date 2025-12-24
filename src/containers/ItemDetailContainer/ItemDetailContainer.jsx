import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getProductById } from '../../Data/asyncMock'; // Fallback

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);

        const docRef = doc(db, 'products', itemId);

        getDoc(docRef)
            .then(response => {
                if (response.exists()) {
                    const data = response.data();
                    const productAdapted = { id: response.id, ...data };
                    setProduct(productAdapted);
                } else {
                    // Try fallback if not found in Firestore (maybe it's a mock ID)
                    return getProductById(itemId).then(res => {
                        if(res) setProduct(res);
                        else console.log("Product not found");
                    });
                }
            })
            .catch(error => {
                console.log(error);
                // Fallback on error
                getProductById(itemId).then(res => setProduct(res));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [itemId]);

    if (loading) {
        return <h2 className="text-center mt-4">Cargando detalle...</h2>
    }

    if (!product) {
        return <h2 className="text-center mt-4">El producto no existe</h2>
    }

    return (
        <div className='ItemDetailContainer'>
            <ItemDetail {...product} />
        </div>
    );
};

export default ItemDetailContainer;
