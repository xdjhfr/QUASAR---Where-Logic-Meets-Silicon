import { HashRouter, Routes, Route } from 'react-router-dom'
import { StarField } from './components/StarField'
import { Navbar } from './components/Navbar'
import PageTransition from './components/PageTransition'
import { Home } from './pages/Home'
import { Download } from './pages/Download'
import { Docs } from './pages/Docs'
import { About } from './pages/About'

export default function App() {
  return (
    <HashRouter>
      <StarField />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Download />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </PageTransition>
    </HashRouter>
  )
}
