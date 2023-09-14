import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const baseURL = 'https://nitrr-anon.azurewebsites.net'

const useAxios = () => {
    const {chauToken, setUser, setChauToken} = useContext(AuthContext)
    const axiosInstance = axios.create({
        baseURL,
        headers:{
            Authorization: `Bearer ${chauToken?.access}`}
    });
    // what is interceptor role>
    // what does axios.Instance.interce.... means? How it affects axiosInstance
    axiosInstance.interceptors.request.use(async req => { 
        const user = jwt_decode(chauToken?.access)
        // how this isExpired is working
        // template for using dayjs = dayjs.unix(a).diff(dayjs())
        // working of isExpired
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        // if isExpired is false, then return req
        if(!isExpired) return req
        // otherwise create a const response, to send request to get new access token
    
        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: chauToken.refresh
          });

        // now setting chauToken value, here we can do error handling
    
        localStorage.setItem('chauToken', JSON.stringify(response.data))

        setChauToken(response.data)
        setUser(jwt_decode(response.data.access))


        // changing req.headers.auth.... and then returing req
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        
        return req
    })
    
    return axiosInstance
}

export default useAxios;