import { useEffect, useState } from "react"
import { v4 } from "uuid"
import trash from '../assets/trash.svg'

export default function ChatList({enterChat}){

    const [chats,setChats] = useState([])
    const [showDelete, setShowDelete] = useState(false)
    let timer;

    function getChats() {
        fetch('http://localhost:3000/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(chats => {setChats(chats)})
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getChats()
    }, [])

    function handleMouseDown(){
        if(showDelete){
            return
        }

        timer = setTimeout(()=>{setShowDelete(true)}, 500)
    }

    function handleMouseUp(chatId){
        if(showDelete){
            return
        }else{
            clearTimeout(timer)
            enterChat(chatId)
        }
    }

    function toggleDelete(e){
         if(e.target.alt === 'delete'){
            return
         }else{
            setShowDelete(false)
         }
    }

    function handleDelete(chatId){
        
        const data = {
            chatId : chatId
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
                    setTimeout(()=>{getChats()}, 100)
                })
                .catch(err => console.log(err))
        
    }

    return(
        <div onClick={toggleDelete} className="bg-white w-4/5 rounded-lg h-3/4 text-center pt-5 shadow-lg overflow-scroll select-none border text-black">
            {chats.map((chat)=>{
                return(
                    <div className="rounded border text-black ml-10 mr-10 pt-4 pb-4 mb-5 hover:bg-blue-50 relative" onMouseDown={()=>{handleMouseDown()}} onMouseUp={()=>{handleMouseUp(chat._id)}} key={v4()}>
                        <div className="">{chat.chat_name}</div>
                        {showDelete && <img src={trash} alt="delete" onClick={()=>handleDelete(chat._id)} className="h-7 border rounded-full p-0.5 absolute -top-2 -right-2 bg-white z-10 hover:bg-red-200"></img>}
                    </div>
                )
            })}
        </div>
    )
}