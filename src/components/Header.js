import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='my-3'>
            <Link to="/" ><i class="ri-arrow-go-back-line"></i></Link>
           
        </div>
    )
}

export default Header
