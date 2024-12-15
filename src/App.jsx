import { useState , React ,useEffect } from 'react'
import './App.css'
import { useCallback } from 'react';



function Movie({title,publishDate,img,author,description,url,source}){
  return (
    <div className="movie-container">

  <div className="movie-details">
  <div className="movie-image" >
    <img src={img} alt="Movie Image" />
  </div>
    <div className='content'>
       <h2 className='movie-title'>{title}</h2>
    <p>Published At : {publishDate}</p>
    <p>Author : {author}</p>
    <p>Source <a href={url}>{source}</a> </p>
    <p>Description : {description}</p>   
    </div>

  </div>
</div>
  )
}


function App() {

  const [search,setSearch] = useState('tesla');
  const [news,setNews] = useState(null);
  const [loading,setLoading] = useState(false);
  const [noResult,setNoResult] = useState(false);
  const [initial,setInitial]=useState(true);
  const [error,setError] = useState(false);


  const searchResult = useCallback(async()=>{
    
    if(search.trim() === '')
      setInitial(true);
  
      setLoading(true);
  
      try{
      const url=`https://newsapi.org/v2/everything?q=${search}&apiKey=d53e826e87e24205a44b6d0d1646241b`
      const response = await fetch(url);
      const result = await response.json();
      setNews(result.articles);
  
      if(result.totalResults > 0){
        setLoading(false);
        setInitial(false);
        setNoResult(false);
        setError(false);
      } else if(search !== ''){
        setNoResult(true);
        setLoading(false);
        setInitial(false);
      }
      }
      catch{
        setError(true);
      }finally{
        setLoading(false);
      }
  
  
  },[search])

  return (
    <>
    <div className='frame-container'>
    <div className='search-top'>
      <img src="./src/assets/buzzFeed_enhanced.png" className='icon' />
      <input type="text"
       placeholder='Type here to search'
       value={search}
       onKeyDown={e=> {
        e.target.value === 'Enter'
        searchResult();
       }}
       onChange={e => setSearch(e.target.value)}/>
      <img src="./src/assets/search-icon.png" className='icon search-icon' onClick={searchResult} />
      <span >About |</span>
      <span onClick={e=>window.location.href='https://mail.google.com/mail/u/0/#inbox?compose=CllgCJTNqGCPmWDqdCFkjWTttqGSmdnPtLpcmwQRFgKFVvxVxWFvgbHZjkBlbPHKkHbZNwMfkkg'}> Contact |</span>
      <span onClick={e=>{window.location.href='https://github.com/suhail-z'}}> github</span>
      <br/>
    </div>
        { initial && !loading &&
          <div className='defaults'>
          <img className='icon' src="./src/assets/popcorn.png"  />
          <h2>Search for a News </h2>
          </div>
        }
        {
          loading && (
            <div className='defaults'>
              <p>Loading ...</p>
            </div>
            
          )
        }
        {
          noResult  && !loading &&  !initial && (
            <div className='defaults'>
              <img src="./src/assets/no-match.png" className='icon' />
            <h2> sorry couldn't find any result for ' {search} ' , try using other keywords </h2>
            </div>

          )
        }
      
        {
          
           news && !noResult  && (news.map((piece,ind)=>(

          <Movie key={ind} title={piece.title} publishDate={piece.publishedAt} img={piece.urlToImage} author={piece.author} description={piece.description} url={piece.url} source={piece.source.name}/> )
        ))}
        <div className='defaults'>
        <h5>Designed by Suhail</h5>
        </div>


    </div>
    
    </>
  )
}

export default App
