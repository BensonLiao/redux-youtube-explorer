import { call, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { getPersistor } from '../configureStore'
import { REQUEST_SEARCH_VIDEO, loadData, clearData } from '../actions'

const persistor = getPersistor()
const REACT_APP_GAPI_KEY = process.env.REACT_APP_GAPI_KEY

// Example response
// {
//   "kind": "youtube#searchListResponse",
//   "etag": "4UhoBR1rpSXfYNTz71jYSIrlfeg",
//   "nextPageToken": "CBkQAA",
//   "regionCode": "TW",
//   "pageInfo": {
//     "totalResults": 1000000,
//     "resultsPerPage": 25
//   },
//   "items": [
//     {
//       "kind": "youtube#searchResult",
//       "etag": "U21Po-KMvdNZ7xiYZgqhPjinEps",
//       "id": {
//         "kind": "youtube#video",
//         "videoId": "ma67yOdMQfs"
//       },
//       "snippet": {
//         "publishedAt": "2021-01-23T17:00:15Z",
//         "channelId": "UC--3c8RqSfAqYBdDjIG3UNA",
//         "title": "These Were The All-Time Surfing Moments Of The Year | Best Of 2020",
//         "description": "Well, that was a weird ride. Though it hasn't been easy, at least when we fixed our gaze on the ocean — or favorite place in the world – very little had changed.",
//         "thumbnails": {
//           "default": {
//             "url": "https://i.ytimg.com/vi/ma67yOdMQfs/default.jpg",
//             "width": 120,
//             "height": 90
//           },
//           "medium": {
//             "url": "https://i.ytimg.com/vi/ma67yOdMQfs/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//           },
//           "high": {
//             "url": "https://i.ytimg.com/vi/ma67yOdMQfs/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//           }
//         },
//         "channelTitle": "Red Bull Surfing",
//         "liveBroadcastContent": "none",
//         "publishTime": "2021-01-23T17:00:15Z"
//       }
//     }
//   ]
// }

export function* fetchVideoList({
  keyword = 'surfing',
  page = 1,
  pageToken = null
}) {
  const result = yield axios
    .get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=24&q=${keyword}${pageToken ? `&pageToken=${pageToken}` : ''}&key=${REACT_APP_GAPI_KEY}`)
    .then(response => response.data)
    .catch(err => console.log('A fetch err occurs: ', err))
  if (result && result.items.length > 0) {
    result.page = page
  }
  return result
}

export function* requestFetchVideo(action) {
  const result = yield call(fetchVideoList, action.payload)
  yield put(loadData(result))
}

export default function* watchActions() {
  // We can run purge then a data clear action
  // yield all([call(persistor.purge), put(clearData())])
  yield takeLatest(REQUEST_SEARCH_VIDEO, requestFetchVideo)
}
