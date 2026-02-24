# Drupa - E-Commerce de Productos Dietéticos 🌿

Bienvenido al repositorio oficial de **Drupa**, una aplicación web de e-commerce moderna, rápida y adaptable, diseñada específicamente para venta de productos dietéticos, frutos secos, semillas y más.

## 🚀 Tecnologías

Este proyecto ha sido desarrollado utilizando las siguientes tecnologías:
- **React.js** (Frontend UI)
- **Vite** (Build Tool & Dev Server)
- **CSS3 Vanilla** (Manejo de variables CSS, Flexbox, CSS Grid)
- **React Context API** (Para manejo global del Carrito y del Tema UI)
- **GitHub Pages** (Para despliegue a producción)

## ✨ Características Principales

*   **Diseño Premium**: Paleta de colores orgánicos de alta gama (Cafés profundos, dorados, cremas).
*   **Carrito de Compras Funcional**: Lógica interna global (mediante Context API y persistencia en Local Storage) que gestiona sumatorias, adiciones, restas y totalizador en tiempo real.
*   **Catálogo Dinámico**: Grilla con 50 productos iniciales categorizados (Frutos Secos, Legumbres, Cereales, Deshidratados y Harinas), contando con imágenes gráficas auto-generadas descriptivas.
*   **Totalmente Responsive (Mobile First)**: Adaptabilidad perfecta tanto para monitores Ultra-Wide como para los smartphones más pequeños, implementando una barra de navegación fluida que minimiza su uso de espacio en móviles al interactuar haciendo scroll.
*   **Modo Claro / Oscuro Inteligente**: Integración de un *Theme Context* que lee la preferencia inicial del usuario o puede ser manejado mediante un switch en la barra superior. Los colores se invierten conservando la coherencia orgánica (fondos "café expreso" y tarjetas oscuras contrastantes).
*   **Desplegado Online**: Flujo de automatización completo para hacer build y subir al servidor de Github Pages mediante el comando `npm run deploy`.

## 🌐 Enlace del Proyecto

La aplicación se encuentra en vivo y puede ser navegada públicamente aquí:
[https://NicolasRovetta.github.io/drupa/](https://NicolasRovetta.github.io/drupa/)

## 🛠️ Instalación y Uso Local

Si deseas correr este proyecto en tu propia máquina para desarrollarlo más a fondo:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/NicolasRovetta/drupa.git
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Para realizar un despliegue manual a producción (GitHub Pages):
   ```bash
   npm run deploy
   ```
