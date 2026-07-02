---
title: Manejando errores con Effect
description: "Effect es, en mi opinión, la mejor forma de lograr que tu codebase en TypeScript tenga un manejo de errores robusto y confiable."
date: 2026-06-15
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/effect.jpg
tags:
  - typescript
  - effect
---

![Logo de Effect, librería de TypeScript para manejo de errores tipados](https://andre385.sirv.com/Portfolio%20%26%20Blog/effect.jpg)

Hace un tiempo publiqué un post sobre [errores como valores en TypeScript](/es/blog/errores-como-valores) y sobre cómo el sistema de `throw` traía más problemas de los que resolvía. En un proyecto grande termina siendo más perjudicial que útil, en mi opinión. Aunque existen varios _workarounds_, ninguno es del todo fiable y quedas muy expuesto a que uno de esos errores ocultos llegue a producción.

# Effect

Hasta ahora siempre me ha parecido un tema complicado. Dependiendo del proyecto en el que trabajes y de tu equipo, se suele manejar de forma diferente. Ese es uno de los casos que resuelve [Effect](https://effect.website/): un ecosistema completo compuesto por varias librerías cuyo principal punto fuerte es el manejo de errores en TypeScript.

Effect se encarga de convertir los errores en valores de TypeScript. Esto hace explícito cada error que puede ocurrir durante la ejecución del código y te obliga a manejarlo. Effect ofrece muchas más funcionalidades, pero el manejo de errores es el caso principal que quiero abordar en esta ocasión.

El primer punto que destaca el sitio web de Effect es:

> Maximum Type-safety (incl. error handling)

Y, a mi parecer, es de lo más valioso que tiene este paradigma.

## Composición

Al crear un efecto se hacen explícitos tres elementos:

- El valor obtenido en caso de éxito.
- El error obtenido en caso de fallo.
- Las dependencias necesarias para ejecutar el efecto.

Al ejecutarlo es obligatorio manejar cada posible error que pueda retornar tu función. Es similar a cómo funcionan [Go](https://go.dev/) o [Rust](https://rust-lang.org/): el manejo de errores es explícito en tu proyecto.

Además, Effect permite componer efectos, lo cual lo hace más interesante, práctico y útil. Usando _pipes_ o generadores puedes construir flujos más complejos. Ambos mecanismos funcionan con _short-circuiting_, es decir, la función avanza paso a paso hasta que ocurre un error. Si eso pasa, ese error se retorna inmediatamente. Como cada posible error es conocido por el sistema de tipos, tu código lo manejará con gracia sin importar cuánto crezca el proyecto. Effect se encarga de proporcionar robustez y seguridad a tu producto, evitando que errores no manejados lleguen a producción.

## Un ejemplo sencillo

Un ejemplo mínimo se ve así:

```ts
import { Effect } from "effect";

class HttpError {
  readonly _tag = "HttpError";
  constructor(readonly message: string) {}
}

const fetchUser = (id: string): Effect.Effect<User, HttpError> =>
  Effect.tryPromise({
    try: () => fetch(`/users/${id}`).then((res) => res.json()),
    catch: (error) => new HttpError(`Failed to fetch user: ${error}`),
  });
```

El tipo `Effect.Effect<User, HttpError>` deja en claro que esta operación puede producir un `HttpError`. No hay forma de ignorar ese error accidentalmente: el compilador te obligará a lidiar con él.

## Un ejemplo más completo: registro de usuario

Para ver cómo se ve un flujo real, imaginemos el registro de un usuario. El efecto debe validar el correo, validar la clave, verificar que el usuario no exista y finalmente guardarlo en base de datos. Además, necesita el acceso al pool de base de datos como dependencia:

```ts
import { Context, Effect } from "effect";

// Errores de dominio
class ValidationError {
  readonly _tag = "ValidationError";
  constructor(
    readonly field: string,
    readonly message: string
  ) {}
}

class UserAlreadyExistsError {
  readonly _tag = "UserAlreadyExistsError";
  constructor(readonly email: string) {}
}

class DatabaseError {
  readonly _tag = "DatabaseError";
  constructor(readonly cause: unknown) {}
}

interface User {
  readonly id: string;
  readonly email: string;
}

// Dependencia: acceso a la base de datos
class Database extends Context.Tag("Database")<
  Database,
  {
    readonly query: (
      sql: string,
      params: readonly unknown[]
    ) => Effect.Effect<readonly unknown[], DatabaseError>;
  }
>() {}

// Efectos con pipes
const findUserByEmail = (email: string) =>
  Database.pipe(
    Effect.flatMap((db) => db.query("SELECT * FROM users WHERE email = ?", [email])),
    Effect.map((rows) => (rows as User[]).at(0))
  );

const insertUser = (email: string, passwordHash: string) =>
  Database.pipe(
    Effect.flatMap((db) =>
      db.query("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)", [
        crypto.randomUUID(),
        email,
        passwordHash,
      ])
    ),
    Effect.map(() => ({ id: crypto.randomUUID(), email }))
  );

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? Effect.succeed(email)
    : Effect.fail(new ValidationError("email", "El correo no es válido"));

const validatePassword = (password: string) =>
  password.length >= 8
    ? Effect.succeed(password)
    : Effect.fail(
        new ValidationError("password", "La clave debe tener al menos 8 caracteres")
      );

const hashPassword = (password: string) =>
  Effect.sync(() => `hashed_${password}`);

// Efecto con generadores
const createUser = (input: { readonly email: string; readonly password: string }) =>
  Effect.gen(function* () {
    const email = yield* validateEmail(input.email);
    const password = yield* validatePassword(input.password);

    const existing = yield* findUserByEmail(email);
    if (existing) {
      return yield* Effect.fail(new UserAlreadyExistsError(email));
    }

    const passwordHash = yield* hashPassword(password);
    return yield* insertUser(email, passwordHash);
  });
```

La firma de `createUser` quedaría más o menos así:

```ts
Effect.Effect<User, ValidationError | UserAlreadyExistsError | DatabaseError, Database>
```

Esto resume gran parte del valor de Effect: sabemos exactamente qué puede devolver la función, qué puede fallar y qué necesita para ejecutarse. Cualquiera que use `createUser` estará obligado a manejar cada uno de esos errores y a proveer la dependencia de base de datos.

## Adopción incremental

Aunque te pueda parecer rara o incómoda la sintaxis de `function*/yield*`, con los generadores es bastante similar a como usamos `async/await`. Solo lleva un poco de tiempo acostumbrarse a la sintaxis, y es un costo mínimo en comparación con todo lo que te ofrece. Dedicarle un par de horas a la documentación y hacer unos ejemplos sencillos es suficiente para empezar a notar todo el valor y acostumbrarte.

Effect puede ser adoptado de manera incremental: puedes empezar usándolo solo para validaciones con la librería `Schema`, luego para inyección de dependencias, e ir aumentando poco a poco según lo que te sientas cómodo. Y lo bueno es que, entre más lo usas, más valor adquieres.

## Conclusión

Si te ha pasado como a mí y uno de esos errores te ha arruinado un día, apreciarás la utilidad de esta librería. Y eso es solo una de sus funcionalidades. Effect también incluye reintentos e interrupciones, extremadamente útiles cuando te comunicas con servicios de terceros en los que no puedes confiar ciegamente y debes hacer tu sistema resistente a fallos. También ofrece observabilidad para agregar trazabilidad a tu código e identificar _bugs_ en segundos, _scheduling_, _state management_, _caching_, _concurrency_ y mucho más.

Si has llegado hasta aquí, gracias por leer mi post. Si te ha parecido interesante Effect, ¿qué esperas para probarlo? Si ya lo has probado, me gustaría saber sobre tu experiencia y qué es lo que has encontrado más útil.
