import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function Posts() {

  const [posts , setPosts] = useState();

  // TODO: add a side effect function to request posts here
  
    return (
      <>
      {posts === undefined ?
      <Spinner animation='border' />
      :
      <>
      ...
      </>  
      }
      </>
    );
  }