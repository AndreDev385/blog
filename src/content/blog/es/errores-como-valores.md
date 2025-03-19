---
title: Errores como valores en Typescript
description: Aprende a como utilizar el sistema de tipado para mejorar la forma en que manejas los errores en tu código de Typescript
date: 2024-10-23
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/typescript.png
tags:
  - typescript
---

![Typescript](https://andre385.sirv.com/Portfolio%20%26%20Blog/typescript.png)
Uno de los problemas más importantes con el que me encuentro en el ecosistema de JavaScript/TypeScript es el flujo oculto de los errores. Cuanto vas a invocar una función no hay forma de saber si esta function puede fallar y enviar un error mirando la firma de la función. Ir hasta la definición de la función no es exactamente la mejor idea. Si tu base de código es lo suficientemente grande, puedes tener muchas funciones que puedan fallar.

Encuentro esa situación bastante problemática. Terminaremos con muchos casos no manejados apropiadamente y esos errores pueden permanecer ocultos hasta tiempo de ejecución, por supuesto, nadie quiere que errores inesperados aparezcan en producción.

## El problema
El código a continuación es un ejemplo de una función que no maneja los posibles errores y es muy común. 
```typescript
async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`);
  return await response.json();
}
```
En `frontend`, el `fetching` the datos is una tarea muy común donde pueden ocurrir muchos errores aunque no estés consiente de ello. 

En este ejemplo, la función `fetch` puede puede resultar en un error por multiples razones, una de ellas es que el `string` no sea una URL válida.

`JSON.parse()` es usado en el método `.json()` y puede fallar si el argumento no es un objeto `JSON` válido.

A su vez, el resultado de la función fetch es siempre desconocido, puede responde con un código `HTTP` 400 o 500, en tal caso el objeto que devuelve nuestra función no seria un objeto `User` 

Así que tenemos varios casos que manejar.

## Lidiando con errores
Alguna vez te has encontrado pensando:
- Dónde debería enviar un error para ser consumido por un bloque `try/catch`?
- Debería el `try/catch` estar en la función que puede dar error? O en el código que invoca dicha función?
- Dónde debería ser manejado el error?

Muchas preguntas pueden aparecer cuando lidiamos con errores

Yo solía batallar con estos problemas in mi código sobretodo con: 
- Validaciones
- Fetching de datos
- Consultas a la base de datos

Constantemente terminaba agregando muchos `try/catch` en mi código, sin estar del todo seguro de como manejar el error al invocar una función. Cuando decidía manejar cada uno de los posibles errores que podría ocurrir, pasé muchos por alto o me decía a mi mismo "Luego manejare ese caso" y por supuesto, no lo hacia. Luego estos errores aparecían en tiempo de ejecución haciéndome sentir inseguro sobre si mi código estaba libre de bugs y de si estaba manejando lo casos de error correctamente.  

## Cómo manejan los errores otros lenguajes?
Durant el año pasado, he estado muy interesado en [Rust](https://www.rust-lang.org/) y he aprendido un poco a cerca del lenguaje, pienso que un lenguaje interesante y con una manera muy diferente (al menos para mi) de lidiar con cosas como seguridad, rendimiento y manejo de memoria.   

Descubrí que tiene un enfoque fascinante para lidiar con los errores. Hay un `Enum` llamado `Result` que contiene un valor `Ok` o un valor `Err`.
```rust
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}
```
`Ok` Y `Err` a su vez son `Enums`, envolturas que tienen un valor de tipo `T` o `E` respectivamente.

El compilador de Rust the obliga a manejar cada caso en el que puede ocurrir un error; cada función que puede falla devuelve un valor `Result` en vez de hacer un `throw` de algún error. El resultado de dicha función sera un `Ok(T)` o un `Err(E)` y el código que invoca a la función debe lidiar con ambos casos.   
```rust
let number = match number_str.parse::<i32>() {
    Ok(number)  => number,
    Err(e) => return Err(e),
};
```
## Convertir errores en valores
Desde que aprendí algo de `Rust` decidí utilizar el mismo enfoque en mi código TypeScript. Creé una clase `Result` que puede ser usada para envolver un `Ok` o un `Error`, mejorando la seguridad y robustez de mi código.

En este articulo de [Khalil Stemmler](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/) explica como puedes implementar esta clase `Result` en TypeScript.

De esta manera los errores ahora son valores y son devueltos de la función en vez de ser arrojados al próximo `try/catch`.

Mientras seguí aprendiendo sobre Rust, me di cuenta que tiene ciertas herramientas que te ayudan a lidiar con el manejo de errores de manera efectiva. El operador `?` puede ser usado para devolver de manera temprana un error de una función que sea compatible el tipo de error que puede devolver el código donde esta siendo usado el operador `?`. Este operador mejora enormemente la legibilidad, permitiéndote concentrarte más en la solución que quieres implementar y menos en lidiar con cada error aunque siguen siendo manejados, también disminuye la cantidad de repetición en el código
```rust
fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    let first_number = first_number_str.parse::<i32>()?;
    let second_number = second_number_str.parse::<i32>()?;

    Ok(first_number * second_number)
}
```
En ésta función, usamos el operador `?` para devolver el error si el `string` no es una cadena que pueda ser convertida en un `integer` (número). Esto elimina lo repetitivo de manejar ambos casos y mejora la legibilidad

Este resultado no es posible de conseguir utilizando la clase `Result` en TypeScript, haciendo que tengamos que manejar el error explícitamente con un `if` chequeando que el valor es un `Err`, como se hace en [Go](https://go.dev/)
```go
func Hello(name string) (string, error) {
    // If no name was given, return an error with a message.
    if name == "" {
        return "", errors.New("empty name")
    }
    // If a name was received, return a value that embeds the name
    // in a greeting message.
    message := fmt.Sprintf("Hi, %v. Welcome!", name)
    return message, nil
} 
```
El código que llama a la función se vería algo así: 
```go
func main() {
    message, err := greetings.Hello("")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(message)
}
```
## Utilizando el sistema de tipado
Ya que replicar el operador `?` no parece ser una buena opción en TypeScript. Utilizar el sistema de tipos a tu favor para manejar lo errores es mejor que utilizar un `wrapper` como `Result` o `Either` (de programación funcional). Este enfoque evita la necesidad de agregar este `wrapper` y lidiar de igual manera con los errores.

TypeScript nos puede ayudar a crear un comportamiento similar al de `Result` solo creando un `union type` `Success | Error` en la firma de nuestra función

Ahora es posible para nosotros solo con mirar la firma de la función saber si esta puede fallar.

Con esto en mente, reescribamos nuestra función inicial para manejar cada caso y obligar al código que llame nuestra función a lidiar con el caso de error.
```typescript
async function getUser(id: number): Promise<User | Error> {
  try {
    const response = await fetch(`/users/${id}`);

    if (!response.ok) {
      return new Error('Something went wrong');
    }

    return await response.json();

  } catch (error) {
    return new Error('Something went wrong');
  }
}
```
Con esta nueva firma nuestra función devuelve el tipo `Promise<User | Error>` obligando a que el código que invoque la función maneje al caso de error. 

En el `if` chequeamos que la respuesta sea un 200 OK, y si no, devolvemos un error.

Con el `try/catch`, manejamos el caso de error que provenga de la función `fetch` o `.json()`. Si es importante diferenciar entre ambos errores siempre puedes agregar mas `try/catch` y devolver un error mas específico para cada caso.

El código que llama a nuestra function se de la siguiente manera:
```typescript
const userOrError = await getUser(1);

if (userOrError instanceof Error) {
  // Se maneja el caso de error retornando el error un nivel mas arriba
  return userOrError;
}
// Por debajo de este if `userOrError` es de tipo `User`
```
Cuando la promesa es resuelta obtenemos un valor de tipo `User | Error`, chequeamos si el valor es una instancia de `Error` con el operador `instanceof`

Puedes devolver el error un nivel mas arriba o decidir manejarlo de otra manera, depende de ti y tu contexto específico.

Después del `if` TypeScript se asegura de que la variable `userOrError` es de tipo `User`.

## Un caso personal
En el siguiente ejemplo estoy definiendo una función que `mapea` un `string` en formato ISO `2024-10-23` a un objeto con año, mes y día llamado `DateValues`
```typescript
export function mapISODateToDateValues(date: ISODate): DateValues {
  const [year, month, day] = splitByDash(date).map(Number);
  return { year, month, day };
}
```

`splitByDash` es una función que se explica así misma, divide nuestro `string` por los `-` en un `array` de `strings`, Luego hago un `map` sobre ese `array` transformando los `string` en `number` y accedo a las posiciones 0, 1 y 2 las cuales devuelvo en un objeto con el forma que quiero.

Aún cuando esta función es bastante simple, tiene varios casos y posibles errores que deben ser considerados.

El `type alias` `ISODate` es al final un `string`, que puede llegar a ser diferente de lo que espero; si ese es el caso, las posiciones in el array pueden ser incorrectas, dejando nuestro objeto en un estado inválido.

Luego de separar los valores del `string` en un `array` son transformados a números, pero podemos conseguirnos con el caso de que no puedas ser transformados correctamente, lo que nos dejaría con `NaN`.

Esperamos que el `string` encaje con el formato `yyyy/MM/dd` pero incluso si lo hace los valores puedes ser incorrectos, que pasa si el mes tiene un valor de `13` o el día `32`. Debemos asegurarnos de que los valores sean válidos 

Así que debemos asegurarnos que nuestro objeto `DateValues` siempre tenga un estado valido. Para lograrlo, tenemos que agregar ciertas validaciones y cambiar la firma de nuestra función a `DateValues | Error`.
```typescript
export function mapISODateToDateValues(date: ISODate): Error | DateValues {
  const [year, month, day] = splitByDash(date).map(Number);

  if (!validNumber(year) || !validNumber(month) || !validNumber(day))
    return new Error("Invalid date");

  if (!validMonth(month)) return new Error("Invalid month");
  if (!validDay(day)) return new Error("Invalid day");

  return {
    year,
    month,
    day,
  };
}
```
La implementación de las validaciones esta fuera del tema de éste articulo, son simples funciones que devuelven si el argumento cumple con los criterios.

En esta nueva version nuestra función se asegura de que los valores cumplen requisitos para nuestro propósito, si alguna falla, devolvemos un `Error` con un mensaje.

Si todas las validaciones pasan devolvemos un objeto `DateValues`. Podemos esta seguro de que siempre estará en un estado válido.

El llamado a nuestra función se puede ver de esta manera:
```typescript
const dateValuesResult = mapISODateToDateValues(iso);
if (dateValuesResult instanceof Error) return dateValuesResult; // Return one level up the error
// debajo de esta parte `dateValuesResult` es de tipo `DateValues`
```
## Conclusión
Utilizar el sistema de tipos con estas implementaciones nos asegura: 
- Nuestros errores serán manejado en cada función que devuelva un union
- Nuestro código es mas seguro, robusto y manejara mas casos extremos.
- No tendremos flujos escondidos de errores

Debemos considerar casos como paquetes de terceros o funciones `built-in` que pueden fallar. Solucionar esto es cuestión de escribir un `wrapper` sobre dicha función. 

La seguridad de este enfoque se basa en que los principios sea respetados en todo el `codbase`, atrapar los errores en donde pueden ocurrir y asegurarnos de que la firma de nuestras funciones reflejen la posibilidad de que los errores ocurran.

Espero que este articulo haya sido de ayuda para ti, te agradezco si leíste hasta aquí y espero que este enfoque te ayude a mejorar tu código
