"use client";
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick,searching})=>{

  const [filteredPosts, setFilteredPosts] = useState();

  useEffect(()=>{
    const filteredData = data.filter((posts) => posts.tag.toLowerCase().includes(searching.toLowerCase()) || posts.prompt.toLowerCase().includes(searching.toLowerCase()) || posts.creator.username.toLowerCase().includes(searching.toLowerCase()));
    setFilteredPosts(filteredData);
  },[data,searching])

  return (
    <div className='mt-16 prompt_layout'>
      {searching == "" ? (
          data.map((post)=>(
            <PromptCard key={post._id} post={post} handleTagClick = {handleTagClick}/>
          ))
        )
      : (
        filteredPosts.map((post)=>(
          <PromptCard key={post._id} post={post} handleTagClick = {handleTagClick}/>
        ))
      )
      }
      
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchText] = useState('');
  const [posts,setposts] = useState([]);

  const handleSearchChange = (e) =>{
    e.preventDefault();
    const inputValue =  e.target.value;
    setSearchText(inputValue);
  }


  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setposts(data);
    }
    fetchPosts();
  },[])
console.log(posts)

// let postsIdArray = [];
// posts.map((postsid) => postsIdArray.push(postsid._id));
// console.log("array of ids",postsIdArray);

// useEffect(()=>{
//   const fetchPostsUsername = async () =>{
//     let response;
//     postsIdArray.map(async(fetchusernames)=>{
//       response = await fetch(`/api/user/${fetchusernames}/posts`);
//     })
//     const data = await response.json();
//     setpostsUsername(data);
//   }
//   fetchPostsUsername();
// },[postsIdArray])
// console.log(postsUsername);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search for a tag or a username' value={searchText} onChange={handleSearchChange} required className='search_input peer'/>
      </form>

      <PromptCardList data={posts} handleTagClick = {()=>{}} searching={searchText}/>
    </section>
  )
}

export default Feed