import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import TvRow from '../components/TvRow'
import requests from '../Requests'

const Home = () => {
  return (
    <>
      <Main />
      <Row rowID='1' title='Upcoming' fetchURL={requests.requestUpcoming} />
      <Row rowID='2' title='Popular' fetchURL={requests.requestPopular} />
      <Row rowID='3' title='Trending' fetchURL={requests.requestTrending} />
      <Row rowID='4' title='Top Rated' fetchURL={requests.requestTopRated} />
      <Row rowID='5' title='Horror' fetchURL={requests.requestHorror} />
      {/* <Row rowID='6' title='Setflix Originals' fetchURL={requests.requestSetflixOriginals} /> */}
      <TvRow rowID='6' title='Tv series' fetchTVURL={requests.requestTv} />
    </>
  )
}

export default Home