import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Variables } from './pages/Variables'
import { VariableDetail } from './pages/VariableDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/variables" element={<Variables />} />
          <Route path="/variables/:variableId" element={<VariableDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
