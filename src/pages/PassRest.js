import React from 'react'
import { Form, Button } from 'react-bootstrap';


export default function PassRest() {
  return (
    <div>
        <h1>Password- Reset </h1>
            <div className='mx-2'>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Control name = "password" type="password" placeholder="Password" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control name = "confirmpassword" type="password" placeholder="Confirm Password"  required />
                </Form.Group>

                <Button variant="outline-light" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
            



    </div>

    
  )
}
