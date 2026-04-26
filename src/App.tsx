import Navbar from './components/Navbar'
import HeroIntro from './sections/HeroIntro'
import AboutMe from './sections/AboutMe'

const App = () => {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
       <Navbar />
       <HeroIntro />
       <AboutMe />
    </main>
  )
}

export default App
