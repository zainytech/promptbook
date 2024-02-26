"use client";
import {useEffect, useState} from 'react'
import { useRouter,useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = () => {
    const router = useRouter();
  const [submitting,setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')

  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(()=>{
    const getPromoptDetails = async () =>{
        const response = await  fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
            prompt:data.prompt,
            tag: data.tag,
        })
    }
    if(promptId) getPromoptDetails();
  },[promptId])

//   const createPrompt = async (e) =>{
//     e.preventDefault();
//     setSubmitting(true);

//     try{
//         const response= await fetch('/api/prompt/new', {
//             method:"POST",
//             body:JSON.stringify({
//                 prompt:post.prompt,
//                 userId: session?.user.id,
//                 tag:post.tag
//             })
//         })
//         if(response.ok){
//             router.push('/')
//         }
//     } catch(error){
//         console.log(error)
//     } finally {
//         setSubmitting(false);
//     }
//   }
    return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={()=>{}}
    />
  )
}

export default UpdatePrompt