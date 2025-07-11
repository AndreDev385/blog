---
title: Value Objects
description: El concepto base de DDD y Clean Architecture. Evita el code smell primitive obsession.
date: 2025-07-11
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/Value%20Objects/value_objects.png
tags:
  - typescript
  - clean architecture
---

![Value Object](https://andre385.sirv.com/Portfolio%20%26%20Blog/Value%20Objects/value_objects.png?w=1280)

# Value objects

Hace ya mas de un año que en mi búsqueda por aprender como escribir código limpio y estructurar mejor mis proyectos leí por primera vez sobre `Clean Architecture` y `Domain Driven Design`. Temas completamente nuevos y con muchos conceptos que me costó entender y aplicar en mis propios proyectos y en los cuales hasta el día de hoy sigo profundizando e interiorizando conocimiento que me ha ayudado a mejorar como escribo código y estructuro mis proyectos siguiendo estas buenas practicas.

## Qué es un Value Object?

Uno de los primeros conceptos que pude entender y empezar a usar en mi código es el concepto de `Value Objects`. El cual se refiere a una forma de representar cosas como un compuesto, que al agruparse se comporta como una única unidad coherente aportando así, semántica y cohesion.

Hay muchos ejemplos de cosas que podemos representar como `Value Objects`

- Una **cantidad de dinero** esta compuesta por un número y un símbolo
- Una **coordenada 2D** esta compuesta por un valor numérico en el eje X y otro en el eje Y
- Una **dirección de correo electrónico** esta compuesta por una cadena de texto que debe contener un formato específico
- Un **rango de fechas** esta compuesta por dos fechas una de inicio y una final

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
    if (!(other instanceof 2DPoint)) {
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

Un Value Object solo debe aceptar valores que hagan sentido en su propio contexto. Esto significa que **no puedes crear un Value Object con un valor que no sea válido**. La validación ocurre en el momento de la construcción del objeto, garantizando que un Value Object siempre estará en un estado válido.

## Usando Value Objects

Basta de teoría es hora de ver un ejemplo de como un value object puede aportar valor a nuestro código.

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

    if (!isValidPassword(data.email)) {
      throw new InvalidPassword(data.password);
    }

    await this.repository.save(data.email, data.password);
  }
}

function isValidEmail(value: string): boolean {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  return emailRegex.test(email);
}

function isValidPassword(value: string): boolean {
  if (value.length < 6) return false;

  return true;
}
```

En este primer ejemplo las funciones que validan el correo y la contraseña pueden estar básicamente en cualquier lado de nuestro code base ya que pueden ser utilizadas por otros casos de uso, así que terminaran en una carpeta donde abran otras funciones para validar o peor aún la carpeta `/utils` que soporta cualquier código.

Nuestro primer paso es crear clases que representen nuestros value objects de `UserEmail` y `UserPassword`. Podríamos llamarlos directamente 'Email' o 'Password', debido a que estos nombres son mas genéricos puede haber en otras zonas de nuestro code base value objects que sean correos pero que no pertenezcan directamente a un usuario, de igual manera con las contraseñas, que tan específico es el nombre depende totalmente de tu contexto.

```ts
class UserEmail {
  constructor(public readonly value: string) {}
}

class UserPassword {
  constructor(public readonly value: string) {}
}
```

Al crear nuestras clases con una propiedad `readonly` directamente le estamos diciendo a nuestro yo futuro y a nuestros compañeros de equipo que el valor de esta propiedad no espera ser cambiado, de esta manera para cambiar el email de un usuario deberíamos crear una nueva instancia de `UserEmail`. Ahora agreguemos las validaciones

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

    return emailRegex.test(email);
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
      throw new InvalidEmail(value);
    }
  }

  private static isValidPassword(value: string): boolean {
    if (value.length < 6) return false;

    return true;
  }

  equals(other: UserEmail): boolean {
    if (!(other instanceof UserEmail)) {
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

Con este refactor nos aseguramos de aportar cohesión y semántica en nuestro proyecto al juntar toda la lógica referente a correo y contraseña de nuestros usuarios bajo sus respectivos value objects, de esta manera, la próxima vez que tengamos que agregar un caso de uso en donde debamos agregar funcionalidad que tenga que ver con nuestro correo o contraseña sabremos exactamente a donde ir.

Siguiendo con el ejemplo guardar nuestras contraseñas sin encriptar es una mala practica. Agreguemos esta funcionalidad a nuestro value object.

```ts
import bcrypt from "bcryptjs";

class UserPassword {
  //... Resto de la implementación

  public static create(plainPassword: string): boolean {
    if (!UserPassword.isValidPassword(plainPassword)) {
      throw new InvalidPasswordError();
    }
    return new UserPassword(bcrypt.hashSync(plainPassword, 10));
  }

  verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.value);
  }
}
```

La contraseña solo debe ser encriptada la primera vez que es creado este valor por ende agregando el método estático `create` nos aseguramos de que el hash sea usado solo la primera vez.

En otro caso de uso como cambiar contraseña o iniciar sesión es necesario comprobar que el valor ingresado por el usuario es igual a la contraseña original. Logramos esta comparación a través del método `verifyPassword`.

## Conclusión

Usar value objects en nuestro código nos aporta semántica ya que no tendremos valores primitivos a lo largo de nuestro código sino que tendremos tipos mas específicos que nos dan más contexto sobre lo que representa cada valor en nuestro código, creando un código mas legible.

Nos aporta mas cohesión, como hemos visto con el ejemplo de correo y contraseña al crear un value object que represente estos valores creamos un punto en la organización de nuestro proyecto en donde tiene sentido por context seguir agregando toda la funcionalidad que este relacionada con dicho concepto.

Nos aporta seguridad, al hacer las validaciones al momento de crear el value object, nos aseguramos de que un value object jamás tendrá un estado inválido.

Si llegaste hasta este punto gracias por leer mi contenido, espero que haya sido de tu agrado.
