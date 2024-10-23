import BioonixIcon from "@/assets/bioonix_logo.png";
import NediITIcon from "@/assets/nedi_icon.png";
import GameMindIcon from "@/assets/gamemind_icon.png";

import { skillIconMap, type Skill } from "@/lib/skillIconMap";

export type ExperienceCardProps = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: readonly Skill[];
  logo?: ImageMetadata;
};

export const experiences: ExperienceCardProps[] = [
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
      "I Created an admin panel",
    ],
    skills: [
      skillIconMap.flutter,
      skillIconMap.typescript,
      skillIconMap.nodejs,
      skillIconMap.react,
      skillIconMap.tailwindcss,
      skillIconMap.git,
      skillIconMap.postgresql,
    ],
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
      "Enhanced API robustness using a better error handling",
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
      skillIconMap.git,
    ],
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
      "Integrated KYC service",
    ],
    skills: [
      skillIconMap.nodejs,
      skillIconMap.typescript,
      skillIconMap.postgresql,
      skillIconMap.git,
    ],
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
      "Improve page performance by 30% by reducing the image size allowed and converting to .webp format",
    ],
    skills: [
      skillIconMap.react,
      skillIconMap.javascript,
      skillIconMap.git,
      skillIconMap.postgresql,
      skillIconMap.css,
    ],
  },
];
