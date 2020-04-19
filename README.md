# Ingeniería Web Node.js + Express + MongoDB

- **GET /students** Devuelve un arreglo con de estudiantes

```
[
  {
    "_id": "5e9bb6e917592c2a6426f6c3",
    "name": "Felipe",
    "lastname": "Arboleda",
    "document": 96061516104,
    "course": "Ingeniería Web",
    "grade": 3,
    "__v": 0
  },
  {
    "_id": "5e9bb86071e0f12bd39f8a8f",
    "name": "Andrés",
    "lastname": "Isaza",
    "document": 1234567890,
    "course": "Ingeniería Web",
    "grade": 3.5,
    "__v": 0
  }
]
```

- **GET /students/:id** Devuelve un estudiante

```
{
  "_id": "5e9bb6e917592c2a6426f6c3",
  "name": "Felipe",
  "lastname": "Arboleda",
  "document": 96061516104,
  "course": "Ingeniería Web",
  "grade": 3,
  "__v": 0
}
```

- **POST /students** Crea un estudiante

```
Parámetros:
- name: string (required)
- lastname: string (required)
- document: number
- course: string (required)
- grade: number (required)

Ejemplo:

  REQUEST BODY:
    {
      "name": "Andrés Felipe",
      "lastname": "Isaza Arboleda",
      "document": 1234567890,
      "course": "Ingeniería Web",
      "grade": 4.5
    }

  RESPONSE:
    {
      "_id": "5e9bb6e917592c2a6426f6c3",
      "name": "Andrés Felipe",
      "lastname": "Isaza Arboleda",
      "document": 1234567890,
      "course": "Ingeniería Web",
      "grade": 4.5,
      "__v": 0
    }
```

- **PUT /students/:id** Actualiza un estudiante

```
Parámetros: Los campos que se deseen actualizar.

Ejemplo:
  REQUEST BODY: 
    {
      "name": "Andrés",
      "grade": 5
    }
  RESPONSE:
    {
      "_id": "5e9bb6e917592c2a6426f6c3",
      "name": "Andrés",
      "lastname": "Isaza Arboleda",
      "document": 1234567890,
      "course": "Ingeniería Web",
      "grade": 5,
      "__v": 0
    }
```

- **DELETE /students/:id** Elimina un estudiante

```
  {
    "message": "Student with id: 5e9bb86071e0f12bd39f8a8f was deleted"
  }
```

- **POST /students/average** Retorna el promedio de la nota de todos los estudiantes

```
  {
    "average": 4
  }
```

- **POST /students/updateGrade** Actualiza todos los estudiantes que cumplan con el criterio especificado

```
Parámetros
  rule: string (required) (GREATER_THAN | LESS_THAN | EQUALS_TO)
  currentGrade: number (required)
  newGrade: number (required)

  Ejemplo:
    REQUEST BODY:
      {
        "rule": "EQUALS_TO",
        "currentGrade": 4.5,
        "newGrade": 2
      }

    RESPONSE: 
      {
        "message": "Students updated successfully",
        "rule": "EQUALS_TO 2",
        "students": 
        [
          {
            "_id": "5e9bb6e917592c2a6426f6c3",
            "name": "Andrés",
            "lastname": "Arboleda",
            "document": 96061516104,
            "course": "Ingeniería Web",
            "grade": 2,
            "__v": 0
          }
        ]
      }
```
