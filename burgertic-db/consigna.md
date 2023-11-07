# Ejercitación: Burger Tic

## Grupos

La ejercitación se hace en grupos de mínimo 2 máximo 3 integrantes.

## Consigna

Esta es la continuación del ejercicio "BurgerTic". La idea es que ahora, en vez de trabajar con un array de objetos, trabajemos con una base de datos, con la cual nos comunicaremos a través de una librería de Node llamada `mysql2`.

### Ejercicios primera parte

1. Corregir el código del tp anterior en base a las correcciones recibidas.
2. Crear una base de datos llamada `burguertic` en phpMyAdmin. Su estrucura debe basarse en los objetos presentes en el archivo `menu.json` del trabajo anterior. Por ahora, solo tendrá una tabla de platos.
3. Crear un archivo que se encargará de leer el archivo `menu.json` e insertar los datos en la base de datos. Ésto se puede hacer utilizando la lectura de archivos que se utilizó anteriormente, combinándolo con la librería `mysql2`.
4. Modificar el archivo `index.js` para que ahora, en vez de leer el archivo `menu.json`, cree una conexión con la base de datos y en cada endpoint, realice una consulta a la base de datos para obtener los datos necesarios.

### Ejercicios segunda parte

En esta segunda parte vamos a agregar la funcionalidad de hacer pedidos. Para eso, vamos a seguir los siguientes pasos:

1. Crear una tabla `usuarios` en la base de datos, que tenga los siguientes campos:

    - `id` (autoincremental)
    - `nombre`
    - `apellido`
    - `email`
    - `password`

2. Crear un usuario de prueba en la base de datos.
3. Crear una tabla `pedidos` en la base de datos, que tenga los siguientes campos:
    - `id` (autoincremental)
    - `id_usuario` (clave foránea a la tabla `usuarios`)
    - `fecha`
    - `estado` (por ahora, puede ser un string que diga "pendiente")
4. Crear una tabla `pedidos_platos` en la base de datos, que tenga los siguientes campos:
    - `id` (autoincremental)
    - `id_pedido` (clave foránea a la tabla `pedidos`)
    - `id_plato` (clave foránea a la tabla `platos`)
    - `cantidad`
5. Crear un endpoint que permita crear un pedido (`POST /pedido`). Para eso, se debe recibir una request con la siguiente estructura:

    ```json
    {
        "productos": [
            {
                "id": 1,
                "cantidad": 3
            },
            {
                "id": 2,
                "cantidad": 1
            }
        ]
    }
    ```

    Esta ruta debe crear un pedido en la base de datos, y para cada producto, debe crear un registro en la tabla `pedidos_platos` con su información y cantidad correspondientes. Luego, debe responder con un objeto que contenga el `id` del pedido creado:

    ```json
    {
        "id": 1
    }
    ```

    Aclaración: por ahora, todos los pedidos deben asignarse al usuario de prueba que se creó en el paso 2.

6. Crear un endpoint que permita obtener todos los pedidos de un usuario (`GET /pedidos/:id`). La respuesta debe tener la siguiente estructura:

    ```json
    [
        {
            "id": 5,
            "fecha": "2023-10-25T03:00:00.000Z",
            "estado": "pendiente",
            "id_usuario": 1,
            "platos": [
                {
                    "id": 6,
                    "nombre": "Combo Jero",
                    "precio": 3100,
                    "cantidad": 5
                },
                {
                    "id": 3,
                    "nombre": "Combo Aro y Ranzo",
                    "precio": 4500,
                    "cantidad": 4
                }
            ]
        },
        {
            "id": 6,
            "fecha": "2023-10-25T03:00:00.000Z",
            "estado": "pendiente",
            "id_usuario": 1,
            "platos": [
                {
                    "id": 3,
                    "nombre": "Combo Aro y Ranzo",
                    "precio": 4500,
                    "cantidad": 3
                }
            ]
        }
    ]
    ```

### Ejercicios tercera parte

En esta tercera parte vamos a agregar la funcionalidad de registro y login de usuarios. Para eso, vamos a usar la tabla `usuarios` que creamos en la parte anterior. Seguiremos los siguientes pasos:

1. Crear un endpoint que permita registrar un usuario (`POST /usuarios`). Para eso, se debe recibir una request con la siguiente estructura:

    ```json
    {
        "nombre": "Juan",
        "apellido": "Perez",
        "email": "juanperez@gmail.com",
        "password": "123456"
    }
    ```

    Esta ruta debe crear un usuario en la base de datos, y responder con un objeto que contenga el `id` del usuario creado:

    ```json
    {
        "id": 1
    }
    ```

    Es importante que la contraseña se guarde en la base de datos encriptada. Para eso, se puede utilizar la librería `bcrypt` de Node. La documentación de la misma se encuentra [acá](https://www.npmjs.com/package/bcrypt).

2. Crear un endpoint que permita hacer login de un usuario (`POST /login`). Para eso, se debe recibir una request con la siguiente estructura:

    ```json
    {
        "email": "juanperez@gmail.com",
        "password": "123456"
    }
    ```

    Esta ruta debe buscar un usuario en la base de datos que tenga el email y password recibidos. Si lo encuentra, debe responder con un objeto que contenga el `id` del usuario:

    ```json
    {
        "id": 1
    }
    ```

    Si no lo encuentra, debe responder con un código de estado `401` y un mensaje de error:

    ```json
    {
        "error": "Usuario o contraseña incorrectos"
    }
    ```

    Para verificar que la contraseña recibida sea la correcta, se puede utilizar la función `bcrypt.compareSync(password, hash)`, que recibe como primer parámetro la contraseña recibida en la request, y como segundo parámetro la contraseña encriptada que se encuentra en la base de datos.

3. Modificar el endpoint de creación de pedidos para que, en vez de asignarlos al usuario de prueba, los asigne al usuario que está logueado. Para eso, se debe recibir el `id` del usuario logueado en el header `Authorization` de la request.

### Aclaraciones importantes

- Para probar el este ejercicio, pueden clonar [este repositorio](https://github.com/nachovigilante/burgertic) y seguir las instrucciones para correrlo.
- Recordar que para poder utilizar la librería `mysql2`, es necesario instalarla con el comando `npm install mysql2` (conectado a la red de proyecto o por ethernet). Además, hay que requerirla en el archivo `index.js` con la línea `const mysql = require('mysql2');`.
- Las instrucciones de uso de la librería `mysql2` se encuentran en la [cheatsheet de Node.js](https://cheatsheets-nachovigilante.vercel.app/cheatsheet/node)
- En todos los casos donde se debe filtrar la información o buscar algún dato en particular, se debe hacer en el servidor, no en el cliente (es decir, en la query de SQL, no en JavaScript).

## Entrega hasta la segunda parte

La fecha límite de entrega para la segunda parte será el día **jueves 2 de noviembre**. La entrega se realizará a través de [este un formulario de Google Forms](https://forms.gle/U9XExKZAJCsJWKBk6).

### Importante

Probar todo el código antes de entregarlo. Prestar especial atención a que se utilice los formatos de JSON correctos en los endpoints, y que se utilicen los códigos de estado HTTP correctos para cada situación.
