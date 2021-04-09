import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { usePagination } from '@material-ui/lab/Pagination';

import { keywordInputRef } from './AppBar';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  },
  li: {
    margin: '0 3px',
  },
  btn: {
    padding: 0,
    border: 0,
    borderRadius: '24px',
    width: '100%',
    minWidth: '40px',
    height: '40px'
  },
}));


export default function VideoListPagination({
  nextPageToken,
  prevPageToken,
  pageInfo: {
    totalResults,
    resultsPerPage
  },
  searchVideo
}) {
  const pageCount = Math.ceil(totalResults / resultsPerPage)
  const { items } = usePagination({
    count: pageCount,
  });
  const currentPageNumber = items.filter(({selected}) => selected === true)[0]?.page
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ul className={classes.ul}>
        {pageCount > 0 && items.map(({ page, type, selected, ...item }, index) => {
          let onClick = null;
          let children = null;
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          }
          
          if (type === 'page') {
            onClick = item.onClick;
            item.disabled = !selected &&
              page !== currentPageNumber - 1 &&
              page !== currentPageNumber + 1;
            item.onClick = () => {
              onClick();
              if (!selected) {
                searchVideo(
                  keywordInputRef.current.firstChild.value,
                  page === currentPageNumber + 1 ? nextPageToken : prevPageToken
                );
              }
            };
            children = (
              <ToggleButton
                className={classes.btn}
                selected={selected}
                style={{ fontWeight: selected ? 'bold' : undefined }}
                value={page}
                {...item}
              >
                {page}
              </ToggleButton>
            );
          }

          if (type === 'next') {
            onClick = item.onClick;
            item.disabled = !nextPageToken;
            item.onClick = () => {
              onClick();
              searchVideo(
                keywordInputRef.current.firstChild.value,
                nextPageToken
              );
            };
            children = (
              <IconButton className={classes.btn} {...item}>
                <NavigateNextIcon/>
              </IconButton>
            );
          }

          if (type === 'previous') {
            onClick = item.onClick;
            item.disabled = !prevPageToken;
            item.onClick = () => {
              onClick();
              searchVideo(
                keywordInputRef.current.firstChild.value,
                prevPageToken
              );
            };
            children = (
              <IconButton className={classes.btn} {...item}>
                <NavigateBeforeIcon/>
              </IconButton>
            );
          }

          return <li key={index} className={classes.li}>{children}</li>;
        })}
      </ul>
    </div>
  );
}

VideoListPagination.propTypes = {
  nextPageToken: PropTypes.string,
  prevPageToken: PropTypes.string,
  pageInfo: PropTypes.shape({
    totalResults: PropTypes.number,
    resultsPerPage: PropTypes.number
  }),
  searchVideo: PropTypes.func.isRequired
}