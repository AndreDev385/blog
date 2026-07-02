---
title: Handling errors with Effect
description: "Effect is, in my opinion, the best way to make your TypeScript codebase have robust and reliable error handling."
date: 2026-07-02
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/effect.jpg
tags:
  - typescript
  - effect
---

![Effect logo, TypeScript library for typed error handling](https://andre385.sirv.com/Portfolio%20%26%20Blog/effect.jpg)

A while ago I published a post about [errors as values in TypeScript](/en/blog/errors-as-values) and how the `throw` system brings more problems than it solves. In a large project, it ends up being more harmful than useful, in my opinion. Although there are several workarounds, none of them are fully reliable, and you are very exposed to one of those hidden errors reaching production.

# Effect

So far, it has always seemed like a complicated topic to me. Depending on the project you work on and your team, it is usually handled differently. That is one of the cases that [Effect](https://effect.website/) solves: a complete ecosystem made up of several libraries whose main strength is error handling in TypeScript.

Effect is responsible for turning errors into TypeScript values. This makes every error that can occur during code execution explicit and forces you to handle it. Effect offers many more features, but error handling is the main case I want to address this time.

The first point highlighted on the Effect website is:

> Maximum Type-safety (incl. error handling)

And, in my opinion, it is one of the most valuable things about this paradigm.

## Composition

When creating an effect, three elements are made explicit:

- The value obtained in case of success.
- The error obtained in case of failure.
- The dependencies needed to run the effect.

When executing it, you are required to handle every possible error your function can return. It is similar to how [Go](https://go.dev/) or [Rust](https://rust-lang.org/) work: error handling is explicit in your project.

In addition, Effect allows you to compose effects, which makes it more interesting, practical, and useful. Using pipes or generators, you can build more complex flows. Both mechanisms work with *short-circuiting*, that is, the function advances step by step until an error occurs. If that happens, the error is returned immediately. Because every possible error is known by the type system, your code will handle it gracefully no matter how much your project grows. Effect ensures robustness and safety for your product, preventing unhandled errors from reaching production.

## A simple example

A minimal example looks like this:

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

The type `Effect.Effect<User, HttpError>` makes it clear that this operation can produce an `HttpError`. There is no way to accidentally ignore that error: the compiler will force you to deal with it.

## A more complete example: user registration

To see what a real flow looks like, let's imagine user registration. The effect must validate the email, validate the password, check that the user does not already exist, and finally save them to the database. In addition, it needs access to the database pool as a dependency:

```ts
import { Context, Effect } from "effect";

// Domain errors
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

// Dependency: database access
class Database extends Context.Tag("Database")<
  Database,
  {
    readonly query: (
      sql: string,
      params: readonly unknown[]
    ) => Effect.Effect<readonly unknown[], DatabaseError>;
  }
>() {}

// Effects with pipes
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
    : Effect.fail(new ValidationError("email", "The email is not valid"));

const validatePassword = (password: string) =>
  password.length >= 8
    ? Effect.succeed(password)
    : Effect.fail(
        new ValidationError("password", "Password must be at least 8 characters long")
      );

const hashPassword = (password: string) =>
  Effect.sync(() => `hashed_${password}`);

// Effect with generators
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

The signature of `createUser` would look something like this:

```ts
Effect.Effect<User, ValidationError | UserAlreadyExistsError | DatabaseError, Database>
```

This summarizes a large part of Effect's value: we know exactly what the function can return, what can fail, and what it needs to run. Anyone using `createUser` will be forced to handle each of those errors and provide the database dependency.

## Incremental adoption

Even if the `function*/yield*` syntax seems strange or uncomfortable to you, with generators it is quite similar to how we use `async/await`. It just takes a little time to get used to the syntax, and it is a minimal cost compared to everything it offers you. Spending a couple of hours on the documentation and doing a few simple examples is enough to start noticing all the value and getting used to it.

Effect can be adopted incrementally: you can start using it only for validations with the `Schema` library, then for dependency injection, and gradually increase it as you feel comfortable. And the good thing is that the more you use it, the more value you gain.

## Conclusion

If it has happened to you as it has to me and one of those errors has ruined your day, you will appreciate the usefulness of this library. And that is just one of its features. Effect also includes retries and interruptions, extremely useful when communicating with third-party services you cannot blindly trust and where you need to make your system resilient to failures. It also offers observability to add traceability to your code and identify _bugs_ in seconds, _scheduling_, _state management_, _caching_, _concurrency_ and much more.

If you made it this far, thank you for reading my post. If you found Effect interesting, what are you waiting for to try it? If you have already tried it, I would love to hear about your experience and what you have found most useful.
