"use client";
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick,searching})=>{

  const [filteredPosts, setFilteredPosts] = useState();

  useEffect(()=>{
    const filteredData = data.filter((coin) => coin.tag.toLowerCase().includes(searching.toLowerCase()) || coin.prompt.toLowerCase().includes(searching.toLowerCase()) );
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