import {format} from 'date-fns'
import { Link } from 'react-router-dom'
import '../App.css'
function Post({title,summary,content,cover,createdAt,author,_id}) {
  console.log(title,summary,content,cover,createdAt)
  return (
    <div className='Post'>
      <Link to={`/post/${_id}`}>
          <div className='Thumbnail'>
            <img  src={'http://localhost:3000/'+cover} alt='Something'/>
          </div>
      </Link>
          <div className='PostContent'>
            <h1 className='Title'>{title}</h1>
            <p className='Writer'>{author}</p>
            <p className='Date'>{format(new Date(createdAt),'MMM d, yyyy HH:mm')}</p>
            <p className='Description'>{summary}</p>
          </div>
      
        </div>
  )
}

export default Post