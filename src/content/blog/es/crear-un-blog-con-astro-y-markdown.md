---
title: Crear un blog con Astro y Markdown P1
description: Descubre cómo crear tu propio blog con Astro, un framework web para sitios de contenido rápido, y Markdown, un lenguaje de marcado con gran facilidad para escribir contenido y tomar notas.
date: 2024-09-30
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/Create%20a%20blog%20with%20astro%20and%20markdown/astro_post.webp
tags:
  - astro
  - markdown
---

![Astro](https://andre385.sirv.com/Portfolio%20%26%20Blog/Create%20a%20blog%20with%20astro%20and%20markdown/astro_post.webp)

Creé este blog para compartir contenido sobre mis experiencias personales en programación.
Para la primera publicación, me preguntaba sobre qué escribir, así que pensé: si voy a compartir mis experiencias, ¿por qué no empezar con cómo construí este blog?.

# Astro

[Astro](https://astro.build/) es un framework web para construir sitios de contenido rápidos y optimizados para SEO, como blogs, portafolios y comercios electrónicos.
Casi todos los sitios web del mundo tienen mucho contenido estático, y en este tipo de sitios es donde Astro brilla.
Así que descubramos cómo crear un blog con Astro.

## Crear un nuevo proyecto

Ejecuta el siguiente comando en tu terminal para crear un nuevo proyecto.

```bash
npm create astro@latest
```

Este comando te guiará a través de varios pasos con una CLI muy amigable donde seleccionarás entre algunas opciones:

1. Nombre del proyecto
2. Plantilla inicial
3. TypeScript o JavaScript
   1. Si eliges TypeScript, podrás seleccionar la configuración
4. Instalar dependencias
5. Crear un repositorio git

## Estructura del proyecto

Al final de estos pasos, Astro creará un nuevo proyecto con una estructura similar a esta, dependiendo de la plantilla elegida.

```text
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

Dentro de la carpeta `src` es donde trabajaremos.

## Añadir Tailwindcss

En este caso usaré [Tailwindcss](https://docs.astro.build/en/guides/integrations-guide/tailwind/) para estilizar las páginas. Lo añadiré al proyecto con:

```bash
npx astro add tailwind
```

Este comando añadirá Tailwindcss y creará el archivo `tailwind.config.cjs`.
También actualizará `astro.config.mjs` para incluir el plugin de Tailwindcss.

## Estructura del proyecto

### Páginas

La carpeta [pages](https://docs.astro.build/en/basics/astro-pages/) contiene nuestras rutas. Cada subcarpeta y archivo aquí define una ruta. Los archivos `index.astro` son el punto de entrada de cada carpeta. Por ejemplo, `src/pages/index.astro` corresponde a la ruta `/`.
En este archivo estará la página inicial del blog.

### Layouts

Los [layouts](https://docs.astro.build/en/basics/layouts/) son componentes reutilizables que proveen estructura a las páginas, como headers, barras de navegación y footers.

#### Layout por defecto

En `src/layouts/DefaultLayout.astro` definiremos el layout base.
En `src/components/Header.astro` crearemos el componente del header:

```astro
---
const navItems = [{ href: "/", text: "Inicio" }];
---

<header
  class="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
>
  <div
    class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-4 lg:px-2"
  >
    <a href="/" class="flex items-center space-x-2">
      <span class="text-2xl font-bold">Blog</span>
    </a>

    <nav class="hidden space-x-6 text-sm font-medium md:flex">
      {
        navItems.map((item) => (
          <a
            href={item.href}
            class="rounded px-2 py-1 text-lg font-bold text-gray-700 transition-colors hover:bg-gray-200 hover:text-primary"
          >
            {item.text}
          </a>
        ))
      }
    </nav>

    <button
      id="menuButton"
      class="rounded-md p-2 hover:bg-gray-100 md:hidden"
      aria-label="Alternar menú"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
</header>

<div id="mobileMenu" class="fixed inset-0 z-50 hidden bg-white md:hidden">
  <div class="flex h-full flex-col p-4">
    <div class="flex justify-end">
      <button
        id="closeMenuButton"
        class="rounded-md p-2 hover:bg-gray-100"
        aria-label="Cerrar menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    {
      navItems.map((item) => (
        <a
          href={item.href}
          class="text-gray-600 transition-colors hover:text-gray-700"
        >
          {item.text}
        </a>
      ))
    }
  </div>
</div>

<script>
  const menuButton = document.getElementById("menuButton");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  menuButton?.addEventListener("click", () => {
    mobileMenu?.classList.remove("hidden");
  });

  closeMenuButton?.addEventListener("click", () => {
    mobileMenu?.classList.add("hidden");
  });
</script>
```

Ahora usamos este header en el layout por defecto (`src/layouts/DefaultLayout.astro`):

```astro
---
import "@/styles/global.css";
import Header from "@/components/layout/header.astro";
interface Props {
  title?: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="es" class="h-full">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Descripción de Astro" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{`${title ? `${title} | André Izarra` : "André Izarra"}`}</title>
  </head>
  <body class="flex h-full flex-col">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="mt-4 bg-white shadow">
      <div class="container mx-auto px-4 py-6 text-center text-gray-600">
        © 2023 Blog de André Izarra. Todos los derechos reservados.
      </div>
    </footer>
  </body>
</html>
```

### Contenido

Con esta carpeta astro nos ayuda a crear y presentar contenido con gran facilidad para ser leído y usado
Lo lograremos con:

- aRchivos Markdown
- Archivos MDX
- CMS

En nuestro caso usaremos archivos `Markdown` en la carpeta `src/content` donde cada archivo va a ser equivalente a un post de nuestro blog.

#### Colecciones

Las [colecciones](https://docs.astro.build/en/guides/content-collections/) organizan y validan nuestro contenido. Podemos crear colecciones en nuestra carpeta `conent` y luego usarlas en nuestras páginas.

#### Post Collection

En el archivo `src/content/config.{ts,js}` crearemos nuestro primer `schema` para nuestra colección de post.

```ts
import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().max(200),
        date: z.date(),
        tags: z.array(z.string().toLowerCase()),
      }),
  }),
};
```

Estamos definiendo nuestra colección llamada `block` con propiedades que queremos que estén en cada post.

#### Agregando nuestro primer post

En el archivo `src/content/blog/first.md` agregaremos nuestro primero post

```md
---
title: Primera publicación
description: Mi primera publicación con Astro y Markdown
date: 2024-09-30
tags:
  - astro
  - markdown
---

# Título

Esta es mi primera publicación
```

Con esto echo tenemos el contenido de nuestro primer post listo para ser mostrado en nuestra ruta inicial.

## List de post

En el archivo `src/pages/index.astro` crearemos la pagina para listar nuestros posts.

```astro
---
import Layout from "@/layouts/DefaultLayout.astro";
import { getCollection } from "astro:content";

const posts = await getCollection("blog");
---

<Layout title="Blog">
  <main class="mx-auto max-w-4xl px-4 py-8">
    <h1 class="mb-8 text-4xl font-bold">Blog Posts</h1>
    <ul class="space-y-6">
      {
        posts.map((post) => (
          <li class="overflow-hidden rounded-lg bg-white shadow">
            <a
              href={`/blog/${post.slug}`}
              class="block transition duration-150 hover:bg-gray-50"
            >
              <div class="p-6">
                <h2 class="mb-2 text-2xl font-semibold">{post.data.title}</h2>
                <p class="mb-4 text-gray-600">{post.data.description}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <span>Posted on</span>
                  <span class="mx-2">•</span>
                  <span>{post.data.date.toLocaleDateString()}</span>
                </div>
              </div>
            </a>
          </li>
        ))
      }
    </ul>
  </main>
</Layout>
```

Deberíamos ver una `card` en nuestra pagina mostrando los datos en el archivo `src/content/blog/first.md`.

Pero esto no es suficiente, tenemos que agregar una pagina para este y cada uno de los post que agreguemos en el futuro.
Crearemos una pagina que funcione como una plantilla para cada post, the esta manera reutilizamos el código.

## Routing Dinámico

En un archivo de página de astro podemos especificar parámetros de ruta en el nombre del archivo para generar multiples páginas. Por ejemplo `src/pages/authors/[author].astro` generaría una pagina de biografía para cada uno de nuestros autores. `author` se convierte en un parámetro al cual podemos acceder dentro de la página y por ende a su información.

Primero agreguemos lo que necesitamos para crear esta ruta dinámica

#### Markdown styles

Crearemos una plantilla para cada post con sus estilos y estructura propios

`/src/styles/markdown.css` agreguemos algo de `ccs` para el markdown

```css
.prose {
  @apply break-words leading-normal text-gray-900;
}

.prose p {
  @apply mb-4 text-xl;
}

.prose h1 {
  @apply mb-4 mt-6 text-4xl font-bold;
}

.prose h2 {
  @apply mb-4 mt-6 text-3xl font-bold;
}

.prose h3 {
  @apply mb-4 mt-6 text-2xl font-bold;
}

.prose h4 {
  @apply mb-4 mt-6 text-xl font-bold;
}

.prose ul,
.prose ol {
  @apply mb-4 pl-8;
}

.prose ul {
  @apply list-disc;
}

.prose ol {
  @apply list-decimal;
}

.prose li {
  @apply mb-2;
}

.prose a {
  @apply text-blue-600 hover:underline;
}

.prose blockquote {
  @apply my-4 border-l-4 border-gray-300 pl-4 italic;
}

.prose code {
  @apply rounded font-mono text-sm;
}

.prose pre {
  @apply mb-4 overflow-x-auto rounded bg-gray-100 p-4;
}

.prose img {
  @apply my-4 h-auto max-w-full rounded;
}
```

#### Post Layout

`/src/layouts/PostLayout.astro` sera el `layout` para nuestros posts.

```astro
---
import "@/styles/markdown.css";
import Layout from "@/layouts/DefaultLayout.astro";

const { post } = Astro.props;
---

<Layout>
  <div class="mx-auto max-w-6xl px-6 md:px-4 lg:px-2">
    <div class="my-16 lg:flex lg:gap-8">
      <article class="mx-auto w-full lg:mx-0">
        <header class="relative mb-8">
          <h1 class="mb-2 text-4xl font-bold text-foreground lg:text-5xl">
            {post.data.title}
          </h1>
        </header>
        <div class="prose prose-lg relative max-w-none">
          <slot />
        </div>
      </article>
    </div>
  </div>
</Layout>
```

### Static (SSG)

Con la function [`getStaticPaths`](https://docs.astro.build/en/guides/routing/#static-ssg-mode) es que generamos una pagina estática para cada post dentro de `/src/content/blog` en `build time`.

#### Post

Ahora creamos el archivo `/src/pages/blog/[slug].astro`.

```astro
---
import { getCollection } from "astro:content";
import PostLayout from "@/layouts/PostLayout.astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout post={post}>
  <Content />
</PostLayout>
```

Con esto hecho si visitamos la URL `/blog/first` veremos nuestro primer post.
Si seguiste el post hasta aquí ahora tendrás un setup inicial para tu blog con:

- Una colección de post con un `schema`, podemos crear nuevos post tan solo agregando un archivo markdown con el contenido del post a la carpeta `src/content/blog`.
- Una pagina que lista cada uno de nuestros posts.
- Una pagina dinámica que muestra el contenido del post seleccionado

Este es un setup bastante básico, pero puedes agregar mas funcionalidades como:

- Imágenes para los post
- Tabla de contenido en la página del post
- Filtros para los post por `tag`
- Paginación

Si leíste hasta aquí te lo agradezco y espero que haya sido de utilidad para ti.
