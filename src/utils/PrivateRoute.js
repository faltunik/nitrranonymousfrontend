import { Route, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useContext} from 'react'

function PrivateRoute({ children }) {
    let {user} = useContext(AuthContext)
    return user? children : <Navigate to="/login" />;
  }

export default PrivateRoute;





// ...rest - wrappup all elements inside one
  