import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/ItemList/ItemList';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

// Temporary - remove if needed
import { uploadProducts } from '../../firebase/uploadProducts';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const collectionRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products');

        getDocs(collectionRef)
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    // Button to upload products for testing purposes
    // const handleUpload = () => {
    //    uploadProducts();
    // }

    if(loading) {
        return <h1>Cargando productos...</h1>
    }

    return (
        <div>
            <h1>{greeting} {categoryId && categoryId}</h1>
            {/* Remove this button after initial seeding */}
            {/* <button onClick={handleUpload}>Cargar Productos a DB (SEED)</button> */}

            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;
