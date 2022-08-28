import React, {useContext, useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import AuthContext from '../context/AuthContext';
import PostContext from '../context/PostContext';

export default function AddReply({ comment, replies, setReplies}) {
    // let { comments, setComments} = useContext(PostProvider)
    let [modalr, setModalr] = useState(false)
    let [replyfield, setreplyfield] = useState('')
    // let myparams = useParams()
    let {api} = useContext(PostContext)
    let {ShowAlert, user} = useContext(AuthContext)
    console.log(comment.id)

    const AddReplies = async(e) => {
        e.preventDefault()
        if (replyfield.length === 0){
            alert('Enter some data')
        }
        else if (replyfield.length > 600){
            alert('Max Lenght = 600 character only')
        }
        else{
        try{
            let response = await api.post(`/comments/comment/`, {'body': replyfield, 'post': comment.post, 'parent': comment.id})
            setReplies([...replies, response.data])
            console.log(response.data)
            setreplyfield('')
            setModalr(false)
            ShowAlert('Reply Added ', "success") 
        }
        catch(error) {
            console.log(error)
        }
    }

    }

    return (
        <div>
        {/* <button type="button" className=" btn-sm" >
        <i class="ri-chat-3-line"></i>
        </button> */}
        
        <i  onClick={() => setModalr(true)} className="ri-chat-3-line"></i>

        <Modal show={modalr} style={{backgroundColor: 'black'}}   onHide={() => setModalr(false)}> {/* () => setModal(false) */}
            <Modal.Header closeButton>
                <Modal.Title className='text-dark'>Add Reply</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={AddReplies} >
                    <div className="form-group">
                        <div className = 'my-3'>
                        <textarea
                            type="text"
                            className="form-control"
                            name="body"
                            rows="3"
                            value = {replyfield}
                            onChange={(e) => setreplyfield(e.target.value)}
                        >
                        </textarea>
                        </div>
                    </div>
                    <p className="text-muted">
                        {replyfield.length} /600
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