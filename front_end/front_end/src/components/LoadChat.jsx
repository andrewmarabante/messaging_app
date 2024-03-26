import { useEffect, useState } from "react"
import send from '../assets/send.svg'
import back from '../assets/back.svg'

export default function LoadChat({chatId, toggleLoadChat}){
    const [message, setMessage] = useState('')


    useEffect(()=> {

        fetch(`http://localhost:3000/messages/:${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(chats => {console.log(chats)})
            .catch(err => console.log(err))
        
    }, [])
    
    function handleTextChange(e){
        setMessage(e.target.value)
    }

    function sendMessage(){

        if(message === ''){
            return
        }

        const data = {
            message : message
        }

        fetch(`http://localhost:3000/messages/:${chatId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(setMessage(''))
            .catch(err => console.log(err))
    }

    return(
        <div className="h-5/6 w-10/12 bg-white shadow-lg rounded-2xl p-5 flex flex-col">
            <div className="border rounded-2xl text-black h-full w-full mb-2 relative">
                <img src={back} alt="back" className="h-10 top-1 left-2 absolute hover:bg-red-100 rounded-lg bg-white" onClick={toggleLoadChat}></img>
            </div>
            <div className="flex h-40 items-center">
            <textarea
                className="w-full border rounded-xl pl-3 h-24 p-2"
                placeholder="Enter Message"
                value={message}
                onChange={handleTextChange}
                rows={1} // Set initial number of rows
                />
                <img src={send} alt="send" className="h-14 mr-3 ml-3 hover:bg-green-100 rounded-lg" onClick={sendMessage}/>
            </div>
        </div>
    )
}