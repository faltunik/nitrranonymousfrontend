import React, {useContext, useEffect, useState, useRef, useCallback} from 'react'
import PostContext from '../context/PostContext'
import useAxios from '../utils/useAxios'
import PostDetail from './PostDetail'
import { Spinner } from 'react-bootstrap'
import Navbar2 from '../components/Navbar'
import Footer from '../components/Footer'
import Endpage from './Endpage'
import InfiniteScroll from 'react-infinite-scroll-component';


export default function HomePage() {
    let {posts, getPosts, postloading, pagenu, hasMorepost, handleScroll} = useContext(PostContext)

    // const observer = useRef() // what is this?
    // const lastPostElementRef = useCallback(node => {
    //   if (postloading) return
    //   if (observer.current) observer.current.disconnect()
    //   observer.current = new IntersectionObserver(entries => {
    //     if (entries[0].isIntersecting && hasMore) {
    //       setPageNumber(prevPageNumber => prevPageNumber + 1)
    //     }
    //   })
    //   if (node) observer.current.observe(node)
    // }, [loading, hasMore])

    
    

    useEffect(()=> {
      getPosts()
    }, [])



    return (


        
       
        <div>
             <Navbar2/>
            
            {postloading? <Spinner animation="border" />
            : 
    //         <InfiniteScroll
    //   dataLength={posts.length} //This is important field to render the next data
    //   next={getPosts()}
    //   hasMore={hasMorepost}
    //   loader={<Spinner animation="border" />}
    //   endMessage={<Endpage />}
    // >

    
            <div style={{'whiteSpace': 'pre-line'}}>
                { posts? posts.map(post => (
                  <div key={post.id}>
                  <PostDetail post = {post} />
                  </div>
                )): <div>No posts</div>}
            </div>
// </InfiniteScroll>
          }
{/* {postloading ? <Spinner animation="border" /> : posts.map(post => <PostDetail key={post.id} post={post} />)} */}
{/* <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<EndMsg />}
    >
      <div className="container">
        <div className="row m-2">
          {items.map((item) => {
            return <Comment key={item.id} item={item} />;
          })}
        </div>
      </div>
    </InfiniteScroll> */}
            
        <Footer/>
            
        </div>
    )
}


{/* <li key={note.id} >{note.content}</li> */}
