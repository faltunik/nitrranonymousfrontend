import React, {useState, useContext} from 'react'
import {Modal, Button, FormControl} from 'react-bootstrap'
import { alignPropType } from 'react-bootstrap/esm/types';
import AuthContext from '../context/AuthContext';

export default function EditProfile({api, profile}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [profileimg, setProfileimg] = useState(profile.image)
    const [editBio, setEditBio] = useState(profile.bio)
    const [editTwitter, setEditTwitter] = useState('@singer')
    const [editInstagram, setEditInstagram] = useState('@singer')
    const [editWhatsapp, setEditWhatsapp] = useState('@singer')
    const {navigate, ShowAlert, user}  = useContext(AuthContext)
    // changes state
    const [imgchange, setImgchange] = useState(false)
    const [biochange, setBiochange] = useState(false)
    const [twitterchange, setTwitterchange] = useState(false)
    const [instagramchange, setInstagramchange] = useState(false)
    const [whatsappchange, setWhatsappchange] = useState(false)


    const updateProfile = async(e) => {
      e.preventDefault()
      try{
        let formData = new FormData()
        formData.append('image', profileimg)
        formData.append('bio', editBio)
        let response = await api.patch(`/profile/profile/${user.id}/`, formData)
        console.log(response.data)
        setShow(false)
        ShowAlert('Profile Updated', 'success')
        navigate(-1)
      }
      catch(error){
        console.log(error)
      }
        
    }




  //   const AddPost = async (e) => {
  //     e.preventDefault()
  //     if (postfield.length === 0){
  //         alert('Enter some data')
  //     }
  //     else if (postfield.length > 600){
  //         alert('Max Lenght = 600 character only')
  //     }
  //     else {
  //     try{
  //         let formData = new FormData()
  //         formData.append('content', postfield)
  //         formData.append('image', postimg)
  //         let response = await api.post('/post/post/', formData)
  //         console.log(response.data)
  //         console.log(typeof(response.data))
  //         console.log(response.data.image)
  //         const newurl = `http://127.0.0.1:8000${response.data.image}`
  //         response.data.image = newurl
  //         console.log(typeof(response.data.image))
          
  //         // const response.data.image = response.data.image.replace('http://localhost:8000', '')
  //         setPosts([response.data, ...posts])
  //         setPostfield('')
  //         setModal(false)
  //         ShowAlert('Post is Added', "success")
  //     }
  //     catch(error) {
  //         console.log(error)
  //     }
  // }       
  // }



  return (
    <div>
    <button type="button" className="btn btn-light btn-sm mx-3" onClick={() => setShow(true)}>
    <i className="ri-add-circle-fill"></i>
    </button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className='text-dark' closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={updateProfile}>
                <div className="form-group">
                    <div className = 'my-3'>
                    <input
                        type="file"
                        name="postfile"
                        className="form-control" 
                        placeholder = 'Upload File'
                        onChange={(e) => {

                            console.log(e.target.files[0]);
                            setImgchange(true);
                            setProfileimg(e.target.files[0])                            
                          }}
                        />
                    <textarea
                        type="text"
                        className="form-control my-2"
                        name="content"
                        value = {editBio}
                        onChange={(e)=>{
                          setBiochange(true);
                          setEditBio(e.target.value)}}
                        rows="5"
                        placeholder='Enter Your Bio'
                    >
                    </textarea>
                    <p className="text-muted">
                  {/* {postfield.length}/600 */}
                </p>
                    <div className='my-2 py-2'>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder='Enter twitter Link' />
                    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder='Enter instagram Link' />
                    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder='Enter whatsapp Link' />
                    </div>
                    </div>
                </div>
               
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
