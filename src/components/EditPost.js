import PostContext from '../context/PostContext'
import { useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext'
import React, {useState, useContext} from 'react'
import {Button, Modal} from 'react-bootstrap'

export default function EditPost({notecontent}) {

    const[editModal, setEditModal] = useState(false)
    const[editField, setEditField] = useState(notecontent.content)
    let {ShowAlert} = useContext(AuthContext)
    let {api} = useContext(PostContext)
    let navigate = useNavigate()



    const EditPost = async({notecontent}) => {
        try{
            console.log("Editing the Data")
            const resp = await api.patch(`post/post/${notecontent.id}` , {'content': editField})
            console.log(resp)
            setEditModal(false)
            navigate(-1)
            ShowAlert("Post Edited", "success")
        }
        catch(error){
            console.log(error)
            navigate(-1)
            ShowAlert("You are Not Allowed to Edit", "Error")
  
        }
    }

  return (
    <div>
         <button type="button" className="btn btn-light btn-sm mx-3" onClick={() => setEditModal(true)}>
            Edit
            </button>
            <Modal style={{backgroundColor: 'black'}}  centered show={editModal} onHide={() => setEditModal(false)}> {/* () => setEditModal(false) */}
                <Modal.Header closeButton>
                    <Modal.Title className='text-dark'>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={EditPost}>
                        
                        <div className="form-group">
                            <div className = 'my-3'>
                            <textarea
                                type="text"
                                className="form-control"
                                name="content"
                                value = {editField}
                                onChange={(e)=> setEditField(e.target.value)}
                                rows="5"
                            >
                            </textarea>
                            </div>
                        </div>
                        <p className="text-muted">
                          {editField.length}/600
                        </p>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary my-3">
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

    </div>
  )
}
