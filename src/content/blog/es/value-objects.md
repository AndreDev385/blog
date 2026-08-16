---
title: Value Objects
description: El concepto base de DDD y Clean Architecture. Evita el code smell primitive obsession.
date: 2025-07-11
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/ddd.png
tags:
  - typescript
  - ddd
---

![Value Objects en Domain-Driven Design - ilustración conceptual](https://andre385.sirv.com/Portfolio%20%26%20Blog/ddd.png)

# Value objects

Hace ya más de un año que en mi búsqueda por aprender cómo escribir código limpio y estructurar mejor mis proyectos leí por primera vez sobre `Clean Architecture` y `Domain Driven Design`. Temas completamente nuevos y con muchos conceptos que me costó entender y aplicar en mis propios proyectos y en los cuales hasta el día de hoy sigo profundizando e interiorizando conocimiento que me ha ayudado a mejorar cómo escribo código y estructuro mis proyectos siguiendo estas buenas prácticas.

## ¿Qué es un Value Object?

Uno de los primeros conceptos que pude entender y empezar a usar en mi código es el concepto de `Value Objects`. Este se refiere a una forma de representar conceptos del dominio como un compuesto, que al agruparse se comporta como una única unidad coherente, aportando así semántica y cohesión.

Hay muchos ejemplos de cosas que podemos representar como `Value Objects`:

- Una **cantidad de dinero** está compuesta por un número y un símbolo
- Una **coordenada 2D** está compuesta por un valor numérico en el eje X y otro en el eje Y
- Una **dirección de correo electrónico** está compuesta por una cadena de texto que debe contener un formato específico
- Un **rango de fechas** está compuesto por dos fechas: una de inicio y una final

## Propiedades Clave de los Value Objects

Para usar correctamente el concepto de Value Objects, nuestro código debe seguir 3 principios fundamentales a la hora de crearlos

### Inmutabilidad

Un value object debe ser **inmutable**. Esto significa que una vez que una instancia es creada, su estado interno no puede ser modificado. Si un valor debe ser "cambiado", en realidad debes crear una **nueva instancia** con el valor diferente. Esta propiedad simplifica drásticamente la lógica de concurrencia, previene efectos secundarios inesperados y hace que el comportamiento del código sea más predecible.

### Igualdad por Valor

Dos Value Objects con los mismos valores internos deben ser considerados como **iguales**. Los Value Objects se comparan por el contenido de sus atributos. Si todos los componentes que definen el valor son idénticos, entonces los objetos son idénticos.

Por ejemplo, dos objetos `Money` que representan `100 USD` son iguales, incluso si son instancias diferentes en memoria.

```ts
class Point2D {
  constructor(public readonly x: number, public readonly y: number) {}

  equals(other: Point2D): boolean {
    if (!(other instanceof Point2D)) {
      return false
    }

    return other.x === this.x && other.y === this.y;
  }
}

const first = new Point2D(0, 0)
const second = new Point2D(0, 0)

first.equals(second) // true
```

### Validación

Un Value Object solo debe aceptar valores que tengan sentido en su propio contexto. Esto significa que **no puedes crear un Value Object con un valor que no sea válido**. La validación ocurre en el momento de la construcción del objeto, garantizando que un Value Object siempre estará en un estado válido.

## Usando Value Objects

Basta de teoría, es hora de ver un ejemplo de cómo un value object puede aportar valor a nuestro código.

Se nos ha asignado manejar un caso de uso para crear un nuevo usuario, para completarlo, nuestro caso de uso debe:

- Validar que sea un correo válido
- Validar que sea una contraseña válida
- Guardar los datos del usuario

Empecemos con un código base que no utiliza value objects y a partir de este hagamos un refactor

```ts
class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async createUser(data: UserData) {
    if (!isValidEmail(data.email)) {
      throw new InvalidEmail(data.email);
    }

    if (!isValidPassword(data.password)) {
      throw new InvalidPassword(data.password);
    }

    await this.repository.save(data.email, data.password);
  }
}

function isValidEmail(value: string): boolean {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  return emailRegex.test(value);
}

function isValidPassword(value: string): boolean {
  if (value.length < 6) return false;

  return true;
}
```

En este primer ejemplo las funciones que validan el correo y la contraseña pueden estar básicamente en cualquier lado de nuestro codebase ya que pueden ser utilizadas por otros casos de uso, así que terminarán en una carpeta donde haya otras funciones de validación o, peor aún, en la carpeta `/utils` que soporta cualquier código.

Nuestro primer paso es crear clases que representen nuestros value objects de `UserEmail` y `UserPassword`. Podríamos llamarlos directamente 'Email' o 'Password', debido a que estos nombres son más genéricos puede haber en otras zonas de nuestro codebase value objects que sean correos pero que no pertenezcan directamente a un usuario, de igual manera con las contraseñas. Qué tan específico es el nombre depende totalmente de tu contexto.

```ts
class UserEmail {
  constructor(public readonly value: string) {}
}

class UserPassword {
  constructor(public readonly value: string) {}
}
```

Al crear nuestras clases con una propiedad `readonly` directamente le estamos diciendo a nuestro yo futuro y a nuestros compañeros de equipo que el valor de esta propiedad no espera ser cambiada, de esta manera para cambiar el email de un usuario deberíamos crear una nueva instancia de `UserEmail`. Ahora agreguemos las validaciones.

```ts
class UserEmail {
  constructor(public readonly value: string) {
    if (!UserEmail.isValidEmail(value)) {
      throw new InvalidEmail(value);
    }
  }

  private static isValidEmail(value: string): boolean {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    return emailRegex.test(value);
  }

  equals(other: UserEmail): boolean {
    if (!(other instanceof UserEmail)) {
      return false;
    }
    return this.value === other.value;
  }
}

class UserPassword {
  constructor(public readonly value: string) {
    if (!UserPassword.isValidPassword(value)) {
      throw new InvalidPassword(value);
    }
  }

  private static isValidPassword(value: string): boolean {
    if (value.length < 6) return false;

    return true;
  }

  equals(other: UserPassword): boolean {
    if (!(other instanceof UserPassword)) {
      return false;
    }
    return this.value === other.value;
  }
}
```

De esta forma las validaciones de nuestro correo y contraseña no estarán flotando en alguna parte de nuestro código, sino directamente vinculadas al lugar en donde van a ser usadas.

Al agregar la validación en el constructor nos aseguramos de que no sea posible crear un correo con un string cualquiera, o una contraseña que no posea al menos 6 caracteres.

Ahora utilicemos nuestros value objects en la función de crear usuario.

```ts
class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async createUser(data: UserData) {
    const email = new UserEmail(data.email);
    const password = new UserPassword(data.password);

    await this.repository.save(email, password);
  }
}
```

Con este refactor nos aseguramos de aportar cohesión y semántica en nuestro proyecto al juntar toda la lógica referente a correo y contraseña de nuestros usuarios bajo sus respectivos value objects, de esta manera, la próxima vez que tengamos que agregar un caso de uso en donde debamos agregar funcionalidad que tenga que ver con nuestro correo o contraseña sabremos exactamente adónde ir.

Siguiendo con el ejemplo, guardar nuestras contraseñas sin encriptar es una mala práctica. Agreguemos esta funcionalidad a nuestro value object.

```ts
import bcrypt from "bcryptjs";

class UserPassword {
  //... Resto de la implementación

  public static create(plainPassword: string): UserPassword {
    if (!UserPassword.isValidPassword(plainPassword)) {
      throw new InvalidPassword("Password does not meet minimum length requirements.");
    }
    return new UserPassword(bcrypt.hashSync(plainPassword, 10));
  }

  verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.value);
  }
}
```

La contraseña solo debe ser encriptada la primera vez que es creado este valor. Por ende, agregando el método estático `create` nos aseguramos de que el hash sea usado solo la primera vez.

En otro caso de uso como cambiar contraseña o iniciar sesión es necesario comprobar que el valor ingresado por el usuario es igual a la contraseña original. Logramos esta comparación a través del método `verifyPassword`.

## Conclusión

Usar value objects en nuestro código nos aporta semántica ya que no tendremos valores primitivos a lo largo de nuestro código sino que tendremos tipos más específicos que nos dan más contexto sobre lo que representa cada valor en nuestro código, creando un código más legible.

Nos aporta más cohesión, como hemos visto con el ejemplo de correo y contraseña al crear un value object que represente estos valores creamos un punto en la organización de nuestro proyecto en donde tiene sentido por contexto seguir agregando toda la funcionalidad que esté relacionada con dicho concepto.

Nos aporta seguridad, al hacer las validaciones al momento de crear el value object, nos aseguramos de que un value object jamás tendrá un estado inválido.

Si llegaste hasta este punto, gracias por leer mi contenido. Espero que haya sido de tu agrado.
