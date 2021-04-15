import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.toolbar,
  gridList: {
    width: '100vw',
    height: '100%',
    justifyContent: 'center',
    display: 'grid',
    gridGap: theme.spacing(2),
    marginTop: '72px',
  },
  videoItem: {
    display: 'block',
  },
}))

function VideoGridList({ items, width }) {
  const classes = useStyles()
  const cols = width === 'xs' ? 1 : width === 'sm' ? 2 : width === 'md' ? 3 : 4
  return (
    <div className={classes.root}>
      {items && items.length > 0 ? (
        <div
          className={classes.gridList}
          style={{
            gridTemplateColumns: `repeat(${cols}, 
              ${items[0].snippet.thumbnails.medium.width}px)`,
          }}
        >
          {items.map(item => {
            return (
              <div key={item.id.videoId} className={classes.videoItem}>
                <a href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    width={item.snippet.thumbnails.medium.width}
                    height={item.snippet.thumbnails.medium.height}
                    alt={item.snippet.title}
                  />
                </a>
                <span
                  dangerouslySetInnerHTML={{ __html: item.snippet.title }}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

VideoGridList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.string,
      etag: PropTypes.string,
      id: PropTypes.shape({
        kind: PropTypes.string,
        videoId: PropTypes.string,
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
            height: PropTypes.number,
          }),
          medium: PropTypes.shape({
            url: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number,
          }),
          high: PropTypes.shape({
            url: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number,
          }),
        }),
        channelTitle: PropTypes.string,
        liveBroadcastContent: PropTypes.string,
        publishTime: PropTypes.string,
      }),
    })
  ),
}

export default withWidth()(VideoGridList)
