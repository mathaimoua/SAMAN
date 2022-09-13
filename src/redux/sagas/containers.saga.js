import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchContainers(action) {
  try {
    console.log('/api/containers/, id is', action.payload)
    const response = yield axios.get(`/api/containers/${action.payload}`)
    yield console.log('response is', response.data)
    yield put({ type: 'SET_CONTAINERS', payload: response.data });
  } catch (error) {
    console.log('Error in fetchContainers', error);
  }
}

function* createContainer(action) {
  try {
    // console.log('createContainers payload is', action.payload)
    yield axios.post('api/containers/', action.payload)
    yield put({ type: 'FETCH_CONTAINERS', payload: action.payload.location })
  } catch (error) {
    console.log('Error in createContainer', error)
  }
}

function* deleteContainer(action) {
  try {
    // yield console.log(action.payload.location)
    yield axios.delete( 'api/containers/' + action.payload.container )
    yield put({ type: 'FETCH_CONTAINERS', payload: action.payload.location })
  } catch (error) {
    console.log('Error in Container', error)
  }
}

function* setContainerName(action) {
  try {
    yield console.log('payload is', action.payload)
    yield axios.put( `api/containers/editname/${action.payload.id}`, action.payload )
    yield put({ type: 'FETCH_CONTAINERS', payload: action.payload.location })
  } catch (error) {
    console.log('Error in Container', error)
  }
}

function* fetchCurrentContainer(action) {
  try {
    // console.log('container payload is', action.payload)
    const response = yield axios.get( `api/containers/current/${action.payload}` )
    // console.log('response from fetchCurrentContainer', response.data[0])
    yield put({type: 'SET_CURRENT_CONTAINER', payload: response.data[0]})
  } catch (error) {
    console.log('Error in fetchCurrentContainer', error)
  }
}

function* containersSaga() {
  yield takeLatest('FETCH_CONTAINERS', fetchContainers);
  yield takeLatest('CREATE_CONTAINER', createContainer);
  yield takeLatest('DELETE_CONTAINER', deleteContainer);
  yield takeLatest('SET_CONTAINER_NAME', setContainerName);
  yield takeLatest('FETCH_CURRENT_CONTAINER', fetchCurrentContainer);
}

export default containersSaga;