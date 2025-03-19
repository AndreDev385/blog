---
title: Errors as values in Typescript
description: Learn how to rely on the type system to improve the way you handle errors in your typescript code
date: 2024-10-23
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/typescript.png
tags:
  - typescript
---

![Typescript](https://andre385.sirv.com/Portfolio%20%26%20Blog/typescript.png)

One of the most important problems I find in the JavaScript/Typescript ecosystem is the hidden flow of errors. When you're about to consume a function, there's no way to know if that function throws an error by looking just at the function signature. Looking at the function definition isn't a good solution at all. If your code base is big enough, you can have a lot of functions that can throw errors.

I find that problematic. You will end with unhanded edge cases, those errors can remain hidden until runtime, and no one wants an unexpected error to pop up in production.

## The problem
The next code is an example of a function that does not handle errors or edge cases and can be very common.

```typescript
async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`);
  return await response.json();
}
```

In the front end, fetching data is a very common task where there can be a lot of errors hidden from you.

In this example, the `fetch` function can throw an error for several reasons, one of which is if the string is not a valid URL.

`JSON.parse()` is used under the hood in the `.json` method of the `fetch` response and is a function that can fail too if the argument is an invalid JSON object.

Moreover, the result of fetching is always unknown; it could be a 400 or 500 status code, in which case we know that the function's return value is not a User object at all.

So we have some edge cases to handle.

## Dealing with errors
Have you ever found yourself wondering:
- Where do you throw an error to be consumed by a `try/catch` block?
- Should the `try/catch` block be in your function or in the calling code?
- Where should the error be handled?

Many questions arise when dealing with errors.

I used to struggle with these problems in my code involving:
- Validations 
- Fetching data 
- Querying databases 

I always ended up with many `try/catch` blocks in my code, unsure how to manage the error in the calling code. When I decided to address every error I encountered, I often overlooked some or told myself, "Then I will handle that case," and of course, I didn't. Then these errors would pop up at runtime and I felt insecure about when my code was free of bugs or not.

## How other languages handle errors?
For the past year, I've been very interested in [Rust](https://www.rust-lang.org/) and I've learned a little bit about it, I found that is a interesting language with a very different way (at least for me) to deal with issues like safety, performance and memory management.

I discovered that [Rust](https://www.rust-lang.org/) has a fascinating approach to handling errors. There's an Enum called `Result` that contains a `Ok` or `Error` value.

```rust
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

`Ok` and `Err` are also Enums, wrappers that hold a value of type `T` or `E` respectively.

The compiler enforces you to handle every error; each function that might fail must always return a `Result` value instead of throwing some error. The Result is either a `Ok(T)` or `Err(E)` and the calling code must always deal with the `Error` case.

```rust
let number = match number_str.parse::<i32>() {
    Ok(number)  => number,
    Err(e) => return Err(e),
};
```

## Converting errors to values
Since learning about [Rust](https://www.rust-lang.org/) I decided to try to do the same in my Typescript codebases. I created a `Result` class that can be used to wrap a `Ok` or `Error` value, improving the code safety and robustness.

In this article from [Khalil Stemmler](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/) he show us a way to implement this `Result` class in our typescript code. 

With the result class Errors are values now and they are returned from the function instead of being thrown to be caught by some try/catch block.

As I continued learning Rust, I found that it has tools to deal with errors more effectively. The `?` operator can be used to early-return from a function with a compatible return type with the value where `?` operator is used. This operator greatly enhances code readability, allowing you to focus more on the logic of the code rather than on error handling.
```rust
fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    let first_number = first_number_str.parse::<i32>()?;
    let second_number = second_number_str.parse::<i32>()?;

    Ok(first_number * second_number)
}
```

In this function, we used the `?` operator to return the error if the string is not a valid value to be parsed as an integer (number). This eliminates the verbosity of `match/if` statement to check if the parse is successful.

This level of conciseness isn't achievable using a wrapper class like `Result` in TypeScript, resulting in more verbose code. The caller always has to deal with the `Error` case using an `if` statement, as in [Go](https://go.dev/).

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

The caller code would look like this:

```go
func main() {
    message, err := greetings.Hello("")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(message)
}
```

## Relaying on the type system
Since there's no way to replicate the `?` operator in Typescript, using the type system to assist with error handling is preferable to using a wrapper like `Result` or `Either` (from functional programming) for error management. This approach avoids the need to add this wrapper while maintaining the same verbosity as using `if` statements to check for errors.

The typescript type system can help us to create a behavior that is similar to the `Result` wrapper by simply creating an union type `Success | Error` in our function signature.

Now it's possible for us to know if a function can fail looking at its signature.

With that in mind, let's refactor our initial code to handle every edge case and enforce that the calling code deals with the error case.

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

Refactoring the function signature to return a `Promise<User | Error>` type forces the caller code to handle the error case.

In the `if` statement we check if the response is a 200 OK, and if not, we return an error.

With the `try/catch` block, we handle the error from the `fetch` or `.json`. If is important for the caller to have more specific errors, you can create two `try/catch` blocks to handle each of them; creating sub classes of the `Error` class can help you define specific errors for the calling code.

Our caller code can look something like this:

```typescript
const userOrError = await getUser(1);

if (userOrError instanceof Error) {
  // Handle the error case by returning the error one level up 
  return userOrError;
}
// below this part of the code userOrError will always be type User
```

In this caller code when the `Promise` is resolved we got a union type `User | Error`, we can deal with the error case by using the `instanceof` operator to check if the value is an instance of `Error`.

Depending on what you want, you can deal with the error differently or you can return the error one level up.

After the `if` statement typescript will ensure that `userOrError` variable is always a `User` object.

## Use case
In the following example, I'm defining a function that maps a string in ISO format `2024-10-21` to an object with year, month and day properties called `DateValues`.

```typescript
export function mapISODateToDateValues(date: ISODate): DateValues {
  const [year, month, day] = splitByDash(date).map(Number);
  return { year, month, day };
}
```

`splitByDash` is a function that splits a string by `-` and returns an array of strings, Then I'm mapping over that array and parsing every `string` to a `number`, them I'm using destructuring to access positions 0, 1, and 2 from the returned array.

Even though the function is simple, it has a lot of edge cases and errors that can be considered.

The type alias `ISODate` is a string that could be different from what we expect; if that's the case, the positions in the array could also be incorrect,
 leaving our object in an invalid state.

After splitting, the values in the array are mapped to numbers, but these strings can be invalid to parse into numbers, which would yield `NaN`.

We expect that the string matches the format `2024-10-21` but event if it does, the values could be still incorrect—what if the month is `13` or the day is `32`? We have to ensure that the values are always valid.

So we have to ensure that our `DateValues` object always has a valid state. To do this, we need to add some validations and update our function signature to return a `DateValues | Error` type.

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
The validations implementation is outside the scope of this article, but they are simple functions that return whether the argument matches the validation criteria.

In this new version of our function we check if the values are valid four our purpose, if any validation fails, we return an `Error` object, holding a message that correspond to the error.

If all the validations pass we return a `DateValues` object. We can be sure that the returned value is always a `DateValues` object with a valid state.

The caller of this function can be something like this:

```typescript
const dateValuesResult = mapISODateToDateValues(iso);
if (dateValuesResult instanceof Error) return dateValuesResult; // Return one level up the error
// below this part of the code dateValuesResult will always be type `DateValues`
```
## Conclusion
By relaying on the type system and making this changes we can be sure that:
- Our errors are handled in every function that return a union type like `User | Error`
- Our caller code must deal with the error case
- Our code is safer, more robust, and we handle edge cases.
- We don't have hidden flows of errors.

We need to be careful with third-party and built-in functions that might throw errors. The entire security of this approach is based on catching errors at the moment they arise and ensuring that functions reflect those cases in their return type signatures.

I hope this article helps you learn a different way to handle errors in TypeScript and how to avoid hidden flows of errors.
