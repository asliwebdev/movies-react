import React from 'react'
import MovieCard from './MovieCard'
import styled from 'styled-components'

const MovieList = ({movies}) => {
    if(!movies || movies.length < 1) {
        return (
            <h4 style={{ textAlign: 'center' }}>No matching movies found...</h4>
          );
    }

    let formattedMovies = movies.filter(movie => movie.vote_average && movie.poster_path)

   formattedMovies = formattedMovies.map(movie => {
    const {id, title, overview, original_language, vote_average, release_date, poster_path} = movie;
      return {
        id,
        title, 
        overview,
        language: original_language,
        rate: vote_average,
        date: release_date,
        img: poster_path,
    }
  })

  return (
    <Wrapper>
        {formattedMovies.map(movie => {
            return <MovieCard key={movie.id} {...movie} />
        })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
 gap: 2rem;
`

export default MovieList