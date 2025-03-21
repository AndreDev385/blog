export const languages = {
	en: 'English',
	es: 'Español'
};

export const defaultLang = 'es';

export type Lang = keyof typeof ui;
export const ui = {
	en: {
		// header
		'header.home': 'Home',
		'header.blog': 'Blog',
		// 404
		'404.title': 'Oops! Page not found',
		'404.message': "The page you're looking for does not exist or was deleted",
		'404.action': 'Go home',
		// post card
		'posted.on': 'Posted on',
		// on the court
		'experiences.onthecourt.title': "Full Stack Developer",
		'experiences.onthecourt.company': "OnTheCourt",
		'experiences.onthecourt.location': "Caracas, Venezuela | Remote",
		'experiences.onthecourt.startDate': "Dicember 2024",
		'experiences.onthecourt.endDate': "March 2025",
		'experiences.onthecourt.description': [
			"I rebuild the frontend to improve the UI/UX",
			"Migrated from SPA to MPA",
			"I improved the page load time and performance by 54%",
			"Speed index reduced from ~5.4s to ~2.8s"
		],
		// gamemind
		'experiences.gamemind.title': "Full Stack Developer | Mobile Developer",
		'experiences.gamemind.company': "GameMind",
		'experiences.gamemind.location': "Caracas, Venezuela | Remote",
		'experiences.gamemind.startDate': "May 2023",
		'experiences.gamemind.endDate': "August 2024",
		'experiences.gamemind.description': [
			"I developed a mobile app",
			"I built the API",
			"I created an admin panel",
		],
		// Bioonix
		'experiences.bioonix.title': "Full Stack Developer",
		'experiences.bioonix.company': "Bioonix",
		'experiences.bioonix.location': "Margarita, Venezuela | Remote",
		'experiences.bioonix.startDate': "October 2022",
		'experiences.bioonix.endDate': "May 2023",
		'experiences.bioonix.description': [
			"I developed the fronted of a cryptocurrency platform",
			"I integrated various APIs services",
			"I participated in database design",
			"Enhanced API robustness using a better error handling",
		],
		// Eurocambios
		'experiences.eurocambios.title': "Backend Developer",
		'experiences.eurocambios.company': "Eurocambios",
		'experiences.eurocambios.location': "Madrid, Spain | Remote",
		'experiences.eurocambios.startDate': "September 2023",
		'experiences.eurocambios.endDate': "December 2023",
		'experiences.eurocambios.description': [
			"I designed domain models",
			"I designed the database's tables",
			"I implemented the API",
			"Integrated Paypal and Stripe payment services",
			"Integrated KYC service",
		],
		// nedi it
		'experiences.nediit.title': "Frontend Developer",
		'experiences.nediit.company': "Nedi IT Services",
		'experiences.nediit.location': "Santiago, Chile | Remote",
		'experiences.nediit.startDate': "April 2021",
		'experiences.nediit.endDate': "January 2022",
		'experiences.nediit.description': [
			"I developed an administrative panel",
			"Fixed bugs",
			"I refactored code to optimize global state management",
			"Improve page performance by 30% by reducing the image size allowed and converting to .webp format",
		],
	},
	es: {
		'header.home': 'Inicio',
		'header.blog': 'Blog',
		'404.title': 'Oops! Página no encontrada',
		'404.message': 'La página que buscas no existe o fue eliminada',
		'404.action': 'Volver al inicio',
		// post card
		'posted.on': 'Publicado el',
		// on the court
		'experiences.onthecourt.title': 'Desarrollador Full Stack',
		'experiences.onthecourt.company': 'OnTheCourt',
		'experiences.onthecourt.location': "Caracas, Venezuela | Remoto",
		'experiences.onthecourt.startDate': "Diciembre 2024",
		'experiences.onthecourt.endDate': "Marzo 2025",
		'experiences.onthecourt.description': [
			"Reconstruí todo el fronted del proyecto para mejorar la UX/UI",
			"Cambie el sistema de la página de SPA a MPA",
			"Mejoré el tiempo de carga y rendimiento de la página un 54%",
			"Índice de velocidad reducido de ~5.4s a ~2.8s"
		],
		// gamemind
		'experiences.gamemind.title': "Desarrollador Mobile & Full Stack",
		'experiences.gamemind.company': "GameMind",
		'experiences.gamemind.location': "Caracas, Venezuela | Remoto",
		'experiences.gamemind.startDate': "Mayo 2023",
		'experiences.gamemind.endDate': "Agosto 2024",
		'experiences.gamemind.description': [
			"Desarrollé toda la App",
			"Publiqué en tiendas PlayStore y AppStore",
			"Desarrollé el servidor, base de datos y API REST",
			"Desarrollé un panel administrativo",
		],
		// Bioonix
		'experiences.bioonix.title': "Desarrollador Full Stack",
		'experiences.bioonix.company': "Bioonix",
		'experiences.bioonix.location': "Margarita, Venezuela | Remoto",
		'experiences.bioonix.startDate': "October 2022",
		'experiences.bioonix.endDate': "May 2023",
		'experiences.bioonix.description': [
			"Desarrollé el fronted de una plataforma de criptomonedas",
			"Integré de servicios de API y Copper API",
			"Participé en el diseño de la base de datos",
			"Mejoré la robustes de la API implementando un mejor manejo de errores",
		],
		// Eurocambios
		'experiences.eurocambios.title': "Desarrollador Backend",
		'experiences.eurocambios.company': "Eurocambios",
		'experiences.eurocambios.location': "Madrid, España | Remoto",
		'experiences.eurocambios.startDate': "Septiembre 2023",
		'experiences.eurocambios.endDate': "Diciembre 2023",
		'experiences.eurocambios.description': [
			"Diseñé los modelos del dominio",
			"Implementé las tablas de la base de datos en Postgres",
			"Implementé la API REST",
			"Integré pasarelas de pago con Paypal y Stripe",
			"Integré servicios KYC (Know your customer)",
		],
		// nedi it
		'experiences.nediit.title': "Desarrollador Frontend",
		'experiences.nediit.company': "Nedi IT Services",
		'experiences.nediit.location': "Santiago, Chile | Remoto",
		'experiences.nediit.startDate': "Abril 2021",
		'experiences.nediit.endDate': "Enero 2022",
		'experiences.nediit.description': [
			"Desarrollé el panel administrativo de una empresa de contaduria",
			"Arreglé bugs",
			"Refactorice código implementando un mejor manejo del estado global",
			"Mejoré el rendimiento de la página un 30% reduciendo el tamaño máximo permitido de las imágenes y transformandolas a formato .webp",
		],
	},
} as const;

