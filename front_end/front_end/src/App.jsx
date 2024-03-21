import { useState } from 'react'
import './styles.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <div className='text-3xl'>Home</div>
    </>
  )
}

export default App
