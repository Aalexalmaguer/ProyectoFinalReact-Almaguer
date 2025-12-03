E-commerce App - Segunda Entrega

Este proyecto representa la segunda fase de desarrollo de un e-commerce construido con React.js. En esta etapa, el enfoque principal ha sido la implementación del enrutamiento (Routing) para navegar entre diferentes vistas y la categorización de productos.

🚀 Objetivos de la Entrega

Implementar React Router DOM para gestionar la navegación sin recargar la página (SPA).

Configurar rutas dinámicas para filtrar productos por categoría y ver detalles individuales.

Utilizar Hooks de enrutamiento (useParams, Link, NavLink) para conectar la lógica con la URL.

Separar componentes en Contenedores (lógica) y Presentacionales (vista) para un código más limpio y escalable.

🧩 Componentes y Funcionalidades Nuevas

1. Sistema de Rutas (App.jsx)

Se configuró BrowserRouter envolviendo la aplicación, definiendo las siguientes rutas:

/: Home (Muestra todos los productos).

/category/:categoryId: Categoría (Filtra productos según la categoría seleccionada: ropa, calzado, accesorios).

/item/:itemId: Detalle (Muestra la vista detallada de un producto específico).

*: 404 (Ruta para manejar enlaces no existentes).

2. NavBar (Actualizado)

Los botones <a> o onClick fueron reemplazados por componentes Link y NavLink.

Se utiliza NavLink para aplicar estilos activos (clase active) al enlace de la categoría actual.

3. ItemListContainer (Lógica Mejorada)

Ahora utiliza el hook useParams para detectar si existe un categoryId en la URL.

Filtrado automático: Si hay una categoría, solicita solo esos productos; si no, trae todo el catálogo.

Maneja estados de carga (loading) mientras espera la respuesta simulada (promesa).

4. ItemDetailContainer (Nuevo)

Componente contenedor encargado de mostrar el detalle de un solo producto.

Captura el itemId de la URL usando useParams.

Busca el producto específico en el mock de datos y se lo pasa al componente visual ItemDetail.

5. ItemDetail (Nuevo)

Componente presentacional diseñado para mostrar la información completa del producto (imagen grande, descripción, precio y botón de compra).

🛠️ Tecnologías Utilizadas

React JS (Vite)

React Router DOM v6 (Navegación)

Tailwind CSS (Estilos rápidos y responsivos)

Lucide React (Íconos)

Promesas y Async/Await (Simulación de llamadas a API)

📦 Instalación y Ejecución

Clonar el repositorio:

git clone <URL_DEL_REPO>


Instalar dependencias:

npm install


Ejecutar el proyecto:

npm run dev


🏗️ Estructura del Proyecto

src/
├── components/      (Componentes Visuales/Presentacionales)
│   ├── NavBar/
│   ├── CartWidget/
│   ├── ItemList/
│   ├── Item/
│   └── ItemDetail/
├── containers/      (Componentes Contenedores/Lógica)
│   ├── ItemListContainer/
│   └── ItemDetailContainer/
├── data/            (Simulación de Base de Datos)
│   └── asyncMock.js
└── App.jsx          (Configuración de Rutas)
