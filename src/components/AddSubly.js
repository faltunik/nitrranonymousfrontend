import React, {useContext, useState, useEffect} from 'react'
import PostProvider from '../context/PostProvider'
import {Modal} from 'react-bootstrap'
import AuthContext from '../context/AuthContext';
import { useParams } from "react-router-dom";
import useAxios from '../utils/useAxios';
import PostContext from '../context/PostContext';
import { appendErrors, useForm } from 'react-hook-form';
import classNames from 'classnames';

export default function AddSubly({ commentcontent }) {

    // let {register, handleSubmit, errors} = useForm();
    let {api, setSublys, sublys, params} = useContext(PostContext)
    let {ShowAlert, user} = useContext(AuthContext)
    let [modalsub, setModalsub] = useState(false)
    let [sublyfield, setSublyfield] = useState('')

    const AddReply = async(e, d) => {
        e.preventDefault()
        if (sublyfield.length === 0){
            alert('Enter some data')
        }
        else if (sublyfield.length > 600){
            alert('Max Lenght = 600 character only')
        }
        {
        try{
            let response = await api.post(`/sublys/subly/`, {'body': sublyfield, 'comment': commentcontent.id})
            setSublys([...sublys, response.data])
            console.log(response.data)
            setModalsub(false)
            setSublyfield('')
            ShowAlert('Comment Added ', "success") 
        }
        catch(error) {
            console.log(error)
        }
        }
    }

    


    return (
        <div>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setModalsub(true)}>
           Add Reply
        </button>
        <Modal show={modalsub} onHide={() => setModalsub(false)}> {/* () => setModal(false) */}
            <Modal.Header closeButton>
                <Modal.Title>Add Reply</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={AddReply} >
                    <div className="form-group">
                        <div className = 'my-3'>
                        <textarea
                            type="text"
                            className= "form-control"
                            name="subly"
                            value = {sublyfield}
                            onChange={(e) => setSublyfield(e.target.value)}
                            rows="3"
                        >
                        </textarea>

                        </div>
                    </div>
                    <p className="text-muted">
                        {sublyfield.length} /600
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