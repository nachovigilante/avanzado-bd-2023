# Ejercitación 1 - JS

Llamaremos “alumno” a un objeto de JavaScript que tenga la siguiente estructura:

```js
{
    nombre: "Juan",
    apellido: "Gomez",
    dni: 46345678,
    anio: 4,
    curso: "A",
    nota: 8,
}
```

## Ejercicio 1

Este ejercicio consiste en crear un array de alumnos distintos, con datos
inventados que cubran las siguientes condiciones:

- Al menos 3 alumnos deben estar aprobados (nota >= 6).
- Al menos 3 alumnos deben estar desaprobados.
- Debe haber al menos 2 alumnos en 4°A, 2 alumnos en 5°A, 2 alumnos en 4°B y 2
en 3°B.
- Los DNI deben empezar con 45, 46 o 47 y no pueden ser todos iguales.
- Los nombres y apellidos no pueden ser todos iguales pero un nombre debe
repetirse 2 veces.

## Ejercicio 2

Crear una función “capitalizar” que recibe un string, hace la primera letra
mayúscula y lo devuelve (utilizar la notación “arrow function”).

## Ejercicio 3

Crear una función “mostrarAlumno” que recibe un alumno y muestra su información
de la siguiente manera en consola:

```txt
DNI: 46.345.678
Nombre y apellido: Juan Gomez
Curso: 4°A
Nota: 8
```

## Ejercicio 4

Utilizando la función “capitalizar”, capitalizar el nombre y el apellido
de todos los alumnos en el array.

## Ejercicio 5

Utilizando la función “mostrarAlumno” mostrar a todos los alumnos del
array.

## Ejercicio 6

- Mostrar únicamente los alumnos aprobados.
- Mostrar únicamente los alumnos de 4to año.
- Mostrar únicamente los alumnos de curso “B”.
