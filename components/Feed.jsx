'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList =({data, handleTagClick})=> {
  return (
   <div className='mt-16 prompt_layout'>
    {data.map((prompt)=> (
      <PromptCard
        key={prompt._id}
        prompt={prompt}
        handleTagClick={handleTagClick}
      />
    ))}
   </div> 
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts =()=> {
    const regex = new RegExp(searchText, "i");
    return prompts.filter((item)=> 
      regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
    );
  }

  const handleSearchChange =(e)=> {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(()=> {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      },500)
    )
  }

  const handleTagClick =(tag)=> {
    setSearchText(tag);
    const searchResults = filterPrompts(tag);
    setSearchedResults(searchResults);
  }

  useEffect(()=> {
    const fetchPrompts =async()=> {
      const response= await fetch('/api/prompt');
      const data = await response.json();
      setPrompts(data);
    }
    fetchPrompts();
  },[]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for username or a tag'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {
        searchText ? 
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
        :
        <PromptCardList
          data={prompts}
          handleTagClick={handleTagClick}
        />
      }
      {
        searchText!=="" && searchedResults.length===0 && <h3> No Results Found </h3>
      }
    </section>
  )
}

export default Feed