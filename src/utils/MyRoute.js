import { Route, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useContext} from 'react'

function MyRoute({ children }) {
    let {user} = useContext(AuthContext)
    return user? <Navigate to="/login" /> : children ;
  }

export default MyRoute;