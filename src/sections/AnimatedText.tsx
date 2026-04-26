import { motion } from "framer-motion";

export default function AnimatedText() {
  const text = "AYANA DINESH";

  return (
    <div className="absolute left-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
      <h1 className="text-5xl md:text-8xl font-bold flex gap-1 tracking-tight">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              x: -80,
              skewX: 14,
              scaleY: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              skewX: 0,
              scaleY: 1,
            }}
            transition={{
              delay: i * 0.05,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FF2E63] bg-clip-text text-transparent inline-block"
            style={{ filter: 'drop-shadow(0 0 30px rgba(255, 46, 99, 0.3))' }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>


    </div>
  );
}
