import React, {useState, useEffect, useContext} from 'react'
import useAxios from '../utils/useAxios'
import Subly from './Subly';
import PostContext from '../context/PostContext';
import AddSubly from '../components/AddSubly';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function CommentLogic() {
    let [commentcontent, setCommentcontent] = useState('')
    let {api, sublys, getSubly} = useContext(PostContext)
    let params = useParams()
    const navigate = useNavigate();
    let mid = params.id
    // console.log(mid)
    // console.log(typeof mid)



    
    
    useEffect(()=> {
        getComment()
    }, [])

    useEffect(()=> {
        getSubly(params.id)
    }, [])

    let getComment = async() =>{
        let response = await api.get(`/comments/comment/${params.id}`)       
        if(response.status === 200){
            setCommentcontent(response.data)
            // console.log(response.data)
        }        
    }
    



    return (
        <div>
            <button type="button" className="btn btn-primary my-2 btn-sm" onClick={() => navigate(-1)}>
           Back
        </button>

            <div className='border border-dark m-3 text-start p-2'>
            <div className='badge bg-primary text-wrap my-1'>{commentcontent.author}</div>
                <br></br>
                    {commentcontent.body}             
            </div>

        <h1>Replies</h1>

        < AddSubly commentcontent = {commentcontent}/>

         <ul className = "mb-5">                
         {sublys.length === 0 ?     
            'No Reply to display' : sublys.map( (subly) => (
             <li key={subly.id}>
                 <Subly subly = {subly} />
             </li>
         ))}
        </ul>


        </div>
        
     
    )
}