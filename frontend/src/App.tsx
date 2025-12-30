import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage.tsx'
import { OccupyPage } from "./pages/OccupyPage/OccupyPage.tsx"
import { UnoccupyPage } from './pages/UnoccupyPage/UnoccupyPage.tsx'
import { MyTablesPage } from './pages/MyTablesPage/MyTablesPage.tsx'
import './global.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-tables" element={<MyTablesPage />} />
        <Route path="/occupy/:id" element={<OccupyPage />} />
        <Route path="/occupy" element={<OccupyPage />} />
        <Route path="/unoccupy" element={<UnoccupyPage />} />
      </Routes>
    </Router>
  )
}

export default App
