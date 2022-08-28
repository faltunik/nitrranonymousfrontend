import React, {useState, useContext} from 'react';
import {Modal} from 'react-bootstrap'
import useAxios from '../utils/useAxios';
import PostContext from '../context/PostContext';


export default function AddPost() {
    let {AddPost, modal, setModal, postfield, setPostfield, setPostimg, postimg} = useContext(PostContext)
    const [myfilename, setMyfilename] = useState('Upload File')

    return (
        <div>
            <button type="button" className="btn btn-light btn-sm mx-3" onClick={() => setModal(true)}>
            <i className="ri-add-circle-fill"></i>
            </button>
            <Modal style={{backgroundColor: 'black'}}  centered show={modal} onHide={() => setModal(false)}> {/* () => setModal(false) */}
                <Modal.Header closeButton>
                    <Modal.Title className='text-dark'>Add Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={AddPost} >
                        <div className="form-group">
                            <div className = 'my-3'>
                            <textarea
                                type="text"
                                className="form-control"
                                name="content"
                                value = {postfield}
                                onChange={(e)=> setPostfield(e.target.value)}
                                rows="5"
                            >
                            </textarea>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                        {/* <input type="file" name="postimage" encType="multipart/form-data" src={postimg} onChange={(e) => setPostimg(e.target.files[0])} className="form-control" id="inputGroupFile01"/> */}
                        <input
                        type="file"
                        name="postfile"
                        className="form-control" 
                        placeholder = 'Upload File'
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            setPostimg(e.target.files[0]);
                            
                          }}
                        />
                        
                        </div>
                        
                        <p className="text-muted">
                          {postfield.length}/600
                        </p>

                        <div className="form-group">
                            <button type="submit"  className="btn btn-primary my-3">
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            
        </div>
    )
}

// enctype="multipart/form-data"
