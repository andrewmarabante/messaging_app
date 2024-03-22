import { useState } from "react"


export default function Login(){
    const [login, setLogin] = useState(true);
    
    const handleChange = () => {
        if(login){
            setLogin(false)
        }else(setLogin(true))
    }

    const handleSubmit = (e) => {
        //POST fetch
        e.preventDefault();

        //Will reroute in Fetch
        window.location.href = "/"
    }


    return(
    <div className="flex justify-center items-center p-32 bg-blue-100 h-screen">
        <div className="flex justify-center items-center flex-col w-96 bg-white rounded-3xl shadow-lg">
            {login && <div className="text-center text-5xl mt-6">Login:</div>}
            {!login && <div className="text-center text-5xl mt-6">Sign-Up:</div>}
            <form onSubmit={handleSubmit} className="w-80 p-10 pt-5 text-center pb-3">
                <label className="text-xl block p-3" htmlFor="username">Username:</label>
                <input className="border rounded-lg w-full p-2 text-2xl text-center" type="text" name="username" id="username" placeholder="amarabante"/>
                <label className='text-xl block p-2' htmlFor="password">Password:</label>
                <input className="border rounded-lg w-full p-2 text-2xl text-center mb-5" type="text" name="password" id="password" placeholder="password" />
                <div className="flex ">
                    {login && <button className="w-full border p-1 rounded-lg hover:bg-blue-50">Login</button>}
                    {!login && <button className="w-full border p-1 rounded-lg hover:bg-blue-50">Sign-Up</button>}
                </div>
            </form>
            {login && <div className="text-xs">Don't have an account?</div>}
            {!login && <div className="text-xs">Already have an account?</div>}
            {login && <button className="w-40 border p-1 rounded-lg hover:bg-blue-50 mb-6 mt-2" onClick={handleChange}>Sign Up</button>}
            {!login && <button className="w-40 border p-1 rounded-lg hover:bg-blue-50 mb-6 mt-2" onClick={handleChange}>Log In</button>}
        </div>
    </div>
    )
}