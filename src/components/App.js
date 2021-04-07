import React, { lazy } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme, cssConst, displayFlex, alignCenter } from '../styles'
import AppBar from '../containers/AppBar'

const GlobalStyle = createGlobalStyle`
  body {
    background: ${cssConst.desktopBackgroundGray};
  }
`

const Root = styled.div`
  ${displayFlex}
  ${alignCenter}
`

const App = ({ videoList }) => {
  console.log('videoList', videoList)
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <GlobalStyle />
        <AppBar/>
      </Root>
    </ThemeProvider>
  )
}

App.propTypes = {
  videoList: PropTypes.shape({
    nextPageToken: PropTypes.string,
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
