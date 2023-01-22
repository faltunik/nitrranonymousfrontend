import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import PostContext from './PostContext';
import AuthProvider from './AuthProvider';
import { useParams } from "react-router-dom";
import AuthContext from './AuthContext';
import useAxios from '../utils/useAxios';
// import { useParams } from "react-router-dom";

export const PostProvider = ({children}) => {
    let [posts, setPosts] = useState([])
    let [postimg, setPostimg] = useState(null)
    const [modal, setModal] = useState(false);
    let [postfield, setPostfield] = useState('');
    let [comments, setComments] = useState([])
    let [sublys, setSublys] = useState([])
    let [postloading, setPostloading] = useState(true)
    let [pagenu, setPagenu] = useState(1)
    let params = useParams()
    let api = useAxios()
    const [hasMorepost, setHasMorepost] = useState(true);

    let {ShowAlert, user} = useContext(AuthContext)

    // window.onscroll = function(ev) {
    //     if ((window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight) {
    //         setPagenu(pagenu + 1)
    //         console.log('loading page', pagenu)
    //     }
    // };

    // const observer = useRef() // what is this?
    // const lastPostElementRef = useCallback(node => {
    //   if (postloading) return
    //   if (observer.current) observer.current.disconnect()
    //   observer.current = new IntersectionObserver(entries => {
    //     if (entries[0].isIntersecting && hasMorepost) {
    //       setPagenu(prevPagenu => prevPagenu + 1)
    //     }
    //   })
    //   if (node) observer.current.observe(node)
    // }, [postloading, hasMorepost])


    // const handleScroll = (e) => {
    //     console.log("Top", e.target.scrollTop) // e.target.scrollTop is the current scroll position
    //     console.log(window.innerHeight);
    //     console.log(e.target.documentElement.scrollHeight);


    // }

    // const handleScroll = (e) => {
    //     console.log(e.target.documentElement.scrollTop);
    //     console.log(window.innerHeight);
    //     console.log(e.target.documentElement.scrollHeight);
    //     // console.log(
    //     //   Math.ceil(e.target.documentElement.scrollTop + window.innerHeight)
    //     // );
    //     const scrollHeight = e.target.documentElement.scrollHeight;
    //     const currentHeight = Math.ceil(
    //       e.target.documentElement.scrollTop + window.innerHeight
    //     );
    //     if (currentHeight + 1 >= scrollHeight && hasMorepost) {
    //       getPosts();
    //       //console.log("No Loading")
    //     }
    //     else{
    //         console.log("No Loading")
    //         //getPosts();
    //     }
    //   };



    // let getPosts = async() =>{
    //     let response = await api.get(`/post/post/?page=${pagenu}`)

    //     if(response.status === 200){
    //         setPosts([...posts, ...response.data.results])
    //         console.log("--------------start here ------------")
    //         console.log(pagenu)
    //         console.log(response.data.results)
    //         console.log(posts)
    //         setPostloading(false)
    //         console.log(typeof(posts))

    //         console.log(response.data.results.length)
    //         console.log(response.data["length"])
    //         console.log("--------------Endhere ------------")
    //         if (response.data.results.length >7 && hasMorepost === true){
    //             setPagenu(pagenu + 1)
    //             console.log(pagenu)
    //             console.log('NExt Page')
    //           }
    //         else{
    //             setHasMorepost(false)
    //             setPagenu(1)
    //             console.log('No Lead and Page')
    //         }            
    //     }        
    // }


    let getPosts = async() =>{
        let response = await api.get(`/post/post/?page=${pagenu}`)

        if(response.status === 200){
            setPosts(response.data.results)
            console.log("--------------start here ------------")
            console.log(pagenu)
            console.log(response.data.results)
            console.log(posts)
            setPostloading(false)
            console.log(typeof(posts))

            console.log(response.data.results.length)
           // console.log(response.data["length"])
            // console.log("--------------Endhere ------------")
            // if (hasMorepost === true){
            // if (response.data.results.length >13){
            //     setPagenu(pagenu + 1)
            //     console.log(pagenu)
            //     console.log('NExt Page')
                
            //   }
            // }
            // else{
            //     setHasMorepost(false)
            //     setPagenu(1)
            //     console.log('No Lead and Page')
            // }            
        }        
    }

    let getComments = async(myid) => {
        let response = await api.get(`comments/comment/?id=${myid}`)
        if (response.status === 200){
            setComments(response.data)
            console.log(response.data.results)
            console.log(response)
        }
    }

    let getSubly = async(subid) => {
        console.log(subid)
        let response = await api.get(`sublys/subly/?myid=${subid}`)
        if (response.status === 200){
            setSublys(response.data)
            console.log(response.data)
        }
    }
    

    
    const AddPost = async (e) => {
        e.preventDefault()
        if (postfield.length === 0){
            alert('Enter some data')
        }
        else if (postfield.length > 600){
            alert('Max Lenght = 600 character only')
        }
        else {
        try{
            let formData = new FormData()
            formData.append('content', postfield)
            if (postimg) {
                formData.append('image', postimg)
            }
            
            let response = await api.post('/post/post/', formData)
            console.log(response.data)
            console.log(typeof(response.data))
            console.log(response.data.image)
            const newurl = `http://127.0.0.1:8000${response.data.image}`
            response.data.image = newurl
            console.log(typeof(response.data.image))
            
            // const response.data.image = response.data.image.replace('http://localhost:8000', '')
            setPosts([response.data, ...posts])
            setPostfield('')
            setPostimg(null)
            setModal(false)
            ShowAlert('Post is Added', "success")
        }
        catch(error) {
            console.log(error)
        }
    }       
    }


 //////////////////////////////////////////// Polling  ////////////////////// ////////////////////// 

 const [polls, setPolls] = useState('')
 
  const getPolls = async () => {
    try{
      const response = await api.get('/poll/poll/')
      console.log(response.data)
      console.log(response.data.results)
      setPolls(response.data)
    }
    catch(err){console.log(err)}
  }

  

    



    let contextData = {
        api,
        posts,
        setPosts,
        getPosts,
        AddPost,
        modal,
        setModal,
        postfield,
        setPostfield,
        comments,
        setComments,
        getComments,
        sublys,
        setSublys,
        getSubly,
        postloading,
        pagenu,
        setHasMorepost,
        hasMorepost,
        setPostimg,
        postimg,
        getPolls,
        polls,
        setPolls,
        // handleScroll,
        // lastPostElementRef
    }



    return (
        
        
        
        <div>
        <PostContext.Provider value={contextData} >
            {children}
        </PostContext.Provider>            
        </div>
    )
}

export default PostProvider;
