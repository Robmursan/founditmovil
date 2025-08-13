# 🚀 Founditmovil

<div align="center">

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![ZXing](https://img.shields.io/badge/ZXing-000000?style=for-the-badge&logo=zxing&logoColor=white)

**Aplicación móvil Angular para gestión de materiales con funcionalidad de código de barras**

**Angular mobile application for material management with barcode functionality**

</div>

---

## 📋 Tabla de Contenidos / Table of Contents

- [Descripción / Description](#-descripción--description)
- [Características / Features](#-características--features)
- [Requisitos Previos / Prerequisites](#-requisitos-previos--prerequisites)
- [Instalación / Installation](#-instalación--installation)
- [Configuración / Configuration](#-configuración--configuration)
- [Uso / Usage](#-uso--usage)
- [Scripts Disponibles / Available Scripts](#-scripts-disponibles--available-scripts)
- [Estructura del Proyecto / Project Structure](#-estructura-del-proyecto--project-structure)
- [Contribución / Contributing](#-contribución--contributing)
- [Licencia / License](#-licencia--license)

---

## 🎯 Descripción / Description

**Español:** Founditmovil es una aplicación web progresiva (PWA) desarrollada en Angular que permite la gestión eficiente de materiales mediante la lectura de códigos de barras. La aplicación incluye funcionalidades de autenticación, gestión de materiales y un lector de códigos de barras integrado.

**English:** Founditmovil is a Progressive Web Application (PWA) developed in Angular that enables efficient material management through barcode reading. The application includes authentication features, material management, and an integrated barcode reader.

---

## ✨ Características / Features

- 🔐 **Autenticación Segura** / **Secure Authentication**
- 📱 **Diseño Responsivo** / **Responsive Design**
- 📊 **Gestión de Materiales** / **Material Management**
- 📷 **Lector de Códigos de Barras** / **Barcode Scanner**
- 🚀 **PWA Optimizada** / **Optimized PWA**
- 🎨 **Interfaz Moderna** / **Modern Interface**

---

## 🔧 Requisitos Previos / Prerequisites

### Software Requerido / Required Software

- **Node.js** (versión 18.x o superior / version 18.x or higher)
- **npm** (incluido con Node.js / included with Node.js)
- **Angular CLI** (versión 20.1.3 o superior / version 20.1.3 or higher)

### Verificación de Versiones / Version Verification

```bash
node --version
npm --version
ng version
```

---

## 🚀 Instalación / Installation

### Paso 1: Clonar el Repositorio / Step 1: Clone the Repository

```bash
git clone <repository-url>
cd founditmovil
```

### Paso 2: Instalar Dependencias / Step 2: Install Dependencies

```bash
npm install
```

### Paso 3: Verificar Instalación / Step 3: Verify Installation

```bash
ng version
```

---

## ⚙️ Configuración / Configuration

### Variables de Entorno / Environment Variables

Crea un archivo `.env` en la raíz del proyecto / Create a `.env` file in the project root:

```env
# API Configuration
API_BASE_URL=your_api_base_url
API_KEY=your_api_key

# Authentication
JWT_SECRET=your_jwt_secret
```

### Configuración del Servidor / Server Configuration

Asegúrate de que tu servidor backend esté configurado y ejecutándose / Ensure your backend server is configured and running.

---

## 🎮 Uso / Usage

### Desarrollo Local / Local Development

```bash
# Iniciar servidor de desarrollo / Start development server
npm start
# o / or
ng serve

# Abrir en el navegador / Open in browser
http://localhost:4200
```

### Construcción para Producción / Production Build

```bash
# Construir para producción / Build for production
npm run build

# Los archivos se generarán en / Files will be generated in
dist/founditmovil/
```

---

## 📜 Scripts Disponibles / Available Scripts

| Comando / Command | Descripción / Description |
|------------------|---------------------------|
| `npm start` | Inicia el servidor de desarrollo / Starts development server |
| `npm run build` | Construye la aplicación para producción / Builds app for production |
| `npm test` | Ejecuta las pruebas unitarias / Runs unit tests |
| `npm run watch` | Construye en modo observador / Builds in watch mode |

---

## 🏗️ Estructura del Proyecto / Project Structure

```
founditmovil/
├── src/
│   ├── app/
│   │   ├── codelector/          # Lector de códigos / Barcode reader
│   │   ├── create-material/     # Crear materiales / Create materials
│   │   ├── guards/              # Guards de autenticación / Auth guards
│   │   ├── login/               # Sistema de login / Login system
│   │   ├── materiales/          # Gestión de materiales / Material management
│   │   └── servicios/           # Servicios de la aplicación / App services
│   ├── assets/                  # Recursos estáticos / Static assets
│   └── styles.css               # Estilos globales / Global styles
├── public/                      # Archivos públicos / Public files
├── angular.json                 # Configuración de Angular / Angular config
└── package.json                 # Dependencias del proyecto / Project dependencies
```

---

## 📦 Dependencias Principales / Main Dependencies

### Dependencias de Producción / Production Dependencies

- **@angular/common** ^20.1.0 - Funcionalidades comunes de Angular
- **@angular/core** ^20.1.0 - Núcleo de Angular
- **@angular/forms** ^20.1.0 - Manejo de formularios
- **@angular/router** ^20.1.0 - Enrutamiento de la aplicación
- **@zxing/browser** ^0.1.5 - Lector de códigos de barras
- **@zxing/library** ^0.21.3 - Biblioteca de códigos de barras
- **rxjs** ~7.8.0 - Programación reactiva

### Dependencias de Desarrollo / Development Dependencies

- **@angular/cli** ^20.1.3 - CLI de Angular
- **@angular/compiler-cli** ^20.1.0 - Compilador de Angular
- **typescript** ~5.8.2 - Compilador de TypeScript
- **karma** ~6.4.0 - Test runner
- **jasmine-core** ~5.8.0 - Framework de testing

---

## 🧪 Testing

### Pruebas Unitarias / Unit Tests

```bash
# Ejecutar todas las pruebas / Run all tests
npm test

# Ejecutar pruebas en modo observador / Run tests in watch mode
ng test --watch
```

### Pruebas End-to-End / End-to-End Tests

```bash
# Ejecutar pruebas e2e / Run e2e tests
ng e2e
```

---

## 🚀 Despliegue / Deployment

### Despliegue en Producción / Production Deployment

1. **Construir la aplicación** / **Build the application:**
   ```bash
   npm run build
   ```

2. **Subir archivos** / **Upload files:**
   - Sube el contenido de `dist/founditmovil/` a tu servidor web
   - Upload the contents of `dist/founditmovil/` to your web server

3. **Configurar servidor** / **Configure server:**
   - Asegúrate de que todas las rutas redirijan a `index.html`
   - Ensure all routes redirect to `index.html`

---

## 🤝 Contribución / Contributing

1. Fork el proyecto / Fork the project
2. Crea una rama para tu feature / Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios / Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama / Push to the branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request / Open a Pull Request

---

## 📄 Licencia / License

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 📞 Soporte / Support

Si tienes alguna pregunta o necesitas ayuda / If you have any questions or need help:

- 📧 **Email:** [tu-email@ejemplo.com]
- 🐛 **Issues:** [Crear un issue en GitHub / Create an issue on GitHub]
- 📚 **Documentación:** [Enlace a documentación / Documentation link]

---

## 🙏 Agradecimientos / Acknowledgments

- **Angular Team** por el framework increíble / for the amazing framework
- **ZXing** por la funcionalidad de códigos de barras / for barcode functionality
- **Comunidad Angular** por el soporte continuo / for continuous support

---

<div align="center">

**⭐ ¡No olvides darle una estrella al proyecto si te gusta! / Don't forget to star the project if you like it! ⭐**

</div>
