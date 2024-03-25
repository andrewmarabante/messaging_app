import { useEffect, useState } from "react"
import { v4 } from "uuid"

export default function ChatList(){

    const [chats,setChats] = useState([])

    useEffect(() => {
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
    }, [])

    function enterChat(){
        console.log('entering')
    }

    return(
        <div className="bg-white w-4/5 rounded-lg h-3/4 text-center pt-5 shadow-sm">
            {chats.map((chat)=>{
                return(
                    <div className="rounded border text-black ml-10 mr-10 pt-4 pb-4 overflow-scroll" onClick={enterChat} key={v4()}>
                        <div>{chat.users}</div>
                    </div>
                )
            })}
        </div>
    )
}