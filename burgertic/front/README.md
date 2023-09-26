# Instrucciones

## Qué necesito para correrlo?

1. Instalar el siguiente paquete:

```bash
npm i cors
```

En el `index.js` deben agregar

```js
/ ...
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express());
/...
```

## Cómo correr?

Para levantar este front es necesario correr la siguiente línea de comando:

```bash
npx http-server
```
