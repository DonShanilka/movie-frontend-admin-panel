import EpisodeList from '@/components/episode_components/EpisodeList'
import EpisodeTopbar from '@/components/episode_components/EpisodeTopBar'
import React from 'react'

function page() {
  return (
    <div>
      <EpisodeTopbar/>
      <EpisodeList/>
    </div>
  )
}

export default page
