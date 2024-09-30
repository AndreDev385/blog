import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, a as renderComponent, g as createAstro } from '../chunks/astro/server_DsdFTbeo.mjs';
import { $ as $$Layout } from '../chunks/utils_DQuf-To1.mjs';
import { c as $$Icon, $ as $$SkillBadge, C as Card, s as skillIconMap } from '../chunks/skillIconMap_sl3tNAGT.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CY0kQrrq.mjs';
import { a as avatarPic } from '../chunks/profile_pic_BwlMZL_b.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$SocialIcons = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SocialIcons;
  const { socials } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex space-x-4 justify-center mb-8`, "class")}> ${socials.map(function displaySocialIcon(info) {
    return renderTemplate`<a${addAttribute(info.href, "href")} target="_blank" rel="noopener noreferrer" class="hover:scale-125 transition-transform duration-300"${addAttribute(info.ariaLabel, "aria-label")}> ${renderComponent($$result, "Icon", $$Icon, { "name": info.icon, "class": "w-10 h-10" })} </a>`;
  })} </div>`;
}, "/home/andre/personal/blog/src/components/SocialIcons.astro", void 0);

const $$Astro = createAstro();
const $$ExperienceCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ExperienceCard;
  const {
    title,
    company,
    location,
    startDate,
    endDate,
    description,
    skills,
    logo
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", Card, { "className": "card border border-black/10 transition-all duration-300 hover:shadow-[0px_4px_64px_0px_rgba(148,163,184,0.6)] dark:border-white/10" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center mb-4"> <div class="flex items-center space-x-3"> ${logo ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": logo, "width": logo.width, "height": logo.height, "alt": `${company} logo`, "class": "w-12 h-12 object-contain rounded-full" })}` : renderTemplate`<div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:briefcase", "class": "w-6 h-6 text-gray-500" })} </div>`} </div> <div class="text-center w-full"> <div> <h3 class="text-xl font-bold text-gray-800">${title} | ${company}</h3> </div> <p class="text-sm text-gray-500">${startDate} - ${endDate} | ${location}</p> </div> </div> <div class="mb-4"> <ul class="list-disc list-inside space-y-1"> ${description.map((item) => renderTemplate`<li class="text-gray-700">${item}</li>`)} </ul> </div> <div class="flex flex-wrap gap-2"> ${skills.map(function displaySkill(skill) {
    return renderTemplate`${renderComponent($$result2, "SkillBadge", $$SkillBadge, { "skill": skill })}`;
  })} </div> ` })}`;
}, "/home/andre/personal/blog/src/components/ExperienceCard.astro", void 0);

const BioonixIcon = new Proxy({"src":"/_astro/bioonix_logo.BcpW8j_F.png","width":150,"height":150,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/andre/personal/blog/src/assets/bioonix_logo.png";
							}
							
							return target[name];
						}
					});

const NediITIcon = new Proxy({"src":"/_astro/nedi_icon.YZC1DLt8.png","width":424,"height":424,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/andre/personal/blog/src/assets/nedi_icon.png";
							}
							
							return target[name];
						}
					});

const GameMindIcon = new Proxy({"src":"/_astro/gamemind_icon.DLcILLEq.png","width":1024,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/andre/personal/blog/src/assets/gamemind_icon.png";
							}
							
							return target[name];
						}
					});

const experiences = [
  {
    logo: GameMindIcon,
    title: "Full Stack Developer | Mobile Developer",
    company: "GameMind",
    location: "Caracas, Venezuela | Remote",
    startDate: "May 2023",
    endDate: "August 2024",
    description: [
      "I Developed a mobile app",
      "I Built an API",
      "I Created an admin panel"
    ],
    skills: [
      skillIconMap.flutter,
      skillIconMap.typescript,
      skillIconMap.nodejs,
      skillIconMap.react,
      skillIconMap.tailwindcss,
      skillIconMap.git,
      skillIconMap.postgresql
    ]
  },
  {
    logo: BioonixIcon,
    title: "Full Stack Developer",
    company: "Bioonix",
    location: "Margarita, Venezuela | Remote",
    startDate: "October 2022",
    endDate: "May 2023",
    description: [
      "I Developed the fronted of a cryptocurrency platform",
      "I integrated various APIs services",
      "I participated in database design",
      "Enhanced API robustness using a better error handling"
    ],
    skills: [
      skillIconMap.angular,
      skillIconMap.nestjs,
      skillIconMap.postgresql,
      skillIconMap.tailwindcss,
      skillIconMap.typescript,
      skillIconMap.react,
      skillIconMap.nextjs,
      skillIconMap.nodejs,
      skillIconMap.git
    ]
  },
  {
    title: "Backend Developer",
    company: "Eurocambios",
    location: "Madrid, Spain | Remote",
    startDate: "September 2023",
    endDate: "December 2023",
    description: [
      "I designed domain models",
      "I designed the database's tables",
      "I implemented the API",
      "Integrated Paypal and Stripe payment services",
      "Integrated KYC service"
    ],
    skills: [
      skillIconMap.nodejs,
      skillIconMap.typescript,
      skillIconMap.postgresql,
      skillIconMap.git
    ]
  },
  {
    logo: NediITIcon,
    title: "Frontend Developer",
    company: "Nedi IT Services",
    location: "Santiago, Chile | Remote",
    startDate: "April 2021",
    endDate: "January 2022",
    description: [
      "I Developed an administrative panel",
      "Fixed bugs",
      "I Refactored code to optimize global state management",
      "Improve page performance by 30% by reducing the image size allowed and converting to .webp format"
    ],
    skills: [
      skillIconMap.react,
      skillIconMap.javascript,
      skillIconMap.git,
      skillIconMap.postgresql,
      skillIconMap.css
    ]
  }
];

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const socials = [
    {
      icon: "devicon:linkedin",
      ariaLabel: "LinkedIn",
      href: "https://www.linkedin.com/in/andr%C3%A9-izarra/"
    },
    {
      icon: "devicon:github",
      ariaLabel: "GitHub",
      href: "https://github.com/AndreDev385"
    },
    {
      icon: "logos:google-gmail",
      ariaLabel: "Gmail",
      href: "mailto:andre.izarra@gmail.com"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="hero" class="mb-16 sm-px-4" data-astro-cid-j7pv25f6> <!-- Hero Section --> <section class="mx-auto max-w-4xl text-center flex flex-col items-center justify-center h-screen" data-astro-cid-j7pv25f6> <h2 class="text-4xl font-bold mb-4 text-gray-300" data-astro-cid-j7pv25f6>
Hi, I'm André Izarra
</h2> <h1 class="text-6xl font-bold mb-4 text-gray-100" data-astro-cid-j7pv25f6>
Full Stack Developer
</h1> <p class="text-xl text-white mb-4" data-astro-cid-j7pv25f6>
Web Developer | Tech Enthusiast | Blogger
</p> ${renderComponent($$result2, "SocialIcons", $$SocialIcons, { "socials": socials, "data-astro-cid-j7pv25f6": true })} <!-- CV button --> </section> </div> <div class="max-w-6xl mx-auto px-6 md:px-4 lg:px-2" data-astro-cid-j7pv25f6> <!-- About Me Section --> <section class="mb-16" data-astro-cid-j7pv25f6> <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold mb-4 text-center" data-astro-cid-j7pv25f6>
About Me
</h2> <p class="text-lg text-gray-700 mb-4" data-astro-cid-j7pv25f6>
I'm a passionate web developer with 3+ years of
						experience in creating robust and scalable web
						applications. My journey in tech has been driven by a
						curiosity to understand how things work and a desire to
						create solutions that make a difference.
</p> <p class="text-lg text-gray-700" data-astro-cid-j7pv25f6>
When I'm not coding, you can find me exploring new
						technologies, looking for new plugins to add in my
						neovim configuration or writing about my discoveries on
						this blog.
</p> </div> <div class="flex items-center justify-center" data-astro-cid-j7pv25f6> <img class="w-64 h-64 rounded-full"${addAttribute(avatarPic.src, "src")} alt="André Izarra Profile Picture"${addAttribute(avatarPic.width, "width")}${addAttribute(avatarPic.height, "height")} data-astro-cid-j7pv25f6> </div> </div> </section> <!-- Experience Section --> <section class="mb-16" data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold mb-6 text-center" data-astro-cid-j7pv25f6>My Experience</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" data-astro-cid-j7pv25f6> ${experiences.map((experience) => renderTemplate`${renderComponent($$result2, "ExperienceCard", $$ExperienceCard, { ...experience, "data-astro-cid-j7pv25f6": true })}`)} </div> </section> </div> ` })} `;
}, "/home/andre/personal/blog/src/pages/index.astro", void 0);

const $$file = "/home/andre/personal/blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
