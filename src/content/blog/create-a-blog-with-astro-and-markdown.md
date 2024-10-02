---
title: Create a blog with astro and markdown P1
description: Discover how to create yout own blog with astro, a web framework for fast content sites and mardown, a markup language with a great ease to use to write content and take notes. 
date: 2024-09-30
image: ../../assets/posts-images/astro_post.webp
tags:
    - astro
    - markdown
---

![Astro](../../assets/posts-images/astro_post.webp)

I created this blog to share content about my personal experiences in programming.
For the first post I was wondering what to write about, so I thought if I'm going to share my experiences why not to start with how I built this blog?.

# Astro
[Astro](https://asatro.build/) is a web framework for building fast and SEO friendly content sites like blogs, portfolios and e commerce.
Almost all websites in the world have a lot of static content and in this kind of websites is where astro shines.
So let's find out how to create a blog with astro.

## Create a new project

Run the following command in your terminal to create a new project.

```bash
npm create astro@latest
```

This command will guide you through some steps with a really nice CLI where you're going to select between some options:
1. Project name
2. Starter template
3. TypeScript or JavaScript
    1. If you choose Typescript you'll be able to select the configuration
4. Install dependencies
5. Create a git repository


## Project Tree
At the end of those steps astro will create a new project with a [structure](https://docs.astro.build/en/basics/layouts/) similar to this depending on the template that you chose.
```project
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
├── packagea-lock.json
└── README.md
```

Inside the `src` folder is where we are going to work.

## Adding Tailwindcss
In this case I will be using [Tailwindcss](https://docs.astro.build/en/guides/integrations-guide/tailwind/) to style the pages, so I'm going to add it to my project with the following command:

```bash
npx astro add tailwind
```

This command will add Tailwindcss to your project and create a new file `tailwind.config.cjs`.
And will update the `astro.config.mjs` file to include the Tailwindcss plugin.

## Project Structure

### Pages
The [pages](https://docs.astro.build/en/basics/astro-pages/) folder is where our routes will live. Inside this folder every sub folder and file will define our routes. Index.astro files are the entry 
point for every folder so in this case the file `src/pages/index.astro` will be the entry point for the `/` route. 
In this file will be the first page of our blog.

### Layouts
[Layouts](https://docs.astro.build/en/basics/layouts/) are Astro components used to provide a reusable structure for our pages such as a page template.
Headers, navigation bars, and footers are good examples of layouts.

#### Default Layout
In the file `src/layouts/DefaultLayout.astro` we will define the default layout for our pages.

In `src/components/Header.astro` we will define the Header [component](https://docs.astro.build/en/basics/layouts/) for the default layout.

```astro
---
const navItems = [
  { href: "/", text: "Home" },
];
---

<header
    class="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
>
    <div class="max-w-6xl mx-auto px-6 md:px-4 lg:px-2 flex h-16 items-center justify-between">
        <a href="/" class="flex items-center space-x-2">
            <span class="font-bold text-2xl">Blog</span>
        </a>

        <nav class="hidden md:flex space-x-6 text-sm font-medium">
            {navItems.map((item) => (
            <a
                href={item.href}
                class="transition-colors px-2 py-1 hover:bg-gray-200 rounded hover:text-primary font-bold text-gray-700 text-lg"
            >
                {item.text}
            </a>))}
        </nav>

        <button
            id="menuButton"
            class="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
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

<div id="mobileMenu" class="fixed inset-0 bg-white z-50 hidden md:hidden">
  <div class="flex flex-col h-full p-4">
    <div class="flex justify-end">
      <button
        id="closeMenuButton"
        class="p-2 rounded-md hover:bg-gray-100"
        aria-label="Close menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    {navItems.map((item) => (
        <a
          href={item.href}
          class="transition-colors hover:text-gray-700 text-gray-600"
        >
          {item.text}
        </a>))}
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

We are defining a header component with a navigation bar and a mobile menu for the mobile version.

The `---` notation is the frontmatter for astro files, inside this notation we can define some variables and inject them into the component's HTML template using JSX-like expression.

With the `navItems` we can keep adding buttons to the navigation bar and this buttons will redirect us to the corresponding page.

In the script tag we just add some vanilla Javascript code to make the mobile menu work correctly. 

Now we are going to use the Header component in the default layout.
`src/layouts/DefaultLayout.astro` file.
```astro
---
import '@/styles/global.css';
import Header from '@/components/layout/header.astro';
interface Props {
	title?: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en" class="h-full">
	<head>
		<meta charset="UTF-8" />
		<meta name="description" content="Astro description" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="generator" content={Astro.generator} />
		<title>{`${title ? `${title} | André Izarra` : 'André Izarra'}`}</title>
	</head>
	<body class="h-full flex flex-col">
		<Header />
		<main class="flex-grow">
			<slot />
		</main>
		<footer class="bg-white shadow mt-4">
			<div class="container mx-auto px-4 py-6 text-center text-gray-600">
				© 2023 André Izarra Blog. Todos los derechos reservados.
			</div>
		</footer>
	</body>
</html>
```

### Content
With this folder astro helps us to create and present content in a way that is easy to read and understand.
There are some ways to do this:
- Markdown files
- MDX files
- With Third Party CMS

In our case we will use markdown files so in the `src/content` folder we will store all the markdown files that we want to use in our blog as posts.

#### Collections
[Collections](https://docs.astro.build/en/guides/content-collections/) are a way to organize our content. We can create collections in our content folder and use them in our pages.

#### Post Collection
In the file `src/content/config.{ts,js}` we will define the schema for our post collection. Content collections are the best way create content is astro.
Collections help us to organize our documents, validate our frontmatter and give us auto complete with Typescript.

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

We are defining a collection called `blog` with some properties that we want to be present in every blog post.

#### Adding our first post
In the file `src/content/blog/first.md` we will create our first post.

```md
---
title: First post
description: This is my first post with astro and markdown
date: 2024-09-30
tags: 
    - astro
    - markdown
---

# Title
This is my first post
```

With this done now we have our first post content ready to be displayed in our initial route 

## Post List
In the file `src/pages/index.astro` we will create a page for list all the posts
```astro
---
import Layout from "@/layouts/DefaultLayout.astro";
import { getCollection } from "astro:content";

const posts = await getCollection("blog");
---
<Layout title="Blog">
    <main class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8">Blog Posts</h1>
        <ul class="space-y-6">
            {posts.map((post) => (
            <li class="bg-white shadow rounded-lg overflow-hidden">
                <a href={`/blog/${post.slug}`} class="block hover:bg-gray-50 transition duration-150">
                    <div class="p-6">
                        <h2 class="text-2xl font-semibold mb-2">{post.data.title}</h2>
                        <p class="text-gray-600 mb-4">{post.data.description}</p>
                        <div class="flex items-center text-sm text-gray-500">
                            <span>Posted on</span>
                            <span class="mx-2">•</span>
                            <span>{post.data.date.toLocaleDateString()}</span>
                        </div>
                    </div>
                </a>
            </li>
            ))}
        </ul>
    </main>
</Layout>
```

We should be able to see a card in our page displaying the data inside de file `src/content/blog/first.md`.

But this in not enough, we need to create a page for this post and for every post in the future.
We're going to create a page that works as a template for every post, in this way, we can reuse the same code for every post.

## Dynamic Routing
An Astro page file can specify dynamic route parameters in its file name to generate multiple, matching pages. For example, `src/pages/authors/[author].astro` generates a bio page for every author on your blog. Author becomes a parameter that you can access from inside the page.

First let's create what we need to create this dynamic route.

#### Markdown styles
We are going to create a layout for every post with its own styles and structure.

`/src/styles/markdown.css` will contain the styles for the markdown content.
```css
.prose {
  @apply text-gray-900 leading-normal break-words;
}

.prose p {
  @apply mb-4 text-xl;
}

.prose h1 {
  @apply text-4xl font-bold mb-4 mt-6;
}

.prose h2 {
  @apply text-3xl font-bold mb-4 mt-6;
}

.prose h3 {
  @apply text-2xl font-bold mb-4 mt-6;
}

.prose h4 {
  @apply text-xl font-bold mb-4 mt-6;
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
  @apply border-l-4 border-gray-300 pl-4 italic my-4;
}

.prose code {
  @apply rounded font-mono text-sm;
}

.prose pre {
  @apply bg-gray-100 rounded p-4 mb-4 overflow-x-auto;
}

.prose img {
  @apply max-w-full h-auto my-4 rounded;
}
```

#### Post Layout
`/src/layouts/PostLayout.astro` will contain the layout for every post.

```astro
---
import "@/styles/markdown.css";
import Layout from "@/layouts/DefaultLayout.astro";

const { post } = Astro.props;
---

<Layout>
	<div class="max-w-6xl mx-auto px-6 md:px-4 lg:px-2">
		<div class="lg:flex lg:gap-8 my-16">
			<article class="w-full mx-auto lg:mx-0">
				<header class="mb-8 relative">
					<h1
						class="text-4xl font-bold text-foreground mb-2 lg:text-5xl"
					>
						{post.data.title}
					</h1>
				</header>
				<div class="prose prose-lg max-w-none relative">
					<slot />
				</div>
			</article>
		</div>
	</div>
</Layout>
```
### Static (SSG)
With [`getStaticPaths`](https://docs.astro.build/en/guides/routing/#static-ssg-mode) we can create a page for every post inside our `/src/content/blog` folder at build time.

#### Post Page
We need to create a file with a special name `/src/pages/blog/[slug].astro` and inside this file we will create the page for every post.
```astro
---
import { getCollection } from 'astro:content';
import PostLayout from '@/layouts/PostLayout.astro';

export async function getStaticPaths() {
	const posts = await getCollection('blog');

	return posts.map((post) => ({
		params: { slug: post.slug },
		props: { post } ,
	}));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout post={post}>
	<Content />
</PostLayout>
```

With this done we can now go to the url `/blog/first` and see our first post.

Now we have the initial setup for our blog, so what we build?
- A blog collection to store our posts with a schema, we can create a new post just by adding a markdown file to the `src/content/blog` folder
- A page to list all the posts in this page, this page will read all the files inside the `src/content/blog` folder and display them in a list
- A page to display a single post content, this page will read the file and display it's content following the template defined in the `PostLayout` component

This is a very basic setup, but we can add more features to our blog like:
- Images for our posts
- Table of content in the post page
- Filter our post by tags in the post list page
- Pagination in the list post page

I hope this post was useful for you, if you have any question or suggestion please let me know.
If you read until here thank you for reading my blog, I hope you enjoy it.
