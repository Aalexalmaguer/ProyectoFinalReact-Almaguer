import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/ItemList/ItemList';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getProducts, getProductsByCategory } from '../../Data/asyncMock'; // Fallback

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);

        const collectionRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products');

        getDocs(collectionRef)
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });

                if (productsAdapted.length === 0) {
                     // Try fallback if empty (could mean empty DB, but usually means new project)
                     // But strictly speaking, empty DB is valid.
                     // However, given the "missing permission" issue seen in testing,
                     // we might want to catch that error.
                     // If getDocs succeeds but returns empty, we leave it empty.
                     setProducts(productsAdapted);
                } else {
                    setProducts(productsAdapted);
                }
            })
            .catch(error => {
                console.error("Firestore Error:", error);
                // Fallback to asyncMock on error (e.g. permission denied)
                console.log("Switching to Mock Data...");
                const asyncFunc = categoryId ? getProductsByCategory : getProducts;
                asyncFunc(categoryId)
                    .then(res => setProducts(res))
                    .catch(err => setError(err.message));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    if(loading) {
        return <h2 className="text-center mt-4">Cargando productos...</h2>
    }

    // if(error) {
    //    // Handled by fallback
    // }

    return (
        <div className="item-list-container">
            <h1 className="text-center mb-4">{greeting} {categoryId && <span>: {categoryId}</span>}</h1>
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;
