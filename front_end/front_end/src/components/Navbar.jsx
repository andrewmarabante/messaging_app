import homeIcon from '../assets/home.svg'
import messageIcon from '../assets/message.svg'
import logoutIcon from '../assets/logout.svg'

export default function Navbar(){
    return(
        <div className='flex justify-around p-7 bg-purple-100 shadow-md'>
            <a href="/"><img src={homeIcon} className='h-16' alt="homeIcon" /></a>
            <a href="/messages"><img src={messageIcon} alt='messageIcon' className='h-16'/></a>
            <img src={logoutIcon} alt="logoutIcon" className='h-16' />
        </div>
    )
}