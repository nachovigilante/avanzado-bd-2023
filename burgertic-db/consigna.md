# Ejercitación: Burger Tic

## Grupos

La ejercitación se hace en grupos de mínimo 2 máximo 3 integrantes.

## Consigna

Esta es la continuación del ejercicio "BurgerTic". La idea es que ahora, en vez de trabajar con un array de objetos, trabajemos con una base de datos, con la cual nos comunicaremos a través de una librería de Node llamada `mysql2`.

### Ejercicios

1. Corregir el código del tp anterior en base a las correcciones recibidas.
2. Crear una base de datos llamada `burguertic` en phpMyAdmin. Su estrucura debe basarse en los objetos presentes en el archivo `menu.json` del trabajo anterior. Por ahora, solo tendrá una tabla de platos.
3. Crear un archivo que se encargará de leer el archivo `menu.json` e insertar los datos en la base de datos. Ésto se puede hacer utilizando la lectura de archivos que se utilizó anteriormente, combinándolo con la librería `mysql2`.
4. Modificar el archivo `index.js` para que ahora, en vez de leer el archivo `menu.json`, cree una conexión con la base de datos y en cada endpoint, realice una consulta a la base de datos para obtener los datos necesarios.

### Aclaraciones importantes

- Recordar que para poder utilizar la librería `mysql2`, es necesario instalarla con el comando `npm install mysql2` (conectado a la red de proyecto o por ethernet). Además, hay que requerirla en el archivo `index.js` con la línea `const mysql = require('mysql2');`.
- Las instrucciones de uso de la librería `mysql2` se encuentran en la [cheatsheet de Node.js](https://cheatsheets-nachovigilante.vercel.app/cheatsheet/node)
- En todos los casos donde se debe filtrar la información o buscar algún dato en particular, se debe hacer en el servidor, no en el cliente (es decir, en la query de SQL, no en JavaScript).
