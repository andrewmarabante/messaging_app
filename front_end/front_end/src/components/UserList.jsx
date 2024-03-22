import { v4 } from "uuid"

export default function UserList({title, list}){
    return(
        <div>
            <h2>{title}</h2>
            <div>{list.map((item)=>{
                return(
                    <div key={v4()}>{item.username}</div>
                )
            })}</div>
        </div>
    )
}