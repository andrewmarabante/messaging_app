import { useEffect, useState } from "react"
import { v4 } from "uuid"
import trashCan from '../assets/trash.svg'
import plus from '../assets/plus.svg'

export default function UserList({ title, type, reset, triggerReset, addChat}) {
    const [friends, setFriends] = useState([]);
    const [suggested, setSuggested] = useState([]);

    useEffect(() => {

        fetch('http://localhost:3000/friends', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(friends => setFriends(friends))
            .catch(err => console.log(err))

        fetch('http://localhost:3000/suggested', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(suggested => setSuggested(suggested))
            .catch(err => console.log(err))


    }, [reset])

    const deleteFriend = (friendId) => {
        const data = {
            friendId : friendId
        }
        fetch('http://localhost:3000/friends', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(result => result.json())
            .then(result => triggerReset())
            .catch(err => console.log(err))
    }

    const addFriend = (friendId) => {
        const data = {
            friendId : friendId
        }
        fetch('http://localhost:3000/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(result => result.json())
            .then(result => triggerReset())
            .catch(err => console.log(err))
    }


    return (
        <div className={`bg-white rounded-lg h-3/4 text-center ${type === 'chat' ? 'w-1/2' : 'w-1/3 shadow-2xl'}`}>
            <h2 className="text-2xl pt-4 pb-4 border-b text-black shadow-sm">{title}</h2>

            {(type === 'friends' || type === 'chat') && <div className={`overflow-scroll ${type === 'chat' && 'max-h-60'}`}>{friends.map((friend)=>{
                return(
                    <div key={v4()} className=" text-black shadow-sm font-mono text-md p-2 flex justify-between">
                        <div className="">{friend.username}</div>
                        {type === 'chat' && <img src={plus} alt="plus" className="h-5 hover:bg-blue-100" onClick={()=>{addChat(friend)}}/>}
                        {type==='friends' && <img src={trashCan} alt="delete" className="h-4 fill-red-500 text-red-500 hover:bg-red-100" onClick={()=>{deleteFriend(friend._id)}}/>} 
                        {type === 'suggested' && <img src={plus} alt="plus" className="h-5 hover:bg-blue-100" onClick={()=>{addFriend(friend._id)}}/>}
                    </div>
                )
            })}</div>}

            {type === 'suggested' && <div>{suggested.map((friend)=>{
                return(
                    <div key={v4()} className=" text-black shadow-sm font-mono text-md p-2 flex justify-between">
                        <div className="">{friend.username}</div>
                        {type==='friends' && <img src={trashCan} alt="delete" className="h-4 fill-red-500 text-red-500 hover:bg-red-100" onClick={()=>{deleteFriend(friend._id)}}/>} 
                        {type === 'suggested' && <img src={plus} alt="plus" className="h-5 hover:bg-blue-100" onClick={()=>{addFriend(friend._id)}}/>}
                    </div>
                )
            })}</div>}
        </div>
    )
}