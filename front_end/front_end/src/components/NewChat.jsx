import { v4 } from "uuid";
import UserList from "./UserList"
import { useState } from "react";
import trashCan from '../assets/trash.svg'
import back from '../assets/back.svg'
import send from '../assets/send.svg'


export default function NewChat(){
    const [chatNames, setChatNames] = useState([])
    const [chatIds, setChatIds] = useState([]);
    const [reset, setReset] = useState(null)

    function addChat(friend){
        if(chatIds.includes(friend._id))
        {console.log('already included')
        console.log(chatNames)        
    }
        else{
            const newChatIds = chatIds;
            const newChatNames = chatNames;
            newChatIds.push(friend._id)
            newChatNames.push(friend.username)
            setChatIds(newChatIds)
            setChatNames(newChatNames)
            setReset(v4())
        }
    }

    return(
        <div className="w-3/4 bg-white h-4/5 rounded-xl">
            <div className="text-4xl text-center p-5 border-b-2 relative">
                <div>New Chat:</div>
                <div className="absolute left-4 top-4">
                    <img src={back} alt="back" className="h-10"></img>
                </div>
                <div className="absolute right-4 top-4">
                    <img src={send} alt="create" className="h-10" />
                </div>
            </div>
            <div className="flex gap-5">
                <UserList type='chat' title='Friends: ' addChat={addChat}></UserList>
                <div className="flex-1" >
                    <div className="text-2xl pt-4 pb-4 border-b text-black text-center">Chat Members: </div>
                    <div className="flex justify-center flex-col items-center pt-2 max-h-60 overflow-scroll">
                        {chatNames.map((name)=>{
                            return(
                                <div className="flex justify-around items-center w-full">
                                    <div key={v4()}>{name}</div>
                                    <img src={trashCan} alt="delete" className="h-4 fill-red-500 text-red-500"></img>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}