import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import PostContext from '../context/PostContext';
import { Card } from 'react-bootstrap';

export default function PostDetail({post}) {

    let {api} = useContext(PostContext)

    // const PostLike = async() => {
    //     console.log('clicked like button')
    //     let response = await api.post('like/postlike/', {'post_id' : post.id})
    //     console.log(response.date)
    // }

    return (
        <div className='border border-end-0 border-start-0 border-dark m-1 text-start p-1'>
        
            
        <Link to = {"/posts/" + post.id} style={{ textDecoration: 'none' }}> 
            <div className='text-light'  style={{'fontSize' : '88%'}}>
                <div className='badge bg-light text-dark text-wrap my-1'>{post.author}</div>
                <br></br>
                <div className='d-flex flex-column'>
                {post.content}
                 {post.image?
                 <div className='align-self-center'> 
                     <Card.Img style={{width:'12rem', height:'10rem', backgroundColor:'red'}} src ={post.image}/>
                 </div>
                   
                  : null}
                </div>
                 
            </div> 
                                
             </Link> 
             {/* <br></br>
                <button onClick={PostLike} type="submit" className="btn btn-primary btn-sm mx-3" >
                    Like
                </button> */}
        </div>
    )
}



