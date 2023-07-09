import axios from 'axios';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import {SearchForm, MovieList } from '../components'
import { useQuery } from '@tanstack/react-query';

const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const searchUrl = 'https://api.themoviedb.org/3/search/movie?query='


const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWQ0YjY4MTEyZDc5NDhhZjgwZjRkMTdhOWUwYWU2MCIsInN1YiI6IjY0YTQyYWYwODI4OWEwMDEyZDI5Njc5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KD1V4MG-I0aqasRU9vKz_0aCQjQOSrnSF51Z6ycFlFc'
  }
};

const getMoviesQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'popular'],
    queryFn: async() => {
      const finalUrl = searchTerm ? `${searchUrl}${searchTerm}`: popularUrl;
      const response = await axios.get(finalUrl, options);
      return {movies: response.data.results, pages: response.data.total_pages};
    }
  }
}

export const loader = (queryClient) => async({request}) => {
     const url = new URL(request.url);
     const searchTerm = url.searchParams.get('search');
     await queryClient.ensureQueryData(getMoviesQuery(searchTerm));
     return {searchTerm}
}

const Landing = () => {
  const {searchTerm} = useLoaderData();
  const {data: {movies, pages}} = useQuery(getMoviesQuery(searchTerm));

  return (
    <>
      <SearchForm />
      <MovieList movies={movies} />
    </>
  )
}

export default Landing