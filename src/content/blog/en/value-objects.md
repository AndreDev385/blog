---
title: Value Objects
description: The core concept of DDD and Clean Architecture. Avoids the primitive obsession code smell.
date: 2025-07-11
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/value-objects.png
tags:
  - typescript
  - ddd
---

![Value Object](https://andre385.sirv.com/Portfolio%20%26%20Blog/value-objects.png?w=1280)

# Value Objects

Over a year ago, in my quest to learn how to write clean code and better structure my projects, I first read about `Clean Architecture` and `Domain Driven Design`. These were completely new topics with many concepts that I found challenging to understand and apply in my own projects. To this day, I continue to delve deeper and internalize knowledge that has helped me improve how I write and structure my code following these good practices.

## What is a Value Object?

One of the first concepts I was able to grasp and start using in my code was the idea of `Value Objects`. This refers to a way of representing domain concepts as a composite, which, when grouped, behaves as a single coherent unit, thus providing semantics and cohesion. Think of it as a small unit that, by itself, has a complete and well-defined meaning within your domain.

There are many examples of things we can represent as Value Objects:

- A **monetary amount** composed of a number and a symbol (e.g., 100 USD)
- A **2D coordinate** composed of a numeric value on the X-axis and another on the Y-axis (e.g., (10, 25))
- An **email address** composed of a string that must contain a specific format (e.g., user@domain.com)
- A **date range** composed of a start date and an end date, and perhaps logic to check if a date falls within that range or if it overlaps with another.

## Key Properties of Value Objects

To correctly use the concept of Value Objects, our code must adhere to 3 fundamental principles when creating them:

### Immutability

A Value Object must be **immutable**. This means that once an instance is created, its internal state cannot be modified. If a value needs to be "changed," you must actually create a new instance with the different value. This property drastically simplifies concurrency logic, prevents unexpected side effects, and makes code behavior more predictable.

### Equality by Value

Two Value Objects with the same internal values must be considered equal. Unlike Entities (which are identified by a unique, mutable ID), Value Objects are compared by the content of their attributes. If all the components that define the value are identical, then the objects are identical.

For example, two Money objects representing 100 USD are equal, even if they are different instances in memory.

```ts
class Point2D {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  equals(other: Point2D): boolean {
    if (!(other instanceof Point2D)) {
      // Correction: "Point2D" instead of "2DPoint"
      return false;
    }
    return other.x === this.x && other.y === this.y;
  }
}

const first = new Point2D(0, 0);
const second = new Point2D(0, 0);

first.equals(second); // true
```

### Self Validation

A Value Object must only accept values that make sense within its own context. This means you cannot create a Value Object with an invalid value. Validation occurs at the moment of object construction, ensuring that a Value Object will **always be in a valid state.**

## Using Value Objects in Practice

Enough with the theory; it's time to see an example of how a Value Object can add value to our code.

We've been assigned to handle a use case for creating a new user. To complete it, our use case must:

- Validate that it's a valid email
- Validate that it's a valid password
- Save the user's data

Let's start with a base code that doesn't use Value Objects and then refactor it.

```ts
class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async createUser(data: UserData) {
    if (!isValidEmail(data.email)) {
      throw new InvalidEmail(data.email);
    }

    if (!isValidPassword(data.password)) {
      // Correction: data.password instead of data.email
      throw new InvalidPassword(data.password);
    }

    await this.repository.save(data.email, data.password);
  }
}

function isValidEmail(value: string): boolean {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  return emailRegex.test(value); // Correction: value instead of email
}

function isValidPassword(value: string): boolean {
  if (value.length < 6) return false;

  return true;
}
```

In this first example, the functions that validate the email and password can basically be anywhere in our codebase, as they might be used by other use cases. Thus, they will end up in a folder with other validation functions, or worse, in a `/utils` folder that supports any code, diluting the cohesion of the domain.

Our first step is to create classes that represent our `UserEmail` and `UserPassword` Value Objects. We could call them simply 'Email' or 'Password', but `UserEmail` and `UserPassword` are more specific and provide a clear bounded context. If, in another part of our application, an "email" has different rules (e.g., a billing email), we can create a separate `BillingEmail`.

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

  // Implementation of equality by value
  public equals(other: UserEmail): boolean {
    if (!(other instanceof UserEmail)) {
      return false;
    }
    return this.value === other.value;
  }
}

class InvalidEmail extends Error {
  constructor(value: string) {
    super(`The email <${value}> is not valid.`);
    this.name = "InvalidEmail";
  }
}

class InvalidPassword extends Error {
  // New error class for passwords
  constructor(message: string = "The password provided is not valid.") {
    // Added default message
    super(message);
    this.name = "InvalidPassword";
  }
}

// Now, let's adjust UserPassword to handle hashing and validation more robustly.
import bcrypt from "bcryptjs"; // Ensure bcryptjs is installed

class UserPassword {
  constructor(public readonly value: string) {}

  // Static method to validate the complexity of a PLAIN password
  private static isValidPassword(plainPassword: string): boolean {
    return plainPassword.length >= 6; // E.g., minimum 6 characters
  }
  // Implementation of equality by value (comparing the hashes)
  public equals(other: UserPassword): boolean {
    if (!(other instanceof UserPassword)) {
      return false;
    }
    // Compare the hashed values directly
    return this.value === other.value;
  }
}
```

This way, our email and password validations won't be "floating" somewhere in our code, but rather directly linked to where they make sense: within their own Value Object.

By adding validation in the constructor (or a factory method like create), we ensure that it's not possible to create a `UserEmail` with any random string, or a `UserPassword` that doesn't have at least 6 characters (before hashing). This enforces a guarantee of validity from the point of creation.

Now, let's use our Value Objects in the user creation function. Notice how UserCreator becomes cleaner and focuses on its primary responsibility.

```ts
class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async createUser(data: UserData) {
    // Value Objects handle their own validations
    const email = new UserEmail(data.email);
    const password = new UserPassword(data.password);

    // The repository now works with Value Objects, not loose primitives
    await this.repository.save(email, password);
  }
}
```

With this refactor, we ensure that we bring cohesion and semantics to our project. By grouping all the logic related to our users' email and password under their respective Value Objects, we create a central point in our project's organization. The next time we need to add functionality related to our email or password (such as email normalization or password complexity policies), we'll know exactly where to go.

Furthermore, Value Objects can encapsulate more business logic. For example, storing un encrypted passwords is a bad practice. Let's add this functionality to our `UserPassword` Value Object.

```ts
class UserPassword {
  // ...

  // Factory method to create a new UserPassword (e.g., when registering a user)
  public static create(plainPassword: string): UserPassword {
    if (!UserPassword.isValidPassword(plainPassword)) {
      throw new InvalidPassword(
        "Password does not meet minimum length requirements.",
      ); // Throw specific error
    }
    const hashedPassword = bcrypt.hashSync(plainPassword, 10);
    return new UserPassword(hashedPassword); // The constructor now receives the hash
  }

  // Method to verify if a plain password matches the stored one
  public verify(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this.value);
  }
}
```

In the `UserPassword` example above, we've added a static create method that handles hashing and a verify method for comparison, following security best practices. The password should only be encrypted the first time this value is "created" (e.g., during registration). By using the static method `UserPassword.create(plainPassword)`, we ensure that the hash is generated and the `UserPassword` object is instantiated with the hashed value.

In another use case, such as changing a password or logging in, it's necessary to check that the value entered by the user is equal to the original password. We achieve this comparison through the `verify(plainPassword)` method.

## Conclusion

Using Value Objects in our code provides us with multiple benefits:

- **Enriched Semantics:** We won't have "floating" primitive values throughout our code. Instead, we'll have more specific types that give us more context about what each value represents in our code, leading to more readable code.
- **Improved Cohesion:** As we've seen with the email and password example, by creating a Value Object to represent these values, we create a point in our project's organization where it makes sense, by context, to continue adding all functionality related to that concept.
- **Guaranteed Safety and Validity:** By performing validations at the moment of Value Object creation, we ensure that a Value Object will never be in an invalid state. This reduces the possibility of errors and makes our code more robust and reliable.
- **More Readable and Maintainable Code:** By encapsulating domain logic in small objects with clear responsibilities, the code becomes easier to read, understand, and maintain.

If you've made it this far, thank you for reading my content! I hope it was to your liking and that you now feel more motivated to apply the power of Value Objects in your own projects.
