import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Intro from './sections/Intro'
import AboutMe from './sections/AboutMe'
import TechUniverse from './sections/TechUniverse'
import Achievements from './sections/Achievements'
import EducationSection from './sections/EducationSection'
import Certifications from './sections/Certifications'
import Projects from './sections/Projects.tsx'
import TerminalContact from './sections/TerminalContact'
import SmoothScroll from './components/SmoothScroll'
import { useScrollReveal } from './hooks/useScrollReveal'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'

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
      <div className="fixed inset-0 bg-bg-primary transition-colors duration-300 z-[-1]" />
      
      <main className="relative min-h-screen text-text-primary" style={{ perspective: '800px' }}>
         <Navbar />
         <Intro />
         <div id="nav-about"><div className="reveal"><AboutMe /></div></div>
         <div id="nav-skills"><div className="reveal"><TechUniverse /></div></div>
         <div id="nav-projects"><div className="reveal"><Projects /></div></div>
         <div id="nav-achievements"><div className="reveal"><Achievements /></div></div>
         <div id="nav-education"><div className="reveal"><EducationSection /></div></div>
         <div id="nav-certifications"><div className="reveal"><Certifications /></div></div>
         <div id="nav-contacts"><div className="reveal"><TerminalContact /></div></div>
      </main>
      <Footer />
      <BackToTop />
    </SmoothScroll>
  )
}



export default App
