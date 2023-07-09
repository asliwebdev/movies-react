import React from 'react'
import { useLoaderData, Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { FaStar } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.REACT_APP_TMDB_ACCESS_TOKEN}`
  }
};

const getSingleMovieQuery = (id) => {
  return {
    queryKey: ['movie', id],
    queryFn: async() => {
      let url = `https://api.themoviedb.org/3/movie/${id}?api_key=69d4b68112d7948af80f4d17a9e0ae60`
      const response = await axios.get(url, options);
      return response.data;
    }
  }
}

export const loader = (queryClient) => async({params}) => {
  const {id} = params;
  await queryClient.ensureQueryData(getSingleMovieQuery(id))
 return {id}
}

const Movie = () => {
  const {id} = useLoaderData();
  const {data: movie} = useQuery(getSingleMovieQuery(id))
  if(!movie) {
    return <Navigate to='/' />
  }
  const {title, release_date: date, genres, runtime, overview, vote_average: rate, original_language: language, poster_path: img, vote_count: reviews,} = movie;
  const img_url = `https://image.tmdb.org/t/p/w500${img}`
  return (
    <Wrapper>
       <header>
        <Link to='/' className='btn'>Back Home</Link>
        <h3>{title}</h3>
       </header>
       <div className="single-movie">
        <img src={img_url} alt={title} className='img'/>
        <div className="single-movie-info">
            <p>
              <span className="single-movie-data">Genres: </span>
              {genres.map((genre, index) => {
                return <span key={index} className='genre'>{genre.name}{index < genres.length - 1 ? ',' : ''}</span>
              })}
            </p>
            <p>
            <span className="single-movie-data">TMDB: </span> <FaStar />{rate.toFixed(1)}/10 ({reviews} reviews)
            </p>
            <p>
              <span className="single-movie-data">Overview: </span> {overview}
            </p>
            <p>
              <span className="single-movie-data">Release Date: </span>{date}
            </p>
            <p>
              <span className="single-movie-data">Duration: </span> {runtime} minutes
            </p>
            <p>
              <span className="single-movie-data">Original Language: </span> {language}
            </p>
        </div>
       </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  header {
    text-align: center;
    margin-bottom: 3rem;
    .btn {
      margin-bottom: 1rem;
    }
    h3 {
      font-weight: 700;
      font-size: 3rem;
    }
  }
  .img {
    border-radius: var(--borderRadius);
  }
  .single-movie-info {
    padding-top: 2rem;
  }
  .single-movie p {
    font-weight: 700;
    line-height: 2;
    text-transform: capitalize;
    margin-bottom: 2rem;
  }
  .single-movie-data {
    margin-right: 0.5rem;
    background: var(--primary-300);
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
    color: var(--primary-700);
    letter-spacing: var(--letterSpacing);
  }
  .genre {
    display: inline-block;
    margin-right: 0.5rem;
  } 
  svg {
    color: #eab308;
  }
  @media (min-width: 992px) {
    .single-movie {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 4rem;
      align-items: center;
    }
    .single-movie-info {
      padding-top: 0;
    }
  }
`

export default Movie