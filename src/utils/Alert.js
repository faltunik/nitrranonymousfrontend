import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

export default function Alert() {
    let {myalert} = useContext(AuthContext)
    return (
        myalert && <div>
            {myalert.type === 'success' ? <div className= "alert alert-success alert-dismissible fade show" role="alert">
              <strong>{myalert.type}</strong> : {myalert.msg}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> : 
             <div className= "alert alert-danger alert-dismissible fade show" role="alert">
             <strong>{myalert.type}</strong> : {myalert.msg}
             <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
           </div> }
        
        </div>
    )
}
