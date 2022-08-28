import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PostContext from '../context/PostContext';
import AddReply from '../components/AddReply';
import Operation from '../components/Operation';


export default function Comment({comment, user}) {
    const [replies, setReplies] = useState([])
    const[hasReply, setHasReply] = useState(false)
    const {api} = useContext(PostContext)

    const ShowReply = async () => {
        let response = await api.get(`/reply/reply/?id=${comment.id}`)
        //let response = await api.get(`comments/comment/?id=${myid}`)
        if (response.status === 200){
            setHasReply(true)
            setReplies(response.data)
            console.log(response.data.results)
            console.log(response)
        }

    }


    const ForReply =  replies? replies.map((reply) => (
            <div key={reply.id}>
             <div className='border border-dark border-end-0 border-start-0 ms-2 text-start p-1'  style={{'fontSize' : '95%'}}>
            <div className='text-light'> 
            <div className='badge bg-success text-wrap my-1'>{reply.author}</div>
            <div className='position-absolute mx-3 end-0'>
                { user.id === reply.author_id ? <Operation notecontent = {reply} type="comment"  /> : null}
            </div>
                <br></br>
                {reply.body} </div> 
            </div>
            </div>))  
        :
        'No Reply'
            
    


    return (
        

        <div className='border border-dark border-end-0 border-start-0 ms-1 text-start p-1'  style={{'fontSize' : '90%'}}>
         
            <div className='text-light flex-sm-fill'> 
            <div className='badge bg-success text-wrap my-1'>{comment.author}</div>
            <div className='position-absolute mx-3 end-0'>
            { user.id === comment.author_id ? <Operation notecontent = {comment} type="comment"  /> : null}
            </div>
            <br></br>
             {comment.body}             
              </div> 
                <div className='d-flex  justify-content-evenly mx-3 mt-1'>
                < AddReply comment = {comment} replies={replies} setReplies={setReplies}/>
                <i className="ri-thumb-up-line align-middle ms-3"  ></i>
                </div>
                <hr></hr>
            {
                hasReply? 
                ForReply : <div className="text-primary text-center" onClick={ShowReply}>
                Show Replies 
            </div>
            }

            
            
        </div>
    )
    }







