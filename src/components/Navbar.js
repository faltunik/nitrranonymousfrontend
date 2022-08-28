import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { Navbar, Container} from 'react-bootstrap'
import AddPost from './AddPost'
import AddPolls from '../Polls/AddPolls'



export default function Navbar2() {
    let {user, logoutUser} = useContext(AuthContext)
    console.log(user)
    return (
        <div>
           <Navbar bg="dark" variant="dark" className='shadow-sm'>
                <Container>
                <Link style={{ textDecoration: 'none' }} to= {`/profilepage/${user.id}`} >Profile</Link>
                    
                {user? (
                    <>
                    <Link style={{ textDecoration: 'none' }} className="mx-3" to="/">Home</Link>
                    <AddPolls/>
                    <Link style={{ textDecoration: 'none' }} className="mx-3" to="/polls">POLLS</Link>
                    
                <Navbar.Collapse className="justify-content-end"> 
                    <Navbar.Text>
                        
                            <p  onClick={logoutUser}>Logout</p>                            
                    </Navbar.Text> 
                </Navbar.Collapse>
                </>                  
                    ) :
                    (
                        <Navbar.Collapse className="justify-content-end">
                    
                        <Navbar.Text>
                            <Link to ="/register">Create Account</Link>
                            <span> | </span>
                            <Link to = '/login'> Login </Link>
                        </Navbar.Text>
                        </Navbar.Collapse>
                    )
               
                 }
                </Container>
            </Navbar>
        </div>
    )
}
