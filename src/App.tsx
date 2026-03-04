import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
      <h1>App Component</h1>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
