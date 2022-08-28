import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import LoginRoute from './utils/LoginRoute';
import MyRoute from './utils/MyRoute';
import { AuthProvider } from './context/AuthProvider';
import Header from './components/Header';
import Register from './pages/Register';
import Navbar2 from './components/Navbar';
import PostLogic from './pages/PostLogic';
import CommentLogic from './pages/CommentLogic';
import {PostProvider} from './context/PostProvider';
import Alert from './utils/Alert';
import Footer from './components/Footer';
import Profilepage from './profiles/Profilepage';
import PollList from './Polls/PollList';
import PassRest from './pages/PassRest';
import ConfEmail from './pages/ConfEmail';

function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
      <PostProvider>
      <Alert/>
      <Routes>
      <Route element = {<PrivateRoute> <HomePage /> </PrivateRoute>} path ="/" exact />   
      <Route element = {<LoginRoute> <LoginPage /> </LoginRoute> } path ="/login" />
      <Route element = {<LoginRoute> <Register/> </LoginRoute>} path = "/register" />
      <Route element = {<PrivateRoute> <Profilepage /> </PrivateRoute>} path = "profilepage/:id" />
      <Route element = {<PostLogic />} path = "/posts/:id" />
      <Route element = {<CommentLogic />} path = "/comments/:id" />
      <Route element = {<PollList />} path = "/polls" />
      <Route element = {<PassRest/>} path = "/passrest" />
      <Route element= {<ConfEmail/>} path = "/confemail" />
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <h1>There's nothing here!</h1>
        </main>
      }
    />
      </Routes>
      </PostProvider>
      </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;
