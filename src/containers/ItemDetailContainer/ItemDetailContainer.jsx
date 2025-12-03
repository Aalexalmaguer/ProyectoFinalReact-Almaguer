import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../Data/asyncMock';
import ItemDetail from '../../components/ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);
    
        getProductById(itemId)
            .then(response => {
                setProduct(response);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
        }, [itemId]);

        if (loading) {
            return <h1 className="text-center mt-10 text-xl font-bold">Cargando detalle...</h1>;
        }

        if (!product) {
            return <h1 className="text-center mt-10 text-xl text-red-500">Producto no encontrado</h1>;
        }

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <ItemDetail {...product} />
            </div>
        );
};

export default ItemDetailContainer;