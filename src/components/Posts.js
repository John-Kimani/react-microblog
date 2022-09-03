import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useApi } from "../contexts/ApiProvider";
import Post from './Post'


const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Posts() {

  const [posts , setPosts] = useState();
  const api = useApi();

  // TODO: add a side effect function to request posts here
  useEffect(() => {
    (async () => {
      const response = await api.get('/feed');
      if (response.ok) {
        setPosts(response.body.data);
      }else {
        setPosts(null);
      }
    })();
  }, [api]);
  
  
    return (
      <>
      {posts === undefined ?
      <Spinner animation='border' />
      :
      <>
        {posts === null ?
        <p>Could not retrive blog posts.</p> :
        <>
        {Post.length == 0 ?
          <p>Could not retrive blog posts.</p>
        :
        posts.map(post => <Post key={post.id} post={post} />)}
        </>
      }
      </>  
      }
      </>
    );
  }