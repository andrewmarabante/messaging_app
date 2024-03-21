
export default function UserList({title, list}){
    return(
        <div>
            <h2>{title}</h2>
            <p>{list.map((user)=>{
                return(
                    <div>{user.username}</div>
                )
            })}</p>
        </div>
    )
}