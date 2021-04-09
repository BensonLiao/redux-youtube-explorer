import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { usePagination } from '@material-ui/lab/Pagination';

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
  pageInfo: {
    totalResults,
    resultsPerPage
  }
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
          let children = null;
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          }
          
          if (type === 'page') {
            item.disabled = page !== currentPageNumber &&
              page !== currentPageNumber - 1 &&
              page !== currentPageNumber + 1;
            children = (
              <ToggleButton
                className={classes.btn}
                selected={selected}
                style={{ fontWeight: selected ? 'bold' : undefined }}
                {...item}
              >
                {page}
              </ToggleButton>
            );
          }

          if (type === 'next') {
            item.disabled = !nextPageToken;
            children = (
              <IconButton
                className={classes.btn}
                disabled={!nextPageToken}
                {...item}
              >
                <NavigateNextIcon/>
              </IconButton>
            );
          }

          if (type === 'previous') {
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
  pageInfo: PropTypes.shape({
    totalResults: PropTypes.number,
    resultsPerPage: PropTypes.number
  })
}