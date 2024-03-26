import { v4 } from "uuid";
import UserList from "./UserList"
import { useState } from "react";
import trashCan from '../assets/trash.svg'
import back from '../assets/back.svg'
import send from '../assets/send.svg'


export default function NewChat({toggleNewMessage, createChat}){
    const [chatNames, setChatNames] = useState([])
    const [chatIds, setChatIds] = useState([]);
    const [groupName, setGroupName] = useState('Group Name')
    const [reset, setReset] = useState(null);

    function addChat(friend){
        if(!chatIds.includes(friend._id)){
            const newChatIds = chatIds;
            const newChatNames = chatNames;
            newChatIds.push(friend._id)
            newChatNames.push(friend.username)
            setChatIds(newChatIds)
            setChatNames(newChatNames)
            setReset(v4())
        }
    }

    function deleteName(name){

        const nameIndex = chatNames.indexOf(name);
        const newChatNames = [...chatNames.slice(0,nameIndex), ...chatNames.slice(nameIndex+1)]
       
        //I messed up with structure, This works as a fix luckily since I initialized chatNames/Ids at the same time
        const newChatIds = [...chatIds.slice(0,nameIndex), ...chatIds.slice(nameIndex+1)]

        setChatNames(newChatNames)
        setChatIds(newChatIds)
        setReset(v4())
    }

    function handleGroupNameChange(e){
        setGroupName(e.target.value)
    }

    return(
        <div className="w-3/4 bg-white h-4/5 rounded-xl shadow-lg relative">
            <div className="text-4xl text-center p-5 border-b-2 relative">
                <div>New Chat:</div>
                <div className="absolute left-4 top-4">
                    <img src={back} alt="back" className="h-10 hover:bg-red-100 rounded-lg" onClick={toggleNewMessage}></img>
                </div>
                <div className="absolute right-4 top-4">
                    <img src={send} alt="create" className="h-10 rounded-lg hover:bg-green-100" onClick={()=>createChat(chatIds, groupName)}/>
                </div>
            </div>
            <div className="flex gap-5">
                <UserList type='chat' title='Friends: ' addChat={addChat}></UserList>
                <div className="flex-1" >
                    <div className="text-2xl pt-4 pb-4 border-b text-black text-center">Chat Members: </div>
                    <div className="flex justify-center flex-col items-center pt-2 max-h-60 overflow-scroll">
                        {chatNames.map((name)=>{
                            return(
                                <div key={v4()} className="flex justify-between items-center w-full pl-3 pr-3">
                                    <div key={v4()}>{name}</div>
                                    <img src={trashCan} alt="delete" className="h-4 fill-red-500 text-red-500 hover:bg-red-100" onClick={()=>deleteName(name)}></img>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {chatNames.length > 1 && <div className="absolute bottom-5 text-center w-full">
                <input type="text" value={groupName} onChange={handleGroupNameChange} className="text-center border rounded-md p-2"/>
            </div>}
        </div>
    )
}