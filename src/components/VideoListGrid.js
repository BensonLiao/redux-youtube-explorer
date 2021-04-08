import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList'

const useStyles = makeStyles(() => ({
  gridList: {
    width: '100vw',
    height: '100vh',
  },
}));

export default function VideoListGrid({items}) {
  console.log('items', items)
  const classes = useStyles();
  return items && items.length > 0 ? (
    <GridList className={classes.gridList} cols={3} spacing={16}>
      {items.map((item) => {
        return (
          <img
            key={item.id.videoId || item.id.channelId}
            src={item.snippet.thumbnails.default.url}
            alt={item.snippet.title}
          />
        )
      })}
    </GridList>
  ) : (
    <div>empty result</div>
  );
}

VideoListGrid.propTypes = {
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
}