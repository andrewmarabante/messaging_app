import { useEffect } from "react"
import Navbar from "./components/Navbar"
import newMessage from "./assets/newMessage.svg"

export default function Messages(){

    useEffect(() => {
        //GET fetch 
    }, [])

    return(
    <div>
        <Navbar></Navbar>
        <div className="flex justify-center items-center h-screen">
            <div className="h-3/4 bg-blue-50 rounded-lg w-3/4 shadow-2xl relative">
                <div className="text-center p-5 text-5xl">Messages</div>
                <div className="absolute right-10 bottom-10 h-15 bg-white p-4 flex justify-center items-center rounded-full shadow-lg">
                    <img src={newMessage} className="h-10"></img>
                </div>
            </div>
        </div>
    </div>
    )
}