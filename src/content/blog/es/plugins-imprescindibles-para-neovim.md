---
title: Plugins imprescindibles para neovim
description: Descubre los plugins más importantes en mi configuración de neovim y como los utilizo para ser mas productivo
date: 2025-03-19
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/Plugins%20impresindibles%20neovim/neovim.webp
tags:
  - neovim
---

![Editor Neovim - imagen destacada para plugins esenciales de Neovim](https://andre385.sirv.com/Portfolio%20%26%20Blog/Plugins%20impresindibles%20neovim/neovim.webp)

# Mi experiencia

Llevo más de 3 años usando **Neovim** como mi editor principal, y aunque sigo descubriendo nuevas funcionalidades cada día, hay un conjunto de plugins que se han convertido en extensiones naturales de mi flujo de trabajo. Estos son los que considero absolutamente esenciales y que justifican por qué Neovim sigue siendo mi editor favorito frente a otras alternativas modernas.

## Telescope

![Plugin Telescope de búsqueda difusa para Neovim](https://andre385.sirv.com/Portfolio%20%26%20Blog/Plugins%20impresindibles%20neovim/telescope.png)
[Telescope](https://github.com/nvim-telescope/telescope.nvim) es un `fuzzy finder` (buscador) extensible y fácil de personalizar que puede incrementar tu productividad drásticamente.

Buscar un archivo en especifico en el árbol de archivos no es precisamente productivo y se convierte en una tarea más tediosa a medida de que nuestro code base se hace más grande.

Telescope ofrece una manera rápida de localizar lo que estas buscando mostrándote una lista de coincidencias según tus parámetros de búsqueda y mostrándote un preview instantáneo del archivo.

Puedes buscar:

- Archivos
- Contenido (usando grep internamente)
- Buffers existentes (archivos que ya has abierto)
- Diagnósticos (Errores or warnings en tu código)

Incluso puedes crear tus propios comandos personalizados para encontrar lo que desees.

Un simple `shortcut` abrirá el buscador que puede acercarte a lo que buscas en menos de 1 segundo.

## Yazi

![Plugin Yazi de administrador de archivos para Neovim](https://andre385.sirv.com/Portfolio%20%26%20Blog/Plugins%20impresindibles%20neovim/Yazi.png)
Algunas veces no hay mas remedio que navegar a través de nuestro file tree, cuando estos momentos llegan [Yazi](https://yazi-rs.github.io/), mi herramienta preferida para estos casos.

[Yazi](https://yazi-rs.github.io/) es un manejador de archivos de terminal escrito en `Rust`, para utilizarlo en `Neovim` tienes que agregar su [plugin](https://github.com/mikavilpas/yazi.nvim).

Mientras navegas por el file tree Yazi te muestra a la izquierda los archivos y carpetas un nivel superior de la que estas. En el centro todos los archivos y carpetas del nivel actual y si te posas sobre uno de estos te mostrará un nivel inferior en caso de que sea una carpeta o un preview del contenido en caso de que sea un archivo.

Yazi cuenta con comandos de teclado para copiar, eliminar, cortar, pegar archivos y carpetas en tu file tree.

Puedes realizar integraciones con otros plugins como `Telescope` del que hablamos anteriormente.

## Fugitive & Gitsigns

![Plugin Fugitive de Git para Neovim](https://andre385.sirv.com/Portfolio%20%26%20Blog/Plugins%20impresindibles%20neovim/fugitive.png)
Estos dos plugins son totalmente esenciales en mi setup [Fugitive](https://github.com/tpope/vim-fugitive) es básicamente utilizar git dentro neovim, tienes acceso a todos los commandos que utilizarías en git y puedes acceder a ellos a través de comandos de teclado que puedes personalizar.

Puedes ver el status de tu proyecto abriendo una ventana que te mostrará los cambios realizados desde el ultimo commit de manera interactiva donde puedes ejecutar cualquier comando de git que desees.

Resolver conflictos puedes ser una tarea difícil, con fugitive puedes resolverlos de manera interactiva viendo en 3 ventanas el commit actual, los conflictos, el commit a integrar y decidir con cual de las dos opciones te quedarás solo usando un `shortcut`.

![Plugin Gitsigns mostrando signos de Git en Neovim](https://andre385.sirv.com/Portfolio%20%26%20Blog/Plugins%20impresindibles%20neovim/gitsigns.png)

Por otro lado [Gitsigns](https://github.com/lewis6991/gitsigns.nvim) te mostrará dentro de tu archivo mediante los signos comunes, las líneas de código que has agregado, eliminado, actualizado. Puedes navegar entre hunks y ver preview de la comparación entre el estado actual y el anterior, así como hacer stage de esa porción de código o reset para devolverlo al estado del anterior commit.

## Harpoon

![Plugin Harpoon de navegación de archivos para Neovim](https://andre385.sirv.com/Portfolio%20%26%20Blog/Plugins%20impresindibles%20neovim/harpoon.png)
El creador de este plugin [ThePrimeagen](https://www.youtube.com/c/theprimeagen) es básicamente una de las personas que mas ha influido en mi decisión de usar `Neovim` como mi editor. Aún recuerdo la primera vez que vi uno de sus vídeos, escribía código demasiado rápido, navegaba de un archivo a otro y luego de vuelta en un pestañeo. Al ver lo productivo que era decidí que quería tener un setup que me permitiera hacer eso.

Normalmente cuando estamos implementando una solución pasamos un tiempo considerable editando un grupo selecto de archivos yendo de uno a otro y devuelta lo cual se puede volver tedioso.

[Harpoon](https://github.com/ThePrimeagen/harpoon) es un plugin que te permite 'marcar' archivos y asignarles una posición y cambiar de uno a otro solo utilizando el comando que tienes asignado para dicha posición, permitiéndote cambiar de un archivo a otro de manera instantánea

# Obsidian

![Plugin Obsidian de notas para Neovim](https://andre385.sirv.com/Portfolio%20%26%20Blog/Plugins%20impresindibles%20neovim/obsidian.png)
Tomar notas es una tarea que realizo constantemente, hay muchas cosas que recordar cuando programas, comandos que no utilizas seguido, un concepto en específico que estas tratando de aprender, incluso el nombre de ciertas herramientas.

Para mi siempre ha sido un problema acceder a estas notas con facilidad, muchas veces me encuentro buscando repetidas veces en google por esta información ya que no puedo recordarla adecuadamente o no tengo las notas a la mano, bueno, al menos era lo que solía hacer hasta que descubrí [Obsidian](https://obsidian.md/) una app para llevar notas personales.

Obsidian no difiere mucho de otras opciones populares del mercado, pero cuenta con un [plugin](https://github.com/epwalsh/obsidian.nvim) que permite usarla dentro de `Neovim`.

Obsidian soporta Markdown, un formato poderoso y fácil de utilizar y con obsidian puedes:

- Crear notas
- Crear relaciones entre notas
- Escribir markdown
- Filtrar tus notas por categorías

## Conclusión: Un Editor que Crece Contigo

Estos plugins no son solo herramientas aisladas, sino piezas estratégicas que transforman Neovim en un **entorno personalizado** que se adapta a tus ritmos de trabajo. Lo que más valoro después de 3 años es cómo esta combinación me permite:

✅ **Mantener el flujo**: Transición perfecta entre código, notas y control de versiones  
✅ **Reducir distracciones**: Todo accesible desde el teclado sin perder contexto  
✅ **Escalar mi productividad**: Cada plugin resuelve un problema específico sin sobrecargar la experiencia

Neovim no es solo un editor, es un ecosistema vivo donde tú defines las reglas. ¿Lo mejor? Este setup no es estático: cada nuevo plugin o ajuste en la configuración es un paso hacia tu editor ideal.

¿Ya usas alguno de estos plugins? Si quieres explorar mi configuración completa, la tienes disponible en [Github](https://github.com/AndreDev385/nvim).

🚀 **Bonus Pro Tip**: Empieza con 2-3 plugins esenciales y ve integrando progresivamente. ¡La productividad se construye paso a paso!
