import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function ConfEmail() {
  return (
    <div>

    <div>
        <h1>Enter Your Email</h1>
    </div>

<Form >


                <Form.Group className="mb-3">
        <Form.Control name = "confirmemail" type="email" placeholder="Confirm Email"  required />
                </Form.Group>

                <Button variant="outline-light" type="submit">
                    Submit
                </Button>
            </Form>


    </div>
  )
}
