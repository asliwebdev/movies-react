import React from 'react'
import {About, Landing, Newsletter, HomeLayout, Error, Movie, SinglePageError} from '../src/pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


import {loader as landingLoader} from './pages/Landing'
import {loader as singleMovieLoader} from './pages/Movie'
import { action as newsletterAction } from './pages/Newsletter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
})
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {  
        index:true,
        loader: landingLoader(queryClient),
        errorElement: <SinglePageError />,
        element: <Landing />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'newsletter',
        action: newsletterAction,
        element: <Newsletter />,
      },
      {
        path: 'movie/:id',
        loader: singleMovieLoader(queryClient),
        element: <Movie />,
      },
    ]
  }
])

const App = () => {
  return (
     <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
       <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
  )
}

export default App