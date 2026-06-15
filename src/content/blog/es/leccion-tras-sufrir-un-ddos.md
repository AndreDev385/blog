---
title: Leccion de seguridad tras sufrir un DDoS
description: "Un ataque DDoS dejó Bruschi Rentals inoperativo por días: 520$ en Twilio, 900 usuarios falsos y una tarjeta bloqueada. Así fue como lo viví, lo resolví y lo que aprendí en el proceso."
date: 2026-06-12
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/sec.jpg
tags: 
    - go
    - security
---

![Cyber Security](https://andre385.sirv.com/Portfolio%20%26%20Blog/sec.jpg)

# Lo que aprendí tras sufrir un DDoS
Hace unos meses, mientras trabajaba en [Bruschi Rentals](https://bruschirentals.com/)
el portal web recibió un ataque `DDoS` que causó unas pérdidas de ~500$ en
twilio, dejó el sitio in operativo por algunos días y nos hizo perder clientes.
Si no quieres que te pase lo que a mí, descubre conmigo qué sucedió y cómo puedes
evitarlo.

## La vulnerabilidad

El sitio web de [Bruschi Rentals](https://bruschirentals.com/) contaba con dos
casos de uso para autentificación

El registro solicita las preferencias del usuario para su mudanza, teléfono y
correo (opcional). Solo se verificaba que el numero de teléfono fuese verdadero
con un OTP a través de twilio.

Tras verificar el numero de teléfono el usuario puede hacer login a su portal
para consultar las opciones asignadas por su realtor de confianza según sus
preferencias.

Si eres conocedor de cyber-seguridad quizás ya tienes una idea de lo sucedido.

Y es que, básicamente, un ataque de este tipo funciona así: alguien automatiza
peticiones falsas a tu servidor para explotar un endpoint concreto o sobre cargar
tu servidor. En nuestro caso, cada solicitud de OTP le costaba dinero a mi
cliente. Sin un rate limit adecuado, el atacante podía lanzar cientos de
peticiones sin ningún control y el costo se disparaba solo.

Debido a que el registro solo verificaba la autenticidad del cliente a través del
OTP a su numero de teléfono el cual podía ser pedido hasta un máximo de 10 veces
según el rate limit de Auth0 servicio que use para manejar la autentificación, un
usuario malicioso podía crear una cuenta y solicitar hasta 10 OTP sin aportar
ninguna información verídica.

En su momento pensé que no era necesario agregar tantas verificaciones ya que era
un producto nuevo y no se esperaba tener un gran flujo de usuarios al mes, aun
así, esta vulnerabilidad fue explotada tras tan solo unos 2 - 3 meses en
producción para un producto con tan solo de 30 - 60 usuarios activos al mes. Fue
una gran equivocación no darle la importancia que merecía.

## El día del ataque

El 23 de abril a las 12:10 recibí un mensaje de un miembro del staff
de Bruschi Rentals:

— *\"Algo raro está pasando en el dashboard. Hay clientes con datos
falsos o sin sentido. Y parecen ser muchos.\"*

Dejé lo que estaba haciendo y entré a [Railway](https://railway.com/) a ver qué sucedía. La cantidad de errores
 era impactante: más de **20.000 logs** de error acumulados en cuestión de
minutos. Recuerdo que me asusté. En ese momento se me vino a la mente:
nos tienen que haber atacado. Eran demasiadas requests en muy poco tiempo
para un sitio con tan pocos usuarios.

Lo que no sabía aún es que el ataque llevaba 46 minutos en curso.

A las 11:24 el atacante empezó a crear múltiples cuentas con datos
falsos en el portal y a solicitar códigos OTP para validar números de
teléfono, explotando el rate limit de 10 solicitudes por cuenta de Auth0.

A las 11:52 —tan solo 28 minutos después— el atacante ya había creado
**~900 usuarios falsos y solicitado ~14.000 códigos de inicio de sesión.**
La tarjeta de mi cliente empezó a rechazar pagos al detectarlos como
fraude. La deuda en Twilio se acumuló, y cuando se
superó el límite, Twilio suspendió la cuenta y detuvo el servicio.
De alguna forma, eso evitó pérdidas aún mayores.

Para cuando yo abrí Railway a las 12:10, el daño ya estaba hecho.

## Las consecuencias

- **520$ en cargos de Twilio** — que además quedaron como deuda
  porque la tarjeta fue bloqueada por fraude, y hubo que gestionar
  el pago con el banco.

- **Portal inoperativo por 3 días** — tres días en los que los
  clientes de Bruschi Rentals no podían acceder a su portal de
  mudanza. No es solo downtime técnico, es gente que no puede
  consultar sus opciones de mudanza.

- **Base de datos contaminada con ~900 usuarios falsos** — registros
  basura que hubo que identificar y limpiar.

- **Un cliente descontento** — y recuperar la confianza después
  de algo así es más difícil que arreglar cualquier servidor.

## Cómo lo solucioné

Gracias a tener trazabilidad en los logs del backend pude identificar la causa
rápidamente tras enterarme. Hablé con mi cliente, le expliqué la situación y prepare
un plan para evitar que volviera a pasar.

### Disminuir costos

El cambio más importante fue retrasar la creación del usuario en Auth0.
Antes, al registrarse, se creaba automáticamente un usuario en Auth0 con
conexión SMS, lo que permitía al atacante solicitar OTPs sin ningún
filtro. Ahora, el registro solo guarda al cliente en la base de datos y
envía un correo de verificación. Solo después de que el cliente verifica
su correo —*demostrando que tiene un correo real*— se crea el usuario en
Auth0. Así, un atacante necesitaría un correo verificable para cada cuenta
falsa.

Además, los OTP de Twilio son mucho más caros que los correos, por lo
que mover la verificación por correo como primer paso redujo drásticamente
el costo potencial de un ataque.

### Rate limit

En vez de confiar únicamente en el rate limit de Auth0, implementé mi
propio rate limit usando la librería `tollbooth` (Go). El endpoint de
registro público permite solo 5 solicitudes por IP por hora, y el de
verificación de correo solo 3 por IP por hora. Combinado con un límite
adicional por número de teléfono, el atacante no puede automatizar el
registro ni sobrecargar el servidor.

### Detección de bots

Además de [Turnstile](https://www.cloudflare.com/products/turnstile/) de 
Cloudflare, agregué un campo `honeypot` oculto en el formulario de registro.
Los bots suelen llenar todos los campos que ven, así que si ese campo tiene
contenido, el backend rechaza la solicitud automáticamente. Turnstile
por su parte verifica en el servidor que el visitante sea humano antes de
procesar el registro.

### Métricas y alertas

Aunque esta implementación no la lleve a cabo es importante para la
parte de monitoreo y observabilidad de tu software, agregar un trigger
que avise por correo cada vez que ocurra algo sospechoso te permite
reaccionar antes de que el daño sea mayor. Si hubiera tenido esto
activado, me habría enterado del ataque a los pocos minutos, no casi
una hora después.

## Reflexión

Cada vez que tu producto utilice un servicio externo por el cual
debas pagar, asegúrate de no dejar expuestas vulnerabilidades
que puedan ser explotadas. Tu bolsillo lo agradecerá.

El rate limiting es extremadamente útil y necesario en cualquier
proyecto, incluso si no es tan grande. Protegerte contra este tipo
de ataques es esencial para asegurar la accesibilidad a tus usuarios
legítimos, proteger endpoints críticos y no sobrecargar tu servidor.

Pero sobre todo, aprendí que la seguridad no es algo que se añade
después. Es una decisión que tomas desde el primer deploy, incluso
cuando piensas que nadie va a atacar un producto con 30 usuarios.

Si llegaste hasta aquí, gracias por leerme. ¿Has vivido algo
similar? ¿Un ataque, un susto de seguridad, un error que te costó
plata? Me encantaría leerlo. Escríbeme
— todos aprendemos de los errores de los demás.
