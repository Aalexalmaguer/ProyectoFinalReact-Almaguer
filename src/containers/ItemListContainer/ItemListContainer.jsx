import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../Data/asyncMock';
import ItemList from '../../components/ItemList/ItemList';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
    
        const asyncFunc = categoryId ? () => getProductsByCategory(categoryId) : getProducts;

        asyncFunc()
            .then(response => {
                setProducts(response);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
        }, [categoryId]);

    if (loading) {
        return <h1 className="text-center mt-10 text-xl font-bold">Cargando productos...</h1>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center border-b pb-4">
                {greeting} {categoryId && <span className="text-blue-600 capitalize">({categoryId})</span>}
            </h2>
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;