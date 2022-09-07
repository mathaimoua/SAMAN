import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMainLocation() {
  try {
    const response = yield axios.get('/api/locations/main')
    yield console.log('payload is', response.data)
    yield put({ type: 'SET_MAIN_LOCATION', payload: response.data.location_name });
  } catch (error) {
    // console.log('User get request failed', error);
  }
}

function* mainLocationSaga() {
  yield takeLatest('FETCH_MAIN_LOCATION', fetchMainLocation);
}

export default mainLocationSaga;