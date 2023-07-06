import { useEffect, useState } from 'react';
import Post from './Post';

export const Layout = () => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/post', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then(data => {
        // Sort the posts by createdAt in descending order
        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {Posts.length > 0 &&
        Posts.map(post => {
          return <Post key={post.id} {...post} />;
        })}
    </div>
  );
};
