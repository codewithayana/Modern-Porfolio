import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNodedotjs,
  SiFirebase,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiPrisma,
  SiShadcnui,
  SiFramer,
  SiSocketdotio,
  SiStripe,
  SiAppwrite,
  SiHandlebarsdotjs,
  SiHtml5,
  SiNestjs,
  SiCss3,
  SiExpress,
  SiRedis,
  SiDocker,
} from 'react-icons/si';

export interface TechStackItem {
  icon: IconType;
  name: string;
  color: string;
}

const techStacks: Record<string, TechStackItem> = {
  react: { icon: SiReact, name: 'React', color: '#00cfff' },
  node: { icon: SiNodedotjs, name: 'Node.js', color: '#228b22' },
  firebase: { icon: SiFirebase, name: 'Firebase', color: '#fbbf00' },
  tailwind: { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06b6d4' },
  typescript: { icon: SiTypescript, name: 'TypeScript', color: '#1f6feb' },
  next: { icon: SiNextdotjs, name: 'Next.js', color: '#' },
  mongodb: { icon: SiMongodb, name: 'MongoDB', color: '#10b981' },
  prisma: { icon: SiPrisma, name: 'Prisma', color: '#186997' },
  shadcn: { icon: SiShadcnui, name: 'ShadCN', color: '#6366f1' },
  framer: { icon: SiFramer, name: 'Framer Motion', color: '#2563eb' },
  socket: { icon: SiSocketdotio, name: 'Socket.io', color: '#' },
  stripe: { icon: SiStripe, name: 'Stripe', color: '#5b4df1' },
  appwrite: { icon: SiAppwrite, name: 'Appwrite', color: '#ff3d00' },
};

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  techStack: TechStackItem[];
}

export const projects: ProjectItem[] = [
    {
  title: 'my-portfolio-next.js',
    description:
      'This is a modern developer portfolio. Designed with a clean UI/UX, smooth animations, and dynamic content. it is fully responsive and optimized for performance.',
    image: '/assets/img/modern portfolio.png',
    link: 'https://my-portfolio-next-js-ivory-sigma.vercel.app/',
    github: 'https://github.com/codewithayana/my-portfolio-next.js',
    techStack: [
      { icon: SiNestjs, name: 'Nest.js', color: '#e34c26' },
      { icon: SiCss3, name: 'CSS', color: '#264de4' },
      techStacks.react,
      techStacks.tailwind,
      techStacks.typescript,
    ],
  },
  {
    title: 'Node-Mongoose-JWT-APIs-TS',
    description:
      'Production-grade REST API built with Node.js, TypeScript, Express, MongoDB, Redis and Docker. Includes Jest, Supertest, test Coverage and Docker Compose.',
    image: '/assets/img/Backend API.png',
    link: '',
    github: 'https://github.com/codewithayana/node_rest-api-ts',
    techStack: [
      techStacks.node,
      { icon: SiExpress, name: 'Express', color: '#000' },
      techStacks.typescript,
      techStacks.mongodb,
      { icon: SiRedis, name: 'Redis', color: '#dc382d' },
      { icon: SiDocker, name: 'Docker', color: '#2496ed' },
    ],
  },
  {
    title: 'Lumina-Skin-ecommerce',
    description:
      'Lumina Skin is a modern e-commerce platform built with Node.js, Express, Handlebars, Bootstrap, and JavaScript, featuring JWT-based authentication with separate Admin and User panels for secure access and management.',
    image: '/assets/img/Lumina skin.png',
    link: 'https://lumina-skin.onrender.com/',
    github: 'https://github.com/codewithayana/Lumina-Skin-ecommerce',
    techStack: [
      techStacks.node,
      { icon: SiExpress, name: 'Express', color: '#000' },
      techStacks.mongodb,
            { icon: SiHandlebarsdotjs, name: 'Handlebars.js', color: '#000' },
            { icon: SiHtml5, name: 'HTML5', color: '#e34c26' }
    ],
  },
];
