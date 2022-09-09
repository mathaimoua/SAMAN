import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchMainLocation() {
  try {
    const response = yield axios.get('/api/locations/main')
    // yield console.log('payload is', response.data)
    yield put({ type: 'SET_MAIN_LOCATION', payload: response.data });
  } catch ( error ) {
    console.log('Error in fetchMainLocation', error);
  }
}

function* fetchLocations() {
  try {
    const response = yield axios.get( '/api/locations/' )
    // yield console.log( 'payload from fetchLocations', response.data )
    yield put({ type: 'SET_ALL_LOCATIONS', payload: response.data });
  } catch ( error ) {
    console.log('Error in fetchLocations', error);
  }
}

function* addLocation(action) {
  try {
    yield axios.post( '/api/locations/', {name: action.payload})
    // yield console.log( 'payload from fetchLocations', response.data )
    yield put({ type: 'LOAD_DATA' });
  } catch ( error ) {
    console.log('Error in addLocation', error);
  }
}

function* addFirstLocation(action) {
  try {
    yield axios.post( '/api/locations/', {name: action.payload})
    // yield console.log( 'payload from fetchLocations', response.data )
    const response = yield axios.get('/api/locations/')
    // console.log('location id is', response.data[0].location_id)
    yield axios.put( 'api/locations/makeactive/'+ response.data[0].location_id)
    yield put({ type: 'LOAD_DATA' });
  } catch ( error ) {
    console.log('Error in addFirstLocation', error);
  }
}

function* deleteLocation(action) {
  try {
    yield axios.delete( '/api/locations/' + action.payload)
    yield put({ type: 'LOAD_DATA' });
  } catch ( error ) {
    console.log('Error in deleteLocation', error);
  }
}

function* setLocationName(action) {
  try {
    yield axios.put( '/api/locations/' + action.payload.id, {name: action.payload.name})
    yield put({ type: 'LOAD_DATA' });
  } catch ( error ) {
    console.log('Error in setLocationName', error);
  }
}

function* mainLocationSaga() {
  yield takeEvery('FETCH_MAIN_LOCATION', fetchMainLocation);
  yield takeEvery('FETCH_ALL_LOCATIONS', fetchLocations);
  yield takeLatest('ADD_LOCATION', addLocation);
  yield takeLatest('ADD_FIRST_LOCATION', addFirstLocation)
  yield takeLatest('DELETE_LOC', deleteLocation)
  yield takeLatest('SET_LOCATION_NAME', setLocationName)
}

export default mainLocationSaga;