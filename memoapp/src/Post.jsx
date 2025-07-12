import React from 'react'
import { useState, useMemo, useCallback } from 'react';
import { useEffect } from 'react';

const Post = React.memo(({id,title,body}) => {
	const [verify, setVerify] = useState(false);
	

const bgcolor = useMemo(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []); 

const toggleVerify = useCallback(() => {
    setVerify((prev) => !prev);
  }, []);


  return (
	<div style={{border:"2px solid",margin:"10px",backgroundColor:bgcolor}}>
		<h5>{title}</h5>
		<p>{body}</p>
 <button onClick={toggleVerify}>
        {verify ? 'Unverify' : 'Verify'}
      </button>		
	  
	</div>
  )
})

export default Post
