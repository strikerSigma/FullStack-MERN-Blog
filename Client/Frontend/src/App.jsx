
import './App.css'
import { Header } from './components/Header'
import { Layout } from './components/Layout'
import Login from './components/Login'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Register from './components/Register'
import {useState,createContext} from 'react'
import CreatePost from './components/CreatePost'
import PostPage from './components/PostPage'

export const MyContext = createContext();
function App() {
  const [userinfo,setUserinfo] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <> 
    <MyContext.Provider value={{userinfo,setUserinfo,isAuthenticated, setIsAuthenticated}}>
    <Header/>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout/>}/>      
    <Route path='/login' element={<Login/>}/>      
    <Route path='/register' element={<Register/>}/>                 
    <Route path='/create' element={<CreatePost/>}/>                 
    <Route path='/post/:id' element={<PostPage/>}/>                 
    </Routes>
    </BrowserRouter>
    </MyContext.Provider>
    </>
  )
}

export default App
