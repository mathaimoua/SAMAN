import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchRecentItems() {
  try {
    const response = yield axios.get('/api/items/recentItems')
    // yield console.log('payload is', response.data)
    yield put({ type: 'SET_RECENT_ITEMS', payload: response.data });
  } catch (error) {
    // console.log('User get request failed', error);
  }
}

function* fetchItems(action) {
  try {
    // yield console.log(action.payload)
    const response = yield axios.get(`/api/items/${action.payload}`)
    // yield console.log('payload is', response.data)
    yield put({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.log('Error in fetchItems', error);
  }
}

function* itemsSaga() {
  yield takeLatest('FETCH_RECENT_ITEMS', fetchRecentItems);
  yield takeLatest('FETCH_ITEMS', fetchItems);
}

export default itemsSaga;