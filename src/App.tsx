import Navbar from './components/Navbar'
import VettvangurIntro from './sections/VettvangurIntro'
import AboutMe from './sections/AboutMe'
import TechUniverse from './sections/TechUniverse'

const App = () => {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
       <Navbar />
       <VettvangurIntro />
       <AboutMe />
       <TechUniverse />
    </main>
  )
}

export default App
