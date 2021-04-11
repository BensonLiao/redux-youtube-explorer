import React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components'
import AppBar from '../containers/AppBar'
import VideoGridList from '../containers/VideoGridList'
import Pagination from '../containers/Pagination'

const GlobalStyle = createGlobalStyle`
  body {
    background: lightgray;
    overflow-x: hidden;
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE and Edge */
    -ms-overflow-style: none;
    /* Hide scrollbar for Firefox */
    scrollbar-width: none;
  }
`

const Root = styled.div`
  width: 100vw;
  margin: auto;
`

const App = () => {
  return (
    <Root>
      <GlobalStyle />
      <AppBar/>
      <VideoGridList/>
      <Pagination/>
    </Root>
  )
}

App.propTypes = {
  videoList: PropTypes.shape({
    nextPageToken: PropTypes.string,
    prevPageToken: PropTypes.string,
    pageInfo: PropTypes.shape({
      totalResults: PropTypes.number,
      resultsPerPage: PropTypes.number
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
      kind: PropTypes.string,
      etag: PropTypes.string,
      id: PropTypes.shape({
        kind: PropTypes.string,
        videoId: PropTypes.string
      }),
      snippet: PropTypes.shape({
        publishedAt: PropTypes.string,
        channelId: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        thumbnails: PropTypes.shape({
          default: PropTypes.shape({
            url: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number
          }),
          medium: PropTypes.shape({
            url: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number
          }),
          high: PropTypes.shape({
            url: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number
          })
        }),
        channelTitle: PropTypes.string,
        liveBroadcastContent: PropTypes.string,
        publishTime: PropTypes.string
      })
    }))
  })
}

export default App
