import React, {useState, useContext, useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import { useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext'
import PostContext from '../context/PostContext'
import EditPost from './EditPost'



export default function Operation({notecontent, type}) {
    let [modalo, setModalo] = useState(false)
    let {api } = useContext(PostContext)
    let {ShowAlert} = useContext(AuthContext)
    let navigate = useNavigate()
    let [deletepost, setDeletepost] = useState(false)
    let [deletecomment, setDeletecomment] = useState(false)


    // if(type === 'post'){
    //   setDeletepost(true)
    // }
    // if(type === 'comment'){
    //   setDeletecomment(true)
    // }

    const actionme = () => {
        if(type === 'post'){
            setDeletepost(true)
        }
        if(type === 'comment'){
            setDeletecomment(true)
        }
    }

    useEffect(()=> {
      actionme()    
  }, [])

    console.log(notecontent)
    const DeletePost = async() => {
        try{
            const resp = await api.delete('post/post/' + notecontent.id)
            console.log(resp)
            setModalo(false)
            navigate("/")
            ShowAlert("Post Deleted", "success")
        }
        catch(error){
            console.log(error)
            navigate(-1)
            ShowAlert("You are Not Allowed to delete", "Error")

        }
    }

    const DeleteComment= async() => {
      try{
          const resp = await api.delete('/comments/comment/' + notecontent.id)
          console.log(resp)
          setModalo(false)
          navigate(-1)
          ShowAlert("Comment Deleted", "success")
      }
      catch(error){
          console.log(error)
          navigate(-1)
          ShowAlert("You are Not Allowed to delete Comment", "Error")

      }
  }






    // try{
    //     let response = await api.post('/post/post/', {'content': postfield, 'author': user.id})
    //     console.log(response.data)
    //     setPosts([response.data, ...posts])
    //     setPostfield('')
    //     setModal(false)
    //     ShowAlert('Post is Added', "success")
    // }
    // catch(error) {
    //     console.log(error)
    // }
  return (
    <div>
            
            <i className="ri-equalizer-line" onClick={() => setModalo(true)}></i>
            <Modal show={modalo} onHide={() => setModalo(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {deletepost? <button type="submit" className="btn btn-danger my-3" onClick={DeletePost}> Delete </button> : null}
        {deletecomment? <button type="submit" className="btn btn-danger my-3" onClick={DeleteComment}> Delete </button> : null}
        <EditPost notecontent={notecontent} />
        </Modal.Body>
      </Modal>
            
        </div>
  )
}
