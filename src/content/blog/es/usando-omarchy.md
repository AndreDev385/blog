---
title: Usando Omarchy
description: Comparto mi experiencia usando Omarchy y por qué creo que deberías usarlo si eres un usuario de Linux.
date: 2025-08-12
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/omarchy.png
tags:
  - omarchy
  - linux
  - hyprland
  - neovim
---

![Pantalla de Omarchy](https://andre385.sirv.com/Portfolio%20%26%20Blog/omarchy.png)

# Usando Omarchy

He usado Linux desde hace ya más de 5 años y en ese tiempo he probado diferentes distros, cada una con diferentes enfoques, pros y contras. Entre ellas recuerdo Linux Lite, Linux Mint, Ubuntu y Arch Linux.

Suelo cambiar de configuraciones, probar cosas nuevas y así ir mejorando poco a poco mi metodología de trabajo diaria. Creo que dedicar tiempo a entender y usar mejor cada una de las herramientas que usas a diario, y cuáles son sus alternativas, es importante: te ayuda a mejorar tu productividad, a sentirte cómodo con tu setup y a aprender en el camino más sobre el software que usas todos los días. Esa herramienta a la que no le prestas tanta atención te puede sorprender.

## Mi setup antes de Omarchy

En los últimos 2 años aproximadamente he usado las mismas herramientas con las que llegué a sentirme más cómodo: Arch Linux como sistema operativo, i3 como window manager, y tmux + Neovim para manejar terminales y editar texto.

## Qué es Omarchy

Hace un tiempo aprendí sobre Omarchy en un video de YouTube y me di cuenta de que, aunque la configuración tenía algunas diferencias con el setup que he ido creando en todo este tiempo —sobre todo en cuanto a hotkeys—, es un sistema que trae por defecto, desde el momento en que lo instalas, todo lo que estaba usando en mi día a día, y en muchos aspectos incluso de mejor forma.

Está basado en Arch Linux. En vez de i3 usa Hyprland, que te ofrece la misma funcionalidad y con una UI bellísima en comparación. Viene con tmux con una configuración por defecto que mejora la UI y con varios hotkeys para manejar sesiones de manera fácil y efectiva, y una configuración de Neovim con LazyVim que es bastante fácil de ponerte al día.

## Aprendizaje y adaptación

Aprender los comandos base de Omarchy puede llevar tiempo, pero aprender los más importantes es cuestión de horas. Ir aprendiéndolos a medida que los necesitas es lo que se me ha hecho más fácil. De igual manera, los comandos están creados con cierta lógica en su organización; una vez que la entiendes, es más fácil acostumbrarte a ellos.

A la configuración de tmux lo único que le faltaba era el setup de `sesh`, un sessionizer de tmux, en mi caso para acceder a las sesiones en las que trabajo seguido. De resto, la configuración es bastante estable y la UI es agradable a la vista.

En cuanto a Neovim, aunque la configuración usa LazyVim y trae muchos más paquetes que la configuración minimalista a la que estoy acostumbrado, es fácil ponerte al día: con el plugin `which-key` puedes ver un popup que te muestra los comandos disponibles categorizados, con una filosofía parecida a la que ha sido usada para Hyprland, lo cual hace fácil acostumbrarte a los shortcuts mucho más rápido de lo que esperarías.

## Herramientas incluidas

Otras herramientas como Obsidian, que es bastante útil para llevar notas de tu trabajo, actividades y recordatorios —si te gusta tomar notas como a mí, seguro encontrarás esto bastante práctico—.

La mayoría de herramientas como `npm`, `cargo`, etc. ya vienen instaladas por defecto, y en caso de que no esté la que necesitas, también tienes disponible `mise` para instalarlas rápidamente.

## Por qué me quedo con Omarchy

Desde que la instalé hace ya 1 mes estoy súper contento con esta distribución. Me parece que viene con una configuración completa de todo lo que un programador podría querer: es fácil de aprender, mantener y extender. Viene con un excelente manual y documentación integrada en el sistema operativo por secciones.

Con Omarchy siento que ya no es necesario mantener tus propios dotfiles ni hacer tu entorno reproducible: puedes aprender esta distribución, y si tienes que cambiar de computador, solo instalar la distribución te hace estar nuevamente en un entorno cómodo, con todo lo que usas a diario.

Creo que apenas he descubierto en este mes el 10% o 15% de las funcionalidades que Omarchy tiene, y estoy encantado. Voy a seguir la documentación poco a poco para descubrir en profundidad esta distro y todo lo que ofrece, así como entender cada uno de sus componentes. Creo que vale la pena tomarse el tiempo de aprender esta distro en profundidad. ¿Tú qué piensas? ¿Te gustaría probar Omarchy en algún momento?

Si llegaste hasta aquí, gracias por leer mi post.
