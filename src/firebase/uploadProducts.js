import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

const products = [
    {
        name: "Camiseta Básica Blanca",
        price: 1500,
        category: "ropa",
        stock: 20,
        description: "Camiseta de algodón 100% de alta calidad, corte clásico y transpirable.",
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Jeans Slim Fit Azul",
        price: 4500,
        category: "ropa",
        stock: 15,
        description: "Pantalones de mezclilla corte ajustado, elásticos y resistentes.",
        img: "https://images.unsplash.com/photo-1542272617-08f08315805d?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Chaqueta de Cuero Sintético",
        price: 8900,
        category: "ropa",
        stock: 5,
        description: "Estilo urbano y moderno, ideal para temporadas de otoño e invierno.",
        img: "https://images.unsplash.com/photo-1551028919-ac66e6a39d7e?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Auriculares Bluetooth Pro",
        price: 3200,
        category: "electronica",
        stock: 50,
        description: "Cancelación de ruido activa y batería de larga duración (24h).",
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Smartwatch Deportivo",
        price: 5500,
        category: "electronica",
        stock: 12,
        description: "Resistente al agua, monitor de ritmo cardíaco y GPS integrado.",
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Teclado Mecánico RGB",
        price: 7800,
        category: "electronica",
        stock: 8,
        description: "Switches azules para mayor respuesta táctil e iluminación personalizable.",
        img: "https://images.unsplash.com/photo-1587829741301-dc798b91a05c?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Lámpara de Escritorio LED",
        price: 2100,
        category: "hogar",
        stock: 30,
        description: "Luz regulable con protección ocular y diseño minimalista.",
        img: "https://images.unsplash.com/photo-1507473888900-52e1adad54ac?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Maceta de Cerámica Moderna",
        price: 1200,
        category: "hogar",
        stock: 25,
        description: "Diseño geométrico blanco, perfecta para suculentas y plantas de interior.",
        img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Juego de Sábanas Queen",
        price: 4000,
        category: "hogar",
        stock: 10,
        description: "Algodón egipcio de 400 hilos, suavidad y durabilidad garantizada.",
        img: "https://images.unsplash.com/photo-1522771753035-4a53c62181be?auto=format&fit=crop&w=500&q=60"
    }
];

export const uploadProducts = async () => {
    const productsCollection = collection(db, "products");

    // Check if products exist to avoid duplicates?
    // For now, let's just upload them. In a real app we might want to check.
    // However, for this task, I'll just iterate and add.

    try {
        const promises = products.map((product) => addDoc(productsCollection, product));
        await Promise.all(promises);
        console.log("Productos subidos correctamente!");
    } catch (error) {
        console.error("Error al subir productos:", error);
    }
};
