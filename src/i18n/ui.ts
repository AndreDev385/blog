export const languages = {
	en: "English",
	es: "Español",
};

export const defaultLang = "es";

export type Lang = keyof typeof ui;
export const ui = {
	en: {
		// Mode toggle
		"mode.freelance": "For a Project",
		"mode.employee": "As a Developer",
		"mode.showing.all": "Showing all — pick a view above",
		"mode.showing.freelance": "Freelance view",
		"mode.showing.employee": "Employment view",
		"mode.label": "I'm looking for…",
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
		"hero.tagline.default": "I build software — whether it's your next product or my next team.",
		"hero.tagline.freelance": "Currently available for freelance projects →",
		"hero.tagline.employee": "Currently open to full-time opportunities →",
		"hero.cta.freelance": "Hire me for a project",
		"hero.cta.employee": "I'm looking for a developer",
		// About
		"about.title": "Know my history",
		"about.subtitle":
			"I'm a curious person, interested in learn how computers work and how to implement solutions that improve our lives",
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
		// Projects Section
		"projects.title": "Case Studies",
		"projects.subtitle":
			"Real products in production — deep dives into circunstances, decisions, and results",
		"projects.cta": "See the full story",
		"projects.before": "Before",
		"projects.after": "After",
		"projects.benefits": "What You Get",
		// Testimonials
		"testimonials.title": "What People Say",
		"testimonials.subtitle": "Feedback from the people I've worked with — real words from real collaborations",
		"testimonials.empty": "No testimonials yet",
		// Experience Section
		"experience.title": "Professional Experience",
		"experience.subtitle":
			"A journey through my career highlights and achievements",
		// Experience Cards
		"experience.card.achievements": "Key achievements",
		"experience.card.tool": "Technologies & Tools",
		// Bruschi Rentals
		"experiences.bruschi-rentals-landing.title": "Full Stack Developer",
		"experiences.bruschi-rentals-landing.company": "Bruschi Rentals",
		"experiences.bruschi-rentals-landing.location": "Miami, USA | Remote",
		"experiences.bruschi-rentals-landing.startDate": "May 2025",
		"experiences.bruschi-rentals-landing.endDate": "Present",
		"experiences.bruschi-rentals-landing.description": [
			"Built a Go REST API with Twilio messaging, WebSocket updates, and client lifecycle management",
			"Developed an admin dashboard with React Router v7 for client management, KPIs, and real-time notifications",
			"Created a client landing page with multi-step registration, Auth0 auth, and Turnstile security",
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
		// Services Section
		"services.title": "How I Work",
		"services.subtitle": "A proven approach to turn your business challenges into working software — from discovery to delivery.",
		"services.step1.title": "Discovery",
		"services.step1.description":
			"I start by understanding your business — your workflows, your pain points, and what's not working. No assumptions, no cookie-cutter solutions. Just a clear diagnosis of what needs to change.",
		"services.step2.title": "Solution Design",
		"services.step2.description":
			"For every problem we identify, I propose a tailored solution. Whether it's a web app, an API, or infrastructure — the technology serves your business, not the other way around.",
		"services.step3.title": "Build & Deliver",
		"services.step3.description":
			"I work in short iterations so you see progress every week. When it's ready, I deploy it, make sure everything works. You get a production-ready solution that solves your real problems.",
		"services.walkaway.label": "You'll walk away with",
		"services.step1.walkaway": [
			"A clear diagnosis of your business pain points",
			"Prioritized roadmap of what to solve first",
			"Transparent scope — no surprises",
		],
		"services.step2.walkaway": [
			"A custom solution blueprint for each problem",
			"Technology choices that make sense for your business",
			"Realistic timeline and budget you can count on",
		],
		"services.step3.walkaway": [
			"Working software that solves your real problems",
			"A reliable solution tailored to your business",
			"Post-launch support if you need it",
		],
		// FAQs Section
		"faq.title": "Frequently Asked Questions",
		"faq.subtitle": "Everything you need to know before we start",
		"faq.q1.q": "How does the process work?",
		"faq.q1.a":
			"I work in 5 phases: 1) Discovery — we understand your problem and set clear goals. 2) Proposal — scope, timeline, and transparent budget. 3) Iterative development — short sprints with constant feedback. 4) Deployment — controlled production launch. 5) Post-launch support — ongoing follow-up.",
		"faq.q2.q": "How much does a project cost?",
		"faq.q2.a":
			"Every project is unique, so I don't have fixed prices. I give you a detailed, transparent quote after understanding your needs — no hidden costs or surprises.",
		"faq.q3.q": "How long does development take?",
		"faq.q3.a":
			"It depends on scope and complexity. An MVP can take 4–6 weeks; larger projects 3–6 months. I always give realistic deadlines with weekly progress updates.",
		"faq.q4.q": "What if I don't like the result?",
		"faq.q4.a":
			"I work in short iterations (every 1–2 weeks) where we review progress together. You're always aligned, with no surprises at the end. Your feedback shapes the outcome.",
		"faq.q5.q": "Do you offer post-launch maintenance?",
		"faq.q5.a":
			"Yes. I offer maintenance plans with recurring cost that include: server administration, security updates, monitoring, backups, and ongoing technical support. Your project keeps running smoothly without you worrying about the infrastructure.",
		"faq.q6.q": "How do you ensure code quality?",
		"faq.q6.a":
			"I write automated tests, do code reviews, use continuous integration, and controlled deployments. Your project works well today and stays maintainable long-term.",
		"faq.cta": "Book a call",
		"faq.header1": "Got any questions?",
		"faq.header2": "We're here for you 👇",
	},
	es: {
		// Mode toggle
		"mode.freelance": "Por Proyecto",
		"mode.employee": "Como Desarrollador",
		"mode.showing.all": "Mostrando todo — elige una vista arriba",
		"mode.showing.freelance": "Vista freelance",
		"mode.showing.employee": "Vista empleo",
		"mode.label": "Estoy buscando…",
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
		"hero.tagline.default": "Construyo software — ya sea tu próximo producto o mi próximo equipo.",
		"hero.tagline.freelance": "Disponible para proyectos freelance →",
		"hero.tagline.employee": "Abierto a oportunidades laborales →",
		"hero.cta.freelance": "Contrátame para un proyecto",
		"hero.cta.employee": "Busco un desarrollador",
		// About
		"about.title": "Conoce mi historia",
		"about.subtitle":
			"Soy una persona curiosa, interesada en aprender cómo funcionan las computadoras y cómo implementar soluciones que mejoren nuestras vidas",
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
		// Projects Section
		"projects.title": "Casos de Estudio",
		"projects.subtitle":
			"Productos reales en producción — análisis de la situacion, decisiones y resultados",
		"projects.cta": "Ver la historia completa",
		"projects.before": "Antes",
		"projects.after": "Después",
		"projects.benefits": "Lo que Obtienes",
		// Testimonials
		"testimonials.title": "Lo Que Dicen",
		"testimonials.subtitle": "Comentarios de personas con las que he trabajado — palabras reales de colaboraciones reales",
		"testimonials.empty": "Aún no hay testimonios",
		// Experience Section
		"experience.title": "Experiencia Profesional",
		"experience.subtitle":
			"Una jornada por mis logros clave como desarrollador",
		// Experience Cards
		"experience.card.achievements": "Logros",
		"experience.card.tool": "Tecnologías & Herramientas",
		// Experience Cards
		// Bruschi Rentals
		"experiences.bruschi-rentals-landing.title": "Desarrollador Full Stack",
		"experiences.bruschi-rentals-landing.company": "Bruschi Rentals",
		"experiences.bruschi-rentals-landing.location": "Miami, USA | Remoto",
		"experiences.bruschi-rentals-landing.startDate": "Mayo 2025",
		"experiences.bruschi-rentals-landing.endDate": "Presente",
		"experiences.bruschi-rentals-landing.description": [
			"Construí una API REST en Go con mensajería Twilio, WebSockets y gestión de ciclo de vida de clientes",
			"Desarrollé un panel administrativo en React Router v7 con gestión de clientes, KPIs y notificaciones en tiempo real",
			"Creé una landing page con registro multi-paso, autenticación Auth0 y seguridad Turnstile",
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
		// Services Section
		"services.title": "Cómo Trabajo",
		"services.subtitle": "Un enfoque probado para convertir los desafíos de tu negocio en software funcionando — desde el descubrimiento hasta la entrega.",
		"services.step1.title": "Descubrimiento",
		"services.step1.description":
			"Empiezo por entender tu negocio — tus flujos de trabajo, tus puntos de dolor y lo que no está funcionando. Sin suposiciones, sin soluciones prefabricadas. Solo un diagnóstico claro de lo que hay que cambiar.",
		"services.step2.title": "Diseño de Solución",
		"services.step2.description":
			"Para cada problema que identificamos, propongo una solución a medida. Sea una app web, una API o infraestructura — la tecnología está al servicio de tu negocio, no al revés.",
		"services.step3.title": "Construcción y Entrega",
		"services.step3.description":
			"Trabajo en iteraciones cortas para que veas progreso cada semana. Cuando está listo, lo despliego, me aseguro de que funcione. Obtienes una solución lista para producción que resuelve tus problemas reales.",
		"services.walkaway.label": "Te vas con",
		"services.step1.walkaway": [
			"Un diagnóstico claro de tus puntos de dolor",
			"Una hoja de ruta priorizada de qué resolver primero",
			"Alcance transparente — sin sorpresas",
		],
		"services.step2.walkaway": [
			"Un blueprint de solución a medida para cada problema",
			"Tecnología que tiene sentido para tu negocio",
			"Timeline y presupuesto realistas",
		],
		"services.step3.walkaway": [
			"Software funcionando que resuelve tus problemas reales",
			"Una solución confiable adaptada a tu negocio",
			"Soporte post-lanzamiento si lo necesitas",
		],
		// FAQs Section
		"faq.title": "Preguntas Frecuentes",
		"faq.subtitle": "Todo lo que necesitas saber antes de empezar",
		"faq.q1.q": "¿Cómo es el proceso de trabajo?",
		"faq.q1.a":
			"Trabajo en 5 fases: 1) Descubrimiento — entendemos tu problema y definimos objetivos claros. 2) Propuesta — alcance, timeline y presupuesto transparente. 3) Desarrollo iterativo — sprints cortos con feedback constante. 4) Despliegue — puesta en producción controlada. 5) Soporte post-lanzamiento — seguimiento continuo.",
		"faq.q2.q": "¿Cuánto cuesta un proyecto?",
		"faq.q2.a":
			"Cada proyecto es único, por eso no tengo precios fijos. Te doy un presupuesto detallado y transparente después de entender tu necesidad, sin costos ocultos ni sorpresas.",
		"faq.q3.q": "¿Cuánto tiempo toma desarrollar un proyecto?",
		"faq.q3.a":
			"Depende del alcance y la complejidad. Un MVP puede tomar 4–6 semanas; proyectos más grandes pueden ser 3–6 meses. Siempre te doy deadlines realistas con actualizaciones semanales.",
		"faq.q4.q": "¿Qué pasa si no me gusta el resultado?",
		"faq.q4.a":
			"Trabajo con iteraciones cortas (cada 1–2 semanas) donde revisamos el progreso juntos. Así siempre estás alineado y no hay sorpresas al final. Tu feedback es parte del proceso.",
		"faq.q5.q": "¿Ofreces mantenimiento después del lanzamiento?",
		"faq.q5.a":
			"Sí. Tengo planes de mantenimiento con costo recurrente que incluyen: administración de servidores, actualizaciones de seguridad, monitoreo, backups y soporte técnico continuo. Así tu proyecto sigue funcionando sin que tengas que preocuparte por la infraestructura.",
		"faq.q6.q": "¿Cómo aseguras la calidad del código?",
		"faq.q6.a":
			"Escribo tests automatizados, hago code review, uso integración continua y despliegues controlados. Tu proyecto no solo funciona bien hoy, sino que es mantenible a largo plazo.",
		"faq.cta": "Agenda una llamada",
		"faq.header1": "¿Tienes preguntas?",
		"faq.header2": "Estamos aquí para ti 👇",
	},
} as const;
