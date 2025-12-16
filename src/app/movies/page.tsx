import MovieList from '@/components/movie_components/MovieList'
import MovieTopbar from '@/components/movie_components/movieTopbar'
import React from 'react'

function page() {
  return (
    <div >
        <MovieTopbar/>
        <MovieList />
    </div>
  )
}

export default page
