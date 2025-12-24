# Proyecto E-commerce React

Este es un proyecto de e-commerce desarrollado con React y Firebase. Permite visualizar un catálogo de productos, ver detalles de cada producto, agregarlos al carrito y realizar una compra generando una orden en Firestore.

## Características

-   **Catálogo de Productos:** Visualización de productos traídos desde Firebase Firestore.
-   **Filtrado por Categoría:** Navegación por categorías (Ropa, Electrónica, Hogar).
-   **Detalle de Producto:** Vista detallada con descripción, precio y stock.
-   **Carrito de Compras:** Gestión del estado del carrito usando Context API (agregar, eliminar, vaciar).
-   **Checkout:** Formulario para finalizar la compra y generar una orden en la base de datos.
-   **Persistencia:** Los productos y órdenes se almacenan en Firebase Firestore.

## Tecnologías

-   React
-   Vite
-   Firebase (Firestore)
-   React Router DOM
-   Context API

## Instalación

1.  Clonar el repositorio.
2.  Instalar dependencias: `npm install`.
3.  Configurar las credenciales de Firebase en `src/firebase/config.js`.
4.  Ejecutar el proyecto: `npm run dev`.

## Estructura de Carpetas

-   `src/components`: Componentes de presentación (NavBar, Cart, Checkout, ItemDetail, etc.).
-   `src/containers`: Componentes contenedores con lógica de negocio (ItemListContainer, ItemDetailContainer).
-   `src/context`: Contexto para el manejo del carrito.
-   `src/firebase`: Configuración y utilidades de Firebase.
