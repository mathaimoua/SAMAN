import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchItems() {
  try {
    const response = yield axios.get('/api/items/recentItems')
    yield console.log('payload is', response.data)
    yield put({ type: 'SET_RECENT_ITEMS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* itemsSaga() {
  yield takeLatest('FETCH_RECENT_ITEMS', fetchItems);
}

export default itemsSaga;