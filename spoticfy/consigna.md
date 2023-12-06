# SpoTICfy

## Consigna

Se pide **por favor** leer la consigna completa antes de empezar a programar. Las preguntas que estén respondidas en la consigna no serán respondidas en persona.

### Objetivo

El objetivo de este trabajo práctico es que puedas aplicar los conocimientos adquiridos en la materia para crear una API que permita la gestión de una biblioteca de música.

### Grupos

Este trabajo práctico se realizará en grupos de **mínimo** 2 personas y **máximo** 3 personas.

### Instalación

Para poder hacer que el proyecto funcione, es necesario que instales las dependencias del mismo. Para ello, ejecuta el siguiente comando:

```bash
npm install
```

### Ejecución

Para ejecutar el proyecto, ejecuta el siguiente comando:

```bash
npm start
```

O bien, si querés ejecutar el proyecto en modo desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```

### Estructura del proyecto

El proyecto está compuesto por los siguientes archivos:

- `package.json`: Contiene la información del proyecto y las dependencias que se deben instalar.
- `index.js`: Es el archivo principal del proyecto. En él se configura el servidor y se definen las rutas de la API (hay que completarlo).
- `db.js`: Contiene la lógica para conectarse a la base de datos (hay que completarlo).
- `/controllers`: Contiene los controladores de la API para cada tabla (hay que completarlos).
- `spoticfy.sql`: Contiene el archivo SQL para importar la base de datos en phpMyAdmin.
- `consigna.md`: El archivo que estás leyendo.
- `.REST`: Contiene los requests de la API para poder probarla con la extensión de VSCode REST Client.

**Importante:**
No es necesario que agregues archivos adicionales al proyecto. Todo lo que se pide se puede resolver con los archivos que ya están en el proyecto. Simplemente tenés que completar los archivos que ya están. Por otro lado, el archivo `.REST` no debe modificarse, ya que contiene las requests para probar la API.

### Base de datos

La base de datos que se brinda para este trabajo práctico está compuesta por las siguientes tablas:

- `artistas`: Contiene los artistas de la biblioteca.
- `albumes`: Contiene los álbumes de la biblioteca.
- `canciones`: Contiene las canciones de la biblioteca.

Y tienen la siguiente estructura:

#### DB - Artistas

| Campo    | Tipo          | Descripción                      |
| -------- | ------------- | -------------------------------- |
| `id`     | `int`         | Identificador único del artista. |
| `nombre` | `varchar(50)` | Nombre del artista.              |

#### DB - Álbumes

| Campo     | Tipo          | Descripción                    |
| --------- | ------------- | ------------------------------ |
| `id`      | `int`         | Identificador único del álbum. |
| `nombre`  | `varchar(50)` | Nombre del álbum.              |
| `artista` | `int`         | Identificador del artista.     |

#### DB - Canciones

| Campo            | Tipo          | Descripción                               |
| ---------------- | ------------- | ----------------------------------------- |
| `id`             | `int`         | Identificador único de la canción.        |
| `nombre`         | `varchar(50)` | Nombre de la canción.                     |
| `album`          | `int`         | Identificador del álbum.                  |
| `duracion`       | `int`         | Duración de la canción en segundos.       |
| `reproducciones` | `int`         | Cantidad de reproducciones de la canción. |

### API

**Importante**: los filtros de las requests de la API se deben realizar con `SQL` y no con `JavaScript`.

La API que debe tener las siguientes rutas:

#### API - Artistas

| Método | Ruta                      | Descripción                                                         |
| ------ | ------------------------- | ------------------------------------------------------------------- |
| `GET`  | `/artistas`               | Devuelve todos los artistas.                                        |
| `GET`  | `/artistas/:id`           | Devuelve el artista con el identificador `id`.                      |
| `POST` | `/artistas`               | Crea un nuevo artista.                                              |
| `PUT`  | `/artistas/:id`           | Modifica el artista con el identificador `id`.                      |
| `DEL`  | `/artistas/:id`           | Elimina el artista con el identificador `id`.                       |
| `GET`  | `/artistas/:id/albumes`   | Devuelve todos los álbumes del artista con el identificador `id`.   |
| `GET`  | `/artistas/:id/canciones` | Devuelve todas las canciones del artista con el identificador `id`. |

#### API - Álbumes

| Método | Ruta                     | Descripción                                                       |
| ------ | ------------------------ | ----------------------------------------------------------------- |
| `GET`  | `/albumes`               | Devuelve todos los álbumes.                                       |
| `GET`  | `/albumes/:id`           | Devuelve el álbum con el identificador `id`.                      |
| `POST` | `/albumes`               | Crea un nuevo álbum.                                              |
| `PUT`  | `/albumes/:id`           | Modifica el álbum con el identificador `id`.                      |
| `DEL`  | `/albumes/:id`           | Elimina el álbum con el identificador `id`.                       |
| `GET`  | `/albumes/:id/canciones` | Devuelve todas las canciones del álbum con el identificador `id`. |

#### API - Canciones

| Método | Ruta                        | Descripción                                                                            |
| ------ | --------------------------- | -------------------------------------------------------------------------------------- |
| `GET`  | `/canciones`                | Devuelve todas las canciones.                                                          |
| `GET`  | `/canciones/:id`            | Devuelve la canción con el identificador `id`.                                         |
| `POST` | `/canciones`                | Crea una nueva canción.                                                                |
| `PUT`  | `/canciones/:id`            | Modifica la canción con el identificador `id`.                                         |
| `DEL`  | `/canciones/:id`            | Elimina la canción con el identificador `id`.                                          |
| `PUT`  | `/canciones/:id/reproducir` | Incrementa en 1 la cantidad de reproducciones de la canción con el identificador `id`. |

### Entrega

La entrega del trabajo práctico se realizará a través del [este formulario](https://forms.gle/UhcR9AnvbPwj9Qju9) en el que entregarán todo el proyecto (**SIN LA CARPETA node_modules**) en un `.zip`. La fecha límite de entrega es el **viernes 4 de Noviembre a las 23:59** (para el curso `ABE 1` i.e. el grupo que tenemos clase únicamente los lunes, la fecha de entrega es el **martes 8 de Noviembre a las 23:59**).
