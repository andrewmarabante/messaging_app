import { useEffect, useState } from "react"
import send from '../assets/send.svg'
import back from '../assets/back.svg'
import { v4 } from "uuid"
import trash from '../assets/trash.svg'

export default function LoadChat({chatId, toggleLoadChat, triggerReset}){
    const [message, setMessage] = useState('')
    const [chatMessages, setChatMessages] = useState(null)
    const [reset, setReset] = useState('')
    const [userId, setUserId] = useState(null);
    const [showDelete, setShowDelete] = useState(false)
    let timer;

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
        getMessages();
    },[])

    function handleTextChange(e){
        if(e.nativeEvent.inputType === 'insertLineBreak'){
            sendMessage()
        }
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

    function handleMouseDown(){
        timer = setTimeout(()=>{setShowDelete(true)}, 500)
    }

    function handleMouseUp(){
        clearTimeout(timer)
    }

    function closeDelete(e){
        if(showDelete && e.target.alt !== 'delete'){
            setShowDelete(false)
        }
    }

    function handleDelete(messageId){
        
        const data = {
            messageId : messageId
        }

        fetch('http://localhost:3000/messages', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then(result => result.json())
            .then(result => {
                setTimeout(() => getMessages(), 100)
            })
            .catch(err => console.log(err))

    }
    return(
        <div onClick={closeDelete} className="h-5/6 w-10/12 bg-white shadow-lg rounded-2xl p-5 flex flex-col ">
            <div className="border rounded-2xl text-black h-full w-full mb-2 relative overflow-scroll pb-5 overflow-y-auto" id="messageContainer">
                {chatMessages && chatMessages.map(message => {
                    return(
                    <div key={v4()} className={`flex p-0 ${message.sender === userId ? 'justify-end' : 'justify-start'}`}>
                        <div className={`relative border rounded-md text-black p-3 mr-5 ml-5 mt-5 w-fit max-w-60 shadow-md select-none ${message.sender === userId ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-50 hover:bg-gray-100'}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>{message.body}
                       {showDelete && <img src={trash} alt="delete" className="h-5 bg-white rounded-full border p-0.5 absolute -top-2 -right-2 hover:bg-red-200" onClick={()=>handleDelete(message._id)}></img>}
                        </div>
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