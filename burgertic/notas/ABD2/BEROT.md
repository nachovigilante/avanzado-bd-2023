# Tabla de calificaciones - BEROT

| Ruta         | Caso de prueba       | Calificación |
| ------------ | -------------------- | ------------ |
| /menu        | Único                | 1            |
| /combos      | Único                | 1.25         |
| /principales | Único                | 1.25         |
| /postres     | Único                | 1.25         |
| /menu/:id    | Item existente       | 0            |
| /menu/:id    | Item no existente    | 0            |
| /pedido      | Pedido correcto      | 0            |
| /pedido      | Sin productos        | 0            |
| /pedido      | Lista vacía          | 0            |
| /pedido      | Producto inexistente | 0            |

Nota final: 5