import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchMainLocation() {
  try {
    const response = yield axios.get('/api/locations/main')
    // yield console.log('payload is', response.data)
    yield put({ type: 'SET_MAIN_LOCATION', payload: response.data });
  } catch ( error ) {
    // console.log('User get request failed', error);
  }
}

function* fetchLocations() {
  try {
    const response = yield axios.get( '/api/locations/' )
    // yield console.log( 'payload from fetchLocations', response.data )
    yield put({ type: 'SET_ALL_LOCATIONS', payload: response.data });
  } catch ( error ) {
    // console.log('User get request failed', error);
  }
}

function* addLocation(action) {
  try {
    yield axios.post( '/api/locations/', {name: action.payload})
    // yield console.log( 'payload from fetchLocations', response.data )
    yield put({ type: 'LOAD_DATA' });
  } catch ( error ) {
    // console.log('User get request failed', error);
  }
}

function* mainLocationSaga() {
  yield takeEvery('FETCH_MAIN_LOCATION', fetchMainLocation);
  yield takeEvery('FETCH_ALL_LOCATIONS', fetchLocations);
  yield takeLatest('ADD_LOCATION', addLocation);
}

export default mainLocationSaga;