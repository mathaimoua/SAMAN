import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchContainers(action) {
  try {
    console.log('/api/containers/', action.payload.id)
    const response = yield axios.get(`/api/containers/${action.payload.id}`)
    // yield console.log('payload is', response.data)
    yield put({ type: 'SET_CONTAINERS', payload: response.data });
  } catch (error) {
    console.log('Error in fetchContainers', error);
  }
}

function* containersSaga() {
  yield takeLatest('FETCH_CONTAINERS', fetchContainers);
}

export default containersSaga;