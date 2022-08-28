import React, { useContext, useState, useEffect} from 'react';
import EditProfile from './EditProfile';
import PostContext from '../context/PostContext';
import AuthContext from '../context/AuthContext';
import { useParams } from "react-router-dom";



export default function Profilepage() {
    const [profile, setProfile] = useState('')
    const {api} = useContext(PostContext)
    let params = useParams()
    let {user} = useContext(AuthContext)


    console.log(params)
    console.log(params.id)
    const profileid = parseInt(params.id)
    let getProfile = async() => {
        let response = await api.get(`profile/profile/${profileid}`)
        if (response.status === 200){
            setProfile(response.data)
            console.log(response.data)
        }
    }

    useEffect(()=> {
        getProfile()
      }, [])
    
  return (
      <>

<div className="container d-flex justify-content-center align-items-center">
    <div className="card">
        <div className="upper"> <img src={profile.image} /> </div>
        <div className="user text-center">
            <div className="profile"> <img src={profile.image} className="rounded-circle" width="80"/> </div>
        </div>
        <div className="mt-5 text-center text-dark">
            <h4 className="mb-0">{user.email}</h4> <span className="text-muted d-block mb-2">Los Angles</span> <button className="btn btn-primary btn-sm follow">Follow</button>
            <EditProfile api={api} profile={profile}/>
            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                <div className="stats">
                    <h6 className="mb-0"><i class="ri-twitter-fill"></i></h6> <span>@faltunik</span>
                </div>
                <div className="stats">
                    <h6 className="mb-0"><i class="ri-instagram-line"></i></h6> <span>142</span>
                </div>
                <div className="stats">
                    <h6 className="mb-0"><i class="ri-whatsapp-line"></i></h6> <span>129</span>
                </div>
            </div>
            <div className="text mt-3 mb-4 mx-3"> <span>{profile.bio}</span> </div>
        </div>
    </div>
</div>
      
      
      </>
    
  )
}
