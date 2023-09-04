# Ejercitación: Burger Tic

## Grupos

La ejercitación se hace en grupos de mínimo 2 máximo 3 integrantes.

## Consigna

En este ejercicio vamos a crear una API para un restaurante de comida rápida. En este caso deberán importar el archivo `menu.json`, que contiene todos los datos del menu del restaurant. Éste se encuentra en esta carpeta y se importa de la siguiente forma:

```js
const menu = require('./menu.json');
```

### Ejercicios

1. Crear un endpoint `GET /menu` que devuelva el menú completo del restaurante.
2. Crear un endpoint `GET /menu/:id` que devuelva un plato del menú. El `id` del plato debe ser pasado como parámetro en la ruta.
3. Crear un endpoint `GET /combos` que devuelva únicamente los combos del menú.
4. Crear un endpoint `GET /principales` que devuelva únicamente los platos principales del menú.
5. Crear un endpoint `GET /postres` que devuelva únicamente los postres del menú.
6. Crear un endpoint `POST /pedido` que reciba un array de id's de platos y devuelva el precio total del pedido. El array de platos debe ser pasado en el cuerpo de la petición.
7. Probar todos los endpoints creados utilizando REST Client.

## Ejempl de la request POST

```rest
POST http://localhost:9000/pedido HTTP/1.1
Content-Type: application/json

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

La respuesta debería ser:

```json
{
    "msg": "Pedido recibido",
    "precio": 12100
}
```

## Aclaraciones importantes

- Devolver los códigos de status correctos en cada caso es **muy importante**. Para ello, utilizar el método `status()` de la respuesta. Por ejemplo, si no existe un plato con el id pasado como parámetro, devolver un código de status 404, y algún mensaje de error. Para ello, podemos hacer lo siguiente:

```js
res.status(404).json({ msg: 'Plato no encontrado' });
```

- Como vimos anteriormente, es necesario escribir esta línea para que el servidor pueda recibir y entender el cuerpo de las peticiones POST:

```js
app.use(express.json());
```

- Cuando devolvemos un array de objetos, debemos hacerlo con:

```js
res.json(array);
```

No con:

```js
res.send(array);
```

## Recursos

- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [JSON](https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/JSON)
- [Importar archivos](https://nodejs.org/api/modules.html#modules_file_modules)
- [Método `filter()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/filter)
- [Método `find()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/find)
- [Método `reduce()` (completamente opcional)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/Reduce)
