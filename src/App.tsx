import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import VettvangurIntro from './sections/VettvangurIntro'
import AboutMe from './sections/AboutMe'
import TechUniverse from './sections/TechUniverse'
import Achievements from './sections/Achievements'
import Projects from './sections/Projects.tsx'
import SmoothScroll from './components/SmoothScroll'
import { useScrollReveal } from './hooks/useScrollReveal'

const App = () => {
  useScrollReveal();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SmoothScroll>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0080] via-[#00F0FF] to-[#6a00ff] z-[1000] origin-left"
        style={{ scaleX }}
      />
      {/* Persistent Background Layer */}
      <div className="fixed inset-0 bg-[#050110] z-[-1]" />
      
      <main className="relative min-h-screen text-text-primary" style={{ perspective: '800px' }}>
         <Navbar />
         <VettvangurIntro />
         <div className="reveal"><AboutMe /></div>
         <div className="reveal"><TechUniverse /></div>
         <div className="reveal"><Projects /></div>
         <div className="reveal"><Achievements /></div>
      </main>
    </SmoothScroll>
  )
}



export default App
