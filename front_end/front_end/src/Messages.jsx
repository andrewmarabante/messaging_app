import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import newMessage from "./assets/newMessage.svg"
import ChatList from "./components/ChatList"
import NewChat from "./components/NewChat"

export default function Messages(){

    const [newChat,setNewChat] = useState(false)
    useEffect(() => {
        //GET fetch 
    }, [])

    function addNewChat(){
        setNewChat(true)
        console.log('newchat')
    }

    return(
    <div>
        <Navbar></Navbar>
        <div className="flex justify-center items-center h-screen">
            <div className="h-4/5 bg-blue-50 rounded-lg w-3/4 shadow-2xl relative flex justify-center items-center flex-col">

                    {!newChat && <>
                    <div className="text-center p-5 text-5xl">Messages</div>
                    <ChatList></ChatList>
                    <div onClick={addNewChat} className="absolute right-10 bottom-10 h-15 bg-white p-4 flex justify-center items-center rounded-full shadow-lg border text-black">
                        <img src={newMessage} className="h-10"></img>
                    </div>
                    </>}

                    {newChat && <NewChat></NewChat>} 
            </div>
        </div>
    </div>
    )
}