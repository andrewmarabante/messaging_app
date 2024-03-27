import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import newMessage from "./assets/newMessage.svg"
import ChatList from "./components/ChatList"
import NewChat from "./components/NewChat"
import LoadChat from "./components/LoadChat"

export default function Messages(){

    const [newChat,setNewChat] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        //GET fetch 
    }, [])

    function addNewChat(){
        setNewChat(true)
    }

    function toggleNewMessage(){
        setNewChat(false)
    }

    function createChat(chatIds, groupName){

        if(chatIds.length === 0)
        {
            return
        }
        
        if(chatIds.length === 1)
        {
            groupName = 'default'
        }
        const data = {
            chatIds : chatIds,
            groupName : groupName
        }

        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(result => result.json())
            .then(result => setNewChat(false))
            .catch(err => console.log(err))
    }

    function enterChat(chatId){
        setCurrentChat(chatId);
        setShowChat(true);
    }

    function toggleLoadChat(){
        setCurrentChat(null)
        setShowChat(false)
    }

    return(
    <div>
        <Navbar></Navbar>
        <div className="flex justify-center items-center h-screen">
            <div className="h-4/5 bg-blue-50 rounded-lg w-3/4 shadow-2xl relative flex justify-center items-center flex-col">

                    {!newChat && !showChat && <>
                    <div className="text-center p-5 text-5xl select-none">Messages</div>
                    <ChatList enterChat = {enterChat}></ChatList>
                    <div onClick={addNewChat} className="absolute right-10 bottom-10 h-15 bg-white p-4 flex justify-center items-center rounded-full shadow-lg border text-black z-20">
                        <img src={newMessage} className="h-10"></img>
                    </div>
                    </>}

                    {newChat && !showChat && <NewChat toggleNewMessage={toggleNewMessage} createChat={createChat} ></NewChat>} 

                    {showChat && <LoadChat chatId = {currentChat} toggleLoadChat = {toggleLoadChat}></LoadChat>}
            </div>
        </div>
    </div>
    )
}