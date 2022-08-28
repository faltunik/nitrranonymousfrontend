import React, {useContext} from 'react'
import { Container, Navbar } from 'react-bootstrap'
import AddPost from './AddPost'
import AuthContext from '../context/AuthContext'

export default function Footer() {
    let {user} = useContext(AuthContext)
    return (
        <div>
            <Container>
            { user?<Navbar fixed="bottom"  expand="lg">
                <Container className='d-flex justify-content-center'>
                {  < AddPost/>  }
                
                </Container>
            </Navbar> : "Don't Have Account? Join Here"}
            
            </Container>
        </div>
    )
}
