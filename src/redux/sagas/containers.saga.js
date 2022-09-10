import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchContainers(action) {
  try {
    // console.log('/api/containers/', action.payload.id)
    const response = yield axios.get(`/api/containers/${action.payload.id}`)
    // yield console.log('payload is', response.data)
    yield put({ type: 'SET_CONTAINERS', payload: response.data });
  } catch (error) {
    console.log('Error in fetchContainers', error);
  }
}

function* createContainer(action) {
  try {
    yield axios.post('api/containers/', action.payload)
    yield put({ type: 'FETCH_CONTAINERS', payload: {id: action.payload.location} })
  } catch (error) {
    console.log('Error in createContainer', error)
  }
}

function* deleteContainer(action) {
  try {
    // yield console.log(action.payload.location)
    yield axios.delete( 'api/containers/' + action.payload.container )
    yield put({ type: 'FETCH_CONTAINERS', payload: {id: action.payload.location} })
  } catch (error) {
    console.log('Error in Container', error)
  }
}

function* setContainerName(action) {
  try {
    // yield console.log('payload is', action.payload)
    yield axios.put( 'api/containers/editname/' + action.payload.id, action.payload )
    yield put({ type: 'FETCH_CONTAINERS', payload: {id: action.payload.location} })
  } catch (error) {
    console.log('Error in Container', error)
  }
}

function* containersSaga() {
  yield takeLatest('FETCH_CONTAINERS', fetchContainers);
  yield takeLatest('CREATE_CONTAINER', createContainer);
  yield takeLatest('DELETE_CONTAINER', deleteContainer);
  yield takeLatest('SET_CONTAINER_NAME', setContainerName);
}

export default containersSaga;