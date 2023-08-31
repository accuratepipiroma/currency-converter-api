Currency Converter API
Esta es una aplicación de conversión de moneda que permite a los usuarios convertir cantidades entre diferentes monedas utilizando tasas de conversión externas y locales.

Tabla de Contenidos:

1. Instalación
2. Uso
3. Documentación de la API
4. Contribución

---

1. Instalación

- Clona el repositorio: git clone https://github.com/accuratepipiroma/currency-converter-api.git
- Ingresa a la carpeta del proyecto: cd currency-converter-api
- Instala las dependencias: npm install
- Configura las variables de entorno: Crea un archivo .env en el directorio raíz del proyecto y agrega las variables que proporcione el administrador. O con el siguiente contenido:

OPENEXCHANGERATES_APP_ID=TU_APP_ID
OPENEXCHANGERATES_LATESTJSON_URL=https://openexchangerates.org/api/latest.json
Reemplaza TU_APP_ID con tu ID de aplicación de OpenExchangeRates.

2. Uso
   Para iniciar el servidor, ejecuta: npm start o node app.js
   El servidor se ejecutará en http://localhost:3000.

3. Documentación de la API
   La API de esta aplicación está documentada utilizando Swagger. Para acceder a la documentación interactiva de la API, abre en tu navegador: http://localhost:3000/api-docs

   Aquí encontrarás detalles sobre las rutas disponibles, los parámetros requeridos y las respuestas esperadas.

4. Contribución
   Si deseas contribuir a este proyecto, sigue estos pasos:

   Crea un fork del repositorio.
   Crea una nueva rama para tu función/feature: git checkout -b mi-nueva-feature
   Haz los cambios y realiza los commits: git commit -am 'Agrego nueva feature'
   Sube los cambios a tu fork: git push origin mi-nueva-feature
   Crea un Pull Request en este repositorio.
