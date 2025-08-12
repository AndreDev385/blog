---
title: Entidades
description: Aprende sobre las Entidades en DDD, cómo se diferencian de los Value Objects y cómo implementarlas correctamente en TypeScript.
date: 2025-08-12
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/entities.png
tags:
  - typescript
  - ddd
---

![Entities](https://andre385.sirv.com/Portfolio%20%26%20Blog/entities.png?w=1280)

# Entidades
En mi último post hablé sobre los [Value Objects]() y como nos ayudan a modelar nuestro dominio, evitar el code smell primitive obsession y validar que nuestros data structures siempre tengan un valor válido. En esta ocasión hablaremos sobre las `Entidades`, como se diferencian de los `Value Objects` y que aportan a nuestro código.

## Qué son las Entidades?
En DDD las entidades son introducidas de la siguiente manera "Muchos objetos no se definen fundamentalmente por sus atributos, sino mas bien por un hilo de continuidad e identidad".  Las entidades se identifican a través de un valor único que no cambiará durante todo su ciclo de vida, incluso si sus atributos cambian se da por entendido que sigue siendo la misma entidad. 

Algunos de ejemplos de entidades pueden ser

- Una **persona** identificada a través de su DNI o pasaporte
- Una **factura** identificada a través de un ID
- Un **teléfono** identificado a través de su Serial

## Entidades vs Value Objects
La siguiente tabla resume las principales diferencias entre un `VO` y una `Entidad`.


|  | Entidad | Value Object |
|--------------|--------------|------------|
| Igualdad por | Identificador | Atributos |
| Atributos  | Mutables | Inmutables |
| Ciclo de vida  | Si | No |


La comparación entre entidades se hace a través de sus **identificadores** mientras que las de los VO se hace a través de sus **atributos.**

Las entidades son **mutables** en cambio los VO son **inmutables**, diferentes valores en sus atributos representan algo totalmente diferente, mientras que dos entidades con diferentes atributos pero el mismo identificador, representan lo mismo pero con un estado diferente el cual puede ir cambiando dependiendo del valor de dichos atributos. 

Debido a que una misma entidad puede tener diferentes atributos estas cuentan con un **ciclo de vida** que representan todos los estados posibles por los que puede pasar un dicha entidad en los casos de uso de nuestro código.

## Cómo implementar una Entidad
Para implementar una entidad de manera efectiva, hay que encapsular la lógica de negocio dentro de la propia entidad, en lugar de dejarla expuesta en servicios externos. Esto se conoce como el principio de **"tell, don't ask"**. En lugar de preguntar por el estado de la entidad y luego actuar sobre él, le "pedimos" a la entidad que realice una acción. Esto garantiza que la entidad siempre mantenga un estado válido.

Un error común es exponer setters públicos para cada atributo de la entidad. Esto viola el principio de encapsulamiento y permite que el estado de la entidad se modifique de forma incontrolada. La forma correcta es a través de métodos con nombres que describan la acción que se está realizando. Por ejemplo, en lugar de un `setEstado('pagado')`, se podría tener un método llamado `marcarComoPagada()`.

### Ejemplo: Entidad Order
Imagina que estamos construyendo un sistema de comercio electrónico. Una Orden (Order) es un claro ejemplo de una entidad.

**Identidad:** Se identifica de forma única por un `orderId`.

**Ciclo de vida:** Una orden puede tener diferentes estados a lo largo de su existencia (pendiente de pago, pagada, enviada, entregada, cancelada).

**Comportamiento:** Las reglas de negocio, como la lógica para marcar una orden como pagada o cancelarla, deben residir dentro de la propia entidad.

Aquí tienes un ejemplo simplificado de cómo se vería la clase Orden en TypeScript, siguiendo las mejores prácticas de DDD.

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
      throw new Error('Una orden debe tener al menos un item');
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

  public pay(): void {
    if (this.status !== OrderStatus.PENDING_PAYMENT) {
      throw new Error(`No se puede marcar como pagada una orden con estado: ${this.status}`);
    }
    this.status = OrderStatus.PAID;
  }

  public send(): void {
    if (this.status !== OrderStatus.PAID) {
      throw new Error('Solo se pueden enviar ordenes pagadas');
    }
    this.status = OrderStatus.SHIPPED;
  }

  public envoy(): void {
    if (this.status !== OrderStatus.SHIPPED) {
      throw new Error('Solo se pueden entregar ordenes enviadas');
    }
    this.status = OrderStatus.DELIVERED;
  }

  public cancel(): void {
    if (this.status === OrderStatus.DELIVERED || this.status === OrderStatus.CANCELLED) {
      throw new Error(`No se puede cancelar una orden con estado: ${this.status}`);
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

En este ejemplo podemos observar varios puntos importantes:

### Constructor Privado y Factory Method
El constructor es privado y utilizamos un método estático `create()` para instanciar nuevas órdenes. Esto nos permite asegurar que toda orden nueva sea creada con un estado válido inicial.

### Encapsulamiento de Estado
Todos los atributos son privados y solo se pueden modificar a través de métodos específicos que representan acciones del dominio como `marcarComoPagada()`, `enviar()`, `cancelar()`, etc.

### Validación de Transiciones de Estado
Cada método que modifica el estado valida que la transición sea válida según las reglas de negocio. Por ejemplo, solo se puede enviar una orden que esté pagada.

### Identidad a través del ID
La comparación entre órdenes se hace exclusivamente a través del `OrderId`, no importa si tienen diferentes estados o atributos.

## Usando Entidades en Casos de Uso
Veamos como nuestra entidad `Order` se integra en un caso de uso real:

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
      order.pay(); // La entidad se encarga de validar la transición
      await this.orderRepository.save(order);
    } else {
      throw new PaymentFailedError(paymentResult.getErrorMessage());
    }
  }
}
```

En este caso de uso, no necesitamos verificar si la orden puede ser marcada como pagada o realizar validaciones externas. La entidad `Order` se encarga internamente de validar que la transición de estado sea válida.

## Conclusión
Las entidades son elementos clave en DDD para modelar objetos que tienen una identidad única y un ciclo de vida. A diferencia de los Value Objects, su igualdad no depende de sus atributos, sino de su identificador. Al encapsular la lógica de negocio dentro de la entidad, garantizamos la consistencia y evitamos que el estado de nuestro dominio se corrompa.

Al entender y aplicar correctamente la distinción entre Value Objects y Entidades, podemos construir un modelo de dominio mucho más robusto, expresivo y fácil de mantener.

