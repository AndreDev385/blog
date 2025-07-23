export const languages = {
	en: "English",
	es: "Español",
};

export const defaultLang = "es";

export type Lang = keyof typeof ui;
export const ui = {
	en: {
		// header
		"header.home": "Home",
		"header.blog": "Blog",
		// 404
		"404.title": "Oops! Page not found",
		"404.message": "The page you're looking for does not exist or was deleted",
		"404.action": "Go home",
		// post card
		"posted.on": "Posted on",
		// Hero
		"hero.greet": "Hi, I'm",
		"hero.role1": "Software",
		"hero.role2": "Developer",
		// About
		"about.title": "Know my history",
		"about.subtitle":
			"I'm a curious person interested in learn how computers work and how to implement solutions that improve our lives",
		"about.description":
			"I'm a passionate software developer with 4+ years of experience in creating reliable and performant software. My journey in tech has been driven by a curiosity to understand how things work and a desire to create solutions that make a difference. I'm always willing to improve and be better.\n\nWhen I'm not coding, you can find me exploring new technologies, looking for new plugins or configuration to add in my neovim setup or writing about my discoveries on my blog.\n\nLastly I've been interested en learn game development as a hobbie",
		"about.fun-facts.title": "Fun facts",
		"about.fun-facts.content": [
			"Ingesting sugar gives me a headache",
			"Mi first language was Javascript",
			"I have worked with remote teams in 3 different countries",
		],
		"about.interests.title": "Interests & Passion",
		"about.interests.content": [
			"Web development",
			"Game development",
			"Blogging",
			"Continous learning",
			"Open Source",
			"Fantasy stories",
		],
		// Experience Section
		"experience.title": "Professional Experience",
		"experience.subtitle":
			"A journey through my career highlights and achievements",
		// Experience Cards
		"experience.card.achievements": "Key achievements",
		"experience.card.tool": "Technologies & Tools",
		// Paulina's landing page
		"experiences.bruschi-rentals-landing.title": "Frontend Developer",
		"experiences.bruschi-rentals-landing.company":
			"Bruschi Rentals Landing Page",
		"experiences.bruschi-rentals-landing.location": "Miami, USA | Remote",
		"experiences.bruschi-rentals-landing.startDate": "July 2025",
		"experiences.bruschi-rentals-landing.endDate": "July 2025",
		"experiences.bruschi-rentals-landing.description": [
			"Design the landing page",
			"Implementation of the design with Astro.js",
		],
		// time tracker
		"experiences.time-tracker.title": "Full Stack Developer",
		"experiences.time-tracker.company": "Time Tracker",
		"experiences.time-tracker.location": "Caracas, Venezuela | Remote",
		"experiences.time-tracker.startDate": "March 2025",
		"experiences.time-tracker.endDate": "Present",
		"experiences.time-tracker.description": [
			"Time tracking desktop app with electron to track session and tasks time",
			"I implemented a cron job to stop inactive sessions",
			"Performance statistics for every user and task types",
		],
		// on the court
		"experiences.onthecourt.title": "Full Stack Developer",
		"experiences.onthecourt.company": "OnTheCourt",
		"experiences.onthecourt.location": "Caracas, Venezuela | Remote",
		"experiences.onthecourt.startDate": "Dicember 2024",
		"experiences.onthecourt.endDate": "March 2025",
		"experiences.onthecourt.description": [
			"I rebuild the frontend to improve the UI/UX",
			"Migrated from SPA to MPA",
			"I improved the page load time and performance by 54%",
			"Speed index reduced from ~5.4s to ~2.8s",
		],
		// gamemind
		"experiences.gamemind.title": "Full Stack Developer | Mobile Developer",
		"experiences.gamemind.company": "GameMind",
		"experiences.gamemind.location": "Caracas, Venezuela | Remote",
		"experiences.gamemind.startDate": "May 2023",
		"experiences.gamemind.endDate": "August 2024",
		"experiences.gamemind.description": [
			"I developed a mobile app",
			"I built the API",
			"I created an admin panel",
		],
		// Bioonix
		"experiences.bioonix.title": "Full Stack Developer",
		"experiences.bioonix.company": "Bioonix",
		"experiences.bioonix.location": "Margarita, Venezuela | Remote",
		"experiences.bioonix.startDate": "October 2022",
		"experiences.bioonix.endDate": "May 2023",
		"experiences.bioonix.description": [
			"I developed the fronted of a cryptocurrency platform",
			"I integrated various APIs services",
			"I participated in database design",
			"Enhanced API robustness using a better error handling",
		],
		// Eurocambios
		"experiences.eurocambios.title": "Backend Developer",
		"experiences.eurocambios.company": "Eurocambios",
		"experiences.eurocambios.location": "Madrid, Spain | Remote",
		"experiences.eurocambios.startDate": "September 2023",
		"experiences.eurocambios.endDate": "December 2023",
		"experiences.eurocambios.description": [
			"I designed domain models",
			"I designed the database's tables",
			"I implemented the API",
			"Integrated Paypal and Stripe payment services",
			"Integrated KYC service",
		],
		// nedi it
		"experiences.nediit.title": "Frontend Developer",
		"experiences.nediit.company": "Nedi IT Services",
		"experiences.nediit.location": "Santiago, Chile | Remote",
		"experiences.nediit.startDate": "April 2021",
		"experiences.nediit.endDate": "January 2022",
		"experiences.nediit.description": [
			"I developed an administrative panel",
			"Fixed bugs",
			"I refactored code to optimize global state management",
			"Improve page performance by 30% by reducing the image size allowed and converting to .webp format",
		],
	},
	es: {
		"header.home": "Inicio",
		"header.blog": "Blog",
		"404.title": "Oops! Página no encontrada",
		"404.message": "La página que buscas no existe o fue eliminada",
		"404.action": "Volver al inicio",
		// post card
		"posted.on": "Publicado el",
		// Hero
		"hero.greet": "Hola, soy",
		"hero.role1": "Desarrollador",
		"hero.role2": "de Software",
		// About
		"about.title": "Conoce mi historia",
		"about.subtitle":
			"Soy una persona curiosa interesada en aprender cómo funcionan las computadoras y cómo implementar soluciones que mejoren nuestras vidas",
		"about.description":
			"Soy un desarrollador de software apasionado con 4+ años de experiencia en la creación de software confiable y adaptado a las necesidades del cliente. Mi viaje en la tecnología ha sido impulsado por la curiosidad por comprender cómo funcionan las cosas y el deseo de crear soluciones que marquen la diferencia. Siempre estoy dispuesto a aprender y ser mejor.\n\nCuando no estoy codeando, puedes encontrarme explorando nuevas tecnologías, buscando nuevos plugins o configuraciones para añadir a neovim o escribiendo sobre mis descubrimientos en mi blog.\n\nPor último, me ha interesado aprender a desarrollar juegos como pasatiempo",
		"about.fun-facts.title": "Datos curiosos",
		"about.fun-facts.content": [
			"Ingerir azúcar me da dolor de cabeza",
			"Mi primer lenguaje fue Javascript",
			"He trabajado con equipos remotos en 3 países diferentes",
		],
		"about.interests.title": "Intereses & Pasiones",
		"about.interests.content": [
			"Desarrollo web",
			"Desarrollo de juegos",
			"Blogging",
			"Aprendizaje continuo",
			"Open Source",
			"Historias de fantasía",
		],
		// Experience Section
		"experience.title": "Experiencia Profesional",
		"experience.subtitle":
			"Una jornada por mis logros clave como desarrollador",
		// Experience Cards
		"experience.card.achievements": "Logros",
		"experience.card.tool": "Tecnologías & Herramientas",
		// Experience Cards
		// Paulina's landing page
		"experiences.bruschi-rentals-landing.title": "Desarrollador Frontend",
		"experiences.bruschi-rentals-landing.company":
			"Bruschi Rentals Landing Page",
		"experiences.bruschi-rentals-landing.location": "Miami, USA | Remoto",
		"experiences.bruschi-rentals-landing.startDate": "Julio 2025",
		"experiences.bruschi-rentals-landing.endDate": "Julio 2025",
		"experiences.bruschi-rentals-landing.description": [
			"Diseño de la página",
			"Implementación del modelo diseñado en Astro",
		],
		// time tracker
		"experiences.time-tracker.title": "Desarrollador Full Stack",
		"experiences.time-tracker.company": "Time Tracker",
		"experiences.time-tracker.location": "Caracas, Venezuela | Remoto",
		"experiences.time-tracker.startDate": "Marzo 2025",
		"experiences.time-tracker.endDate": "Presente",
		"experiences.time-tracker.description": [
			"Desarrollé una desktop app en Electron para traquear el tiempo de la sesión de trabajo y las tareas del usuario",
			"Implementé un cron job para pausar las sesiones que esten inactivas",
		],
		// on the court
		"experiences.onthecourt.title": "Desarrollador Full Stack",
		"experiences.onthecourt.company": "OnTheCourt",
		"experiences.onthecourt.location": "Caracas, Venezuela | Remoto",
		"experiences.onthecourt.startDate": "Diciembre 2024",
		"experiences.onthecourt.endDate": "Marzo 2025",
		"experiences.onthecourt.description": [
			"Reconstruí todo el fronted del proyecto para mejorar la UX/UI",
			"Cambie el sistema de la página de SPA a MPA",
			"Mejoré el tiempo de carga y rendimiento de la página un 54%",
			"Índice de velocidad reducido de ~5.4s a ~2.8s",
		],
		// gamemind
		"experiences.gamemind.title": "Desarrollador Mobile & Full Stack",
		"experiences.gamemind.company": "GameMind",
		"experiences.gamemind.location": "Caracas, Venezuela | Remoto",
		"experiences.gamemind.startDate": "Mayo 2023",
		"experiences.gamemind.endDate": "Agosto 2024",
		"experiences.gamemind.description": [
			"Desarrollé toda la App",
			"Publiqué en tiendas PlayStore y AppStore",
			"Desarrollé el servidor, base de datos y API REST",
			"Desarrollé un panel administrativo",
		],
		// Bioonix
		"experiences.bioonix.title": "Desarrollador Full Stack",
		"experiences.bioonix.company": "Bioonix",
		"experiences.bioonix.location": "Margarita, Venezuela | Remoto",
		"experiences.bioonix.startDate": "October 2022",
		"experiences.bioonix.endDate": "May 2023",
		"experiences.bioonix.description": [
			"Desarrollé el fronted de una plataforma de criptomonedas",
			"Integré de servicios de API y Copper API",
			"Participé en el diseño de la base de datos",
			"Mejoré la robustes de la API implementando un mejor manejo de errores",
		],
		// Eurocambios
		"experiences.eurocambios.title": "Desarrollador Backend",
		"experiences.eurocambios.company": "Eurocambios",
		"experiences.eurocambios.location": "Madrid, España | Remoto",
		"experiences.eurocambios.startDate": "Septiembre 2023",
		"experiences.eurocambios.endDate": "Diciembre 2023",
		"experiences.eurocambios.description": [
			"Diseñé los modelos del dominio",
			"Implementé las tablas de la base de datos en Postgres",
			"Implementé la API REST",
			"Integré pasarelas de pago con Paypal y Stripe",
			"Integré servicios KYC (Know your customer)",
		],
		// nedi it
		"experiences.nediit.title": "Desarrollador Frontend",
		"experiences.nediit.company": "Nedi IT Services",
		"experiences.nediit.location": "Santiago, Chile | Remoto",
		"experiences.nediit.startDate": "Abril 2021",
		"experiences.nediit.endDate": "Enero 2022",
		"experiences.nediit.description": [
			"Desarrollé el panel administrativo de una empresa de contaduria",
			"Arreglé bugs",
			"Refactorice código implementando un mejor manejo del estado global",
			"Mejoré el rendimiento de la página un 30% reduciendo el tamaño máximo permitido de las imágenes y transformandolas a formato .webp",
		],
	},
} as const;
