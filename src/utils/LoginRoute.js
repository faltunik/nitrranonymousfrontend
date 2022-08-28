import { Route, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useContext} from 'react'

function LoginRoute({ children }) {
    let {user} = useContext(AuthContext)
    return user? <Navigate to="/" /> : children;
  }

export default LoginRoute;
