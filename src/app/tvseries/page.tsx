import TvSeriesList from '@/components/tvSeries_components/TvSeriesList'
import TvSeriesTopbar from '@/components/tvSeries_components/TvSeriesTopBar'
import { Tv } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div>
      <TvSeriesTopbar/>
      <TvSeriesList/>
    </div>
  )
}

export default page
