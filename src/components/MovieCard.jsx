import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({id, img, title, date}) => {
  const url = `https://image.tmdb.org/t/p/w500${img}`
  return (
    <Link to={`/movie/${id}`} className='movie'>
            <article>
               <img src={url} alt={title} className='movie-card-img'/>
               <div className="movie-info">
                <h4 className='title'>{title}</h4>
                <p>{date}</p>
               </div>
            </article>
        </Link>
  ) 
        
}
export default MovieCard