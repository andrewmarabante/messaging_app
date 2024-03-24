import { useEffect, useState } from 'react'
import './styles.css'
import Navbar from './components/Navbar'
import UserList from './components/UserList';
import { v4 } from 'uuid';

function App() {
  const [user,SetUser] = useState(null);
  const [reset, setReset] = useState(null)

  useEffect(()=>{
    //GET fetch for our user 
    fetch('http://localhost:3000/',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include'
  })
  .then(result => result.json())
  .then(user => SetUser(user))
  .catch(err => console.log(err))
  }, [])

  function triggerReset(){
    setReset(v4())
  }

  return (
    <div>
      <Navbar></Navbar>
      {user && <div className='text-3xl pt-6 pl-5'>Welcome, <span className='font-light'>{user.username.toUpperCase()}</span></div>}
      <div className='flex justify-center items-center h-screen'>
        <div className="h-3/4 bg-blue-50 rounded-lg w-3/4 shadow-2xl relative mt-5 flex justify-around items-center">
          <UserList title='Friends:' type='friends' reset={reset} triggerReset={triggerReset}></UserList>
          <UserList title='Suggested:' type='suggested' reset={reset} triggerReset={triggerReset}></UserList>
        </div>
      </div>
    </div>
  )
}

export default App
