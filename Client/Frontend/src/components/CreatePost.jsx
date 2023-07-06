import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react"
import {useContext} from "react";
import { MyContext } from "../App";

const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
  ];
const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };
const CreatePost = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [file, setFile] = useState('');
    const { userinfo } = useContext(MyContext);

    const CreateNewPost = async (ev) =>{
        ev.preventDefault()
        const data = new FormData();
        data.set('title',title);
        data.set('summary', summary)
        data.set('content', content)
        data.set('author', userinfo.username)
        data.set('file',file[0])
        await fetch('http://localhost:3000/post',{
            method: 'POST',
            body: data
        })
    }



  return (
    <form onSubmit={CreateNewPost}>
        <input type="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
        <input type="summary" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)}/>
        <input type="file"  onChange={ev => setFile(ev.target.files)}/>
        <ReactQuill
        value={content}
        onChange={e => setContent(e)}
        modules={quillModules}
        formats={quillFormats}
        />
        <button style={{'marginTop': '5px'}}>Create Post</button>
    </form>
  )
}

export default CreatePost