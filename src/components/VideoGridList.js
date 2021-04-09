import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList'

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.toolbar,
  gridList: {
    width: '100vw',
    height: '100vh',
    justifyContent: 'center'
  },
}));


function VideoGridList({items, width}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {items && items.length > 0 ? (
        <GridList 
          className={classes.gridList}
          cols={width === 'xs' ? 2 : (width === 'sm' ? 3 : (width === 'md' ? 4 : 5))}
          spacing={16}
          style={{marginTop: '72px'}}
        >
          {items.map((item) => {
            return (
              <img
                key={item.id.videoId || item.id.channelId}
                src={item.snippet.thumbnails.medium.url}
                width={item.snippet.thumbnails.medium.width}
                height={item.snippet.thumbnails.medium.height}
                alt={item.snippet.title}
              />
            )
          })}
        </GridList>
      ) : (
        <div></div>
      )}
    </div>
  );
}

VideoGridList.propTypes = {
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

export default withWidth()(VideoGridList)