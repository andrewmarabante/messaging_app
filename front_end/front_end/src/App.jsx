import { useEffect, useState } from 'react'
import './styles.css'
import Navbar from './components/Navbar'
import UserList from './components/UserList';

function App() {
  const [user,SetUser] = useState();
  const list = [{username: 'someuser'}, {username:'someuser2'}]

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
  .then(data => console.log(data))
  .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <div className='text-3xl'>Home</div>
      <UserList title='working' list={list}></UserList>
    </div>
  )
}

export default App
