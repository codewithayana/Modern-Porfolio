import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Stabilized spring config (higher damping for less bounce)
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Smooth rotation spring
  const rotateSpring = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        rotateSpring.set(angle + 45); 
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      className="hidden md:block"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.5 : 1,
          color: isHovered ? '#ff8c00' : '#ff0080',
          rotate: isHovered ? -90 : rotateSpring, // Points UP on hover
        }}
        whileTap={{ 
          rotateX: 180, // Stand "up-down" flip
          scale: 0.8,
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        className="relative"
        style={{ perspective: '1000px' }} // Necessary for 3D flip
      >
        {/* Paper Airplane SVG (Reference Match) */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_currentColor]"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>

        {/* Trail Effect (Subtle) */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2 }}
            className="absolute inset-0 rounded-full bg-current/20 blur-md"
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
