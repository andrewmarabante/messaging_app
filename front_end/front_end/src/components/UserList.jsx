import { useEffect, useState } from "react"
import { v4 } from "uuid"

export default function UserList({ title, type }) {
    const [friends, setFriends] = useState(null)

    useEffect(() => {

        { type === 'friends' && fetch('http://localhost:3000/friends', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(friends => setFriends(friends))
            .catch(err => console.log(err))}

        {type === 'suggested' && fetch('http://localhost:3000/suggested', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(result => result.json())
            .then(suggested => setFriends(suggested))
            .catch(err => console.log(err))}


    }, [])


    return (
        <div className="w-1/4 bg-white rounded-lg h-3/4 text-center shadow-2xl">
            <h2 className="text-2xl pt-4 pb-4 ">{title}</h2>
            {friends && <div>{friends.map((friend)=>{
                return(
                    <div key={v4()}>{friend.username}</div>
                )
            })}</div>}
        </div>
    )
}