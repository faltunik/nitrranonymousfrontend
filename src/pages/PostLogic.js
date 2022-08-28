import React, {useState, useEffect, useContext} from 'react'
import useAxios from '../utils/useAxios'
import Comment from './Comment';
import PostContext from '../context/PostContext';
import AddComment from '../components/AddComment';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import Header from '../components/Header';
import Operation from '../components/Operation';
import AuthContext from '../context/AuthContext';
import { Card } from 'react-bootstrap';

export default function PostLogic() {
    let [notecontent, setNotecontent] = useState([])
    let [isliked, setIsliked] = useState(false)
    // let api = useAxios()
    
    
    let params = useParams()
    let {api, comments, setComments, getComments, posts } = useContext(PostContext)
    let {user, ShowAlert} = useContext(AuthContext)
    
    console.log(posts)
    // const postnu = posts.indexOf(posts.id === params.id)
    // console.log(postnu)
    // const findpost = (postlist, magnu) =>{
    //     let retnu = -1;
    //     for (let i = 0; i < postlist.length; i++){
    //         if (postlist[i]["id"] === magnu){
    //             retnu = i
    //             break    
    //         }
    //      return retnu
    //     }
    // }

    // const indofpost = findpost(posts, params.id)
    //const thenu= posts.find(post => post['id'] === `${params.id}`)
//     posts.find(({ id }) => {
//         console.log(id, params.id)
//         return id == params.id
//    })
//    console.log(typeof(params.id))
//     console.log(posts)
//     console.log(typeof(posts))
//     console.log(params.id)

    const thenu= posts.find( ({ id }) => `${id}` === params.id)
    console.log(thenu)
//     const filtnu = posts.filter((post) => post.id === params.id)
//     console.log(filtnu)

//     const inventory = [
//         {id: 21, name: 'apples', quantity: 2},
//         {id: 27, name: 'bananas', quantity: 0},
//         {id: 29, name: 'cherries', quantity: 5}
//       ];
// console.log(typeof(inventory))      

//     console.log(inventory.find(invent => invent.id === 29 ))


// const index = posts.findIndex((post) => post['id'] === params.id)
// console.log(index)
    
// console.time("find")
//Find method goes here

    useEffect(()=> {
        fetchPost()    
    }, [])
    // console.time(fetchPost)
    // console.timeEnd("find")

    useEffect(()=> {
        getComments(params.id)
    }, [])

    // let fetchPost = async() =>{
    //         let response = await api.get(`/post/post/${params.id}`)       
    //         if(response.status === 200){
    //         setNotecontent(response.data)
    //         // console.log(response.data)
    //     }
    // }

    let fetchPost = async() =>{
        if (posts.length === 0){
            let response = await api.get(`/post/post/${params.id}`)       
            if(response.status === 200){
            setNotecontent(response.data)
            console.log(response.data)
            // console.log(response.data)
        } 
        }
        else {
            console.log('Hope working')
            const result = posts.find(({id}) => `${id}` === params.id);
            setNotecontent(result)
            console.log(result)
            console.log([notecontent])
            console.log(notecontent.id)
            console.log(notecontent.author)
            console.log(notecontent.content)
            console.log(notecontent.like)
            console.log(notecontent.like.length)
        }        
    }

    const canlike = () => {
        const myarray = Array.from(notecontent.like)
        if(myarray.indexOf(user.id) > -1){
            return false
        }
        else{
           return true
        }
    }

    // useEffect(()=> {
    //     canlike()
    // }, [])


    const likepost = async (postid) => {
        const response = await api.get(`/post/post/?getid=${postid}`,)
        if (response.status === 200){
            const myarray = Array.from(notecontent.like)
            {isliked? setIsliked(false) : setIsliked(true)}
            console.log(myarray.length = myarray.length +1 ) //if user is liked, delete it, else push it         
            console.log(response)
        }
    }

    // let getPost = (nu) => {
    //     setNotecontent(posts[nu])
    // }

    // const result = inventory.find( ({ name }) => name === 'cherries' );

    


    // const PostLike = async() => {
    //     console.log('clicked like button')
    //     let response = await api.get(`like/post/?getid=${params.id}`)
    //     setIsliked(isliked? false : true)
    //     console.log(response)
        
    // }

    // let buttontag = isliked? "Dislike" : "Like"
    

    // console.log(notecontent["like"].length)
    // console.log(notecontent)
    console.log(notecontent.like)
    console.log(typeof(notecontent.like))
    
    console.log(notecontent.author_id)
    console.log(user.id)

    return (
        <div>
            <Header/>
            

            <div className='border border-dark border-end-0 border-start-0 text-start p-2 ' style={{'fontSize' : '95%', 'white-space': 'pre-line'}} >
            <div className='badge bg-primary text-wrap my-1'>{notecontent.author}</div>
            <div className='position-absolute mx-3 end-0'>
               { user.id === notecontent.author_id? <Operation notecontent = {notecontent} type="post"/> : null }
             {/* <Operation notecontent = {notecontent}/> */}
            
            </div>
                <br></br>
                <div className='d-flex flex-column'>
                    {notecontent.content} 
                    {notecontent.image?
                 <div className='align-self-center'> 
                     <Card.Img style={{width:'12rem', height:'10rem', backgroundColor:'red'}} src ={notecontent.image}/>
                 </div>
                   
                  : null}
                </div>
                            <br></br>
                <hr></hr>
                <div className='d-flex justify-content-around mt-1'>


                < AddComment notecontent = {notecontent}/>
                {/* {
            
                console.log(notecontent.like.length)
                } */}
                {/* {console.log(typeof(notecontent.like))} */}
               { canlike?  <i className="ri-thumb-up-line" onClick={likepost} >{notecontent.like?.length}</i>  : <i className="ri-thumb-up-fill" onClick={likepost}> {notecontent.like?.length} </i>  }
               {/* { isliked? <i className="ri-thumb-up-fill" onClick={likepost}> {notecontent.like?.length} </i>   :  <i className="ri-thumb-up-line" onClick={likepost} >{notecontent.like?.length}</i>    } */}
               
                <RWebShare
                    data={{
                    text: "Abey, yahan apn apne colg me kya ho rha hai jaan skte hai, Mst Website hai",
                    url: "http://localhost:3000",
                    title: "Honest NITRR",
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <i class="ri-share-forward-fill"></i>
                </RWebShare>

                </div>
               
                
                
            </div>
            



        <div className='d-flex justify-content-between ms-4 mt-3'>
        <h4 className='justify-content-start'>Comments</h4>
           


        </div>
        

        

         <div className = "mb-5" style={{'white-space': 'pre-line'}}>                
         {comments.length === 0 ?     
            'No Comments to display' : comments.map( (comment) => (
             <div key={comment.id}>
                 <Comment comment = {comment} user={user} />
             </div>
         ))}
        </div>


        </div>
        
     
    )
}
