import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = () => {
  useGSAP(() => {
    const sections = document.querySelectorAll('.reveal');

    sections.forEach((section) => {
      // Main section reveal
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
          rotationX: -10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 20%',
            scrub: 1.5,
          },
        }
      );

      // Staggered items reveal
      const items = section.querySelectorAll('.reveal-item');
      if (items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1.2,
            },
          }
        );
      }

      // Parallax items
      const parallaxItems = section.querySelectorAll('.parallax-item');
      parallaxItems.forEach((item, i) => {
        gsap.to(item, {
          y: -100 * (i + 1),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    });

    ScrollTrigger.refresh();
  }, []);
};
