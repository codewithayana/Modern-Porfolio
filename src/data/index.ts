// Barrel file: re-export all data from a single entry point

export { default as confettiData } from './confetti.json';
// export { galleryData } from './gallery';
// export { experiences } from './experiences';
export { education } from '../sections/education';
// export { services } from './services';
// export type { ServiceItem } from './services';
export { skills } from '../sections/skills';
export type { SkillItem } from '../sections/skills';
export { projects } from '../sections/projects';
export type { ProjectItem, TechStackItem } from '../sections/projects';
export { certifications } from './certifications';
export type { CertificationItem } from './certifications';
export { navLinks, socialLinks } from './links';
export type { NavLinkItem, SocialLinkItem } from './links';
export {
  whoAmICard,
  whatIDoCard,
  myGoalsCard,
  myPhilosophyCard,
} from './aboutCards';
export type { AboutCardItem } from './aboutCards';
