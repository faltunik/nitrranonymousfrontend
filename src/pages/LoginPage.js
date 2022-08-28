import React, {useContext, useState, useRef} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
            <h1 className='my-3'>Login Page</h1>
           
            <div className='mx-1 align-middle'>
            
            <Form onSubmit={loginUser} >
                <Form.Group className="mb-3">
                    <Form.Control name = "email" type="email" placeholder="Enter Email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control name = "password" type="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="outline-light rounded-pill my-2" type="submit" >
                    Submit
                </Button>
            <h5> Don't Have Account? <Link to="/register">Register Here</Link></h5>
            <h5> Forget Password? <Link to="/confemail">Reset Here</Link></h5>

            </Form>
            <Card.Img style={{width: '15rem', height: '15rem'}} src=" https://media1.tenor.com/images/60d4ce79f531978a6ac06fbacc6353ff/tenor.gif?itemid=3579326" />

           
            </div>
            
        </div>
    )
}

// https://thumbs.gfycat.com/EcstaticAdorableCollie-size_restricted.gif
// http://drmerz.com/wp-content/uploads/2015/06/boy-in-the-well.gif
// https://talkofjesus.com/wp-content/uploads/2015/12/candle-burning.gif
