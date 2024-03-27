import { useEffect, useState } from "react"
import send from '../assets/send.svg'
import back from '../assets/back.svg'
import { v4 } from "uuid"

export default function LoadChat({chatId, toggleLoadChat, triggerReset}){
    const [message, setMessage] = useState('')
    const [chatMessages, setChatMessages] = useState(null)
    const [reset, setReset] = useState('')
    const [userId, setUserId] = useState(null)

    function getMessages(){
        const cacheBuster = Math.random();
        fetch(`http://localhost:3000/messages/:${chatId}?cache=${cacheBuster}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(messages =>{
                console.log(messages)
                setUserId(messages[messages.length-1])
                messages.pop()
                setChatMessages(messages)
                setTimeout(() => {
                    setReset(v4())
                    const element = document.getElementById('messageContainer')
                    element.scrollTop = element.scrollHeight;
                }, 100)
            })
            .catch(err => console.log(err))
    }

    useEffect(()=> {
        console.log('working')
        getMessages();
    },[])

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

        const cacheBuster = Math.random();

        fetch(`http://localhost:3000/messages/:${chatId}?cache=${cacheBuster}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(result => {
                setMessage('')
                setTimeout(() => getMessages(), 100)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="h-5/6 w-10/12 bg-white shadow-lg rounded-2xl p-5 flex flex-col ">
            <div className="border rounded-2xl text-black h-full w-full mb-2 relative overflow-scroll pb-5 overflow-y-auto" id="messageContainer">
                {chatMessages && chatMessages.map(message => {
                    return(
                    <div key={v4()} className={`flex p-0 ${message.sender === userId ? 'justify-end' : 'justify-start'}`}>
                        <div className={`border rounded-md text-black p-3 mr-5 ml-5 mt-5 w-fit max-w-60 shadow-md ${message.sender === userId ? 'bg-green-100' : 'bg-gray-50'}`}>{message.body}</div>
                    </div>)
                })}
            </div>
            <div className="flex h-40 items-center">
            <textarea
                className="w-full border rounded-xl pl-3 h-24 p-2 mr-3"
                placeholder="Enter Message"
                value={message}
                onChange={handleTextChange}
                rows={1} // Set initial number of rows
                />
                <div className="flex flex-col ">
                    <img src={send} alt="send" className="h-14 hover:bg-green-100 rounded-lg" onClick={sendMessage}/>
                    <img src={back} alt="back" className="h-10 hover:bg-red-100 rounded-lg" onClick={toggleLoadChat}></img>
                </div>
            </div>
        </div>
    )
}