import Navbar from './components/Navbar'
import VettvangurIntro from './sections/VettvangurIntro'
import AboutMe from './sections/AboutMe'
import TechUniverse from './sections/TechUniverse'
import Projects from './sections/Projects.tsx'

const App = () => {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
       <Navbar />
       <VettvangurIntro />
       <AboutMe />
       <TechUniverse />
       <Projects />
    </main>
  )
}



export default App
