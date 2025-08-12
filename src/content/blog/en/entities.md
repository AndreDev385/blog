---
title: Entities
description: Learn about Entities in DDD, how they differ from Value Objects and how to implement them correctly in TypeScript.
date: 2025-08-12
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/entities.png
tags:
  - typescript
  - ddd
---

![Entities](https://andre385.sirv.com/Portfolio%20%26%20Blog/entities.png?w=1280)

# Entities
In my last post, I talked about [Value Objects]() and how they help us model our domain, avoid the primitive obsession code smell, and validate that our data structures always have a valid value. This time we'll discuss `Entities`, how they differ from `Value Objects`, and what they bring to our code.

## What are Entities?
In DDD, entities are introduced as follows: "Many objects are not fundamentally defined by their attributes, but rather by a thread of continuity and identity". Entities are identified through a unique value that will not change throughout their entire lifecycle, even if their attributes change, it is understood that it remains the same entity.

Some examples of entities can be:

- A **person** identified through their ID or passport
- An **invoice** identified through an ID
- A **phone** identified through its Serial number

## Entities vs Value Objects
The following table summarizes the main differences between a `VO` and an `Entity`.

|  | Entity | Value Object |
|--------------|--------------|------------|
| Equality by | Identifier | Attributes |
| Attributes  | Mutable | Immutable |
| Lifecycle  | Yes | No |

Comparison between entities is done through their **identifiers** while VOs are compared through their **attributes**.

Entities are **mutable** while VOs are **immutable**. Different values in their attributes represent something totally different, while two entities with different attributes but the same identifier represent the same thing but with a different state that can change depending on the value of those attributes.

Because the same entity can have different attributes, they have a **lifecycle** that represents all possible states that such entity can go through in the use cases of our code.

## How to implement an Entity
To implement an entity effectively, you must encapsulate the business logic within the entity itself, rather than leaving it exposed in external services. This is known as the **"tell, don't ask"** principle. Instead of asking for the entity's state and then acting on it, we "ask" the entity to perform an action. This ensures that the entity always maintains a valid state.

A common mistake is exposing public setters for each attribute of the entity. This violates the encapsulation principle and allows the entity's state to be modified in an uncontrolled way. The correct way is through methods with names that describe the action being performed. For example, instead of a `setState('paid')`, you could have a method called `markAsPaid()`.

### Example: Order Entity
Imagine we're building an e-commerce system. An Order is a clear example of an entity.

**Identity:** It's uniquely identified by an `orderId`.

**Lifecycle:** An order can have different states throughout its existence (pending payment, paid, shipped, delivered, cancelled).

**Behavior:** Business rules, such as the logic to mark an order as paid or cancel it, must reside within the entity itself.

Here's a simplified example of how the Order class would look in TypeScript, following DDD best practices.

```ts
enum OrderStatus {
  PENDING_PAYMENT = 'pending_payment',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

class OrderId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('OrderId cannot be empty');
    }
  }

  equals(other: OrderId): boolean {
    return this.value === other.value;
  }
}

class Order {
  private constructor(
    private readonly id: OrderId,
    private status: OrderStatus,
    private readonly items: OrderItem[],
    private readonly total: Money,
    private readonly createdAt: Date
  ) {}

  public static create(id: OrderId, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('An order must have at least one item');
    }

    const total = this.calculateTotal(items);
    return new Order(id, OrderStatus.PENDING_PAYMENT, items, total, new Date());
  }

  public getId(): OrderId {
    return this.id;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getTotal(): Money {
    return this.total;
  }

  public markAsPaid(): void {
    if (this.status !== OrderStatus.PENDING_PAYMENT) {
      throw new Error(`Cannot mark as paid an order with status: ${this.status}`);
    }
    this.status = OrderStatus.PAID;
  }

  public ship(): void {
    if (this.status !== OrderStatus.PAID) {
      throw new Error('Only paid orders can be shipped');
    }
    this.status = OrderStatus.SHIPPED;
  }

  public markAsDelivered(): void {
    if (this.status !== OrderStatus.SHIPPED) {
      throw new Error('Only shipped orders can be delivered');
    }
    this.status = OrderStatus.DELIVERED;
  }

  public cancel(): void {
    if (this.status === OrderStatus.DELIVERED || this.status === OrderStatus.CANCELLED) {
      throw new Error(`Cannot cancel an order with status: ${this.status}`);
    }
    this.status = OrderStatus.CANCELLED;
  }

  public equals(other: Order): boolean {
    if (!(other instanceof Order)) {
      return false;
    }
    return this.id.equals(other.id);
  }

  private static calculateTotal(items: OrderItem[]): Money {
    const totalAmount = items.reduce((sum, item) => sum + item.getSubtotal().getAmount(), 0);
    return new Money(totalAmount, 'USD');
  }
}
```

In this example, we can observe several important points:

### Private Constructor and Factory Method
The constructor is private and we use a static `create()` method to instantiate new orders. This allows us to ensure that every new order is created with a valid initial state.

### State Encapsulation
All attributes are private and can only be modified through specific methods that represent domain actions like `markAsPaid()`, `ship()`, `cancel()`, etc.

### State Transition Validation
Each method that modifies the state validates that the transition is valid according to business rules. For example, only a paid order can be shipped.

### Identity through ID
Comparison between orders is done exclusively through the `OrderId`, regardless of whether they have different states or attributes.

## Using Entities in Use Cases
Let's see how our `Order` entity integrates into a real use case:

```ts
class ProcessPaymentUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paymentService: PaymentService
  ) {}

  async execute(orderId: OrderId, paymentMethod: PaymentMethod): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new OrderNotFoundError(orderId);
    }

    const paymentResult = await this.paymentService.processPayment(
      order.getTotal(),
      paymentMethod
    );

    if (paymentResult.isSuccessful()) {
      order.markAsPaid(); // The entity handles the transition validation
      await this.orderRepository.save(order);
    } else {
      throw new PaymentFailedError(paymentResult.getErrorMessage());
    }
  }
}
```

In this use case, we don't need to check if the order can be marked as paid or perform external validations. The `Order` entity internally handles validating that the state transition is valid.

## Conclusion
Entities are key elements in DDD for modeling objects that have a unique identity and lifecycle. Unlike Value Objects, their equality doesn't depend on their attributes, but on their identifier. By encapsulating business logic within the entity, we guarantee consistency and prevent our domain state from being corrupted.

By understanding and correctly applying the distinction between Value Objects and Entities, we can build a much more robust, expressive, and maintainable domain model.
