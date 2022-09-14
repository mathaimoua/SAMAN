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

function* fetchContainerItems(action) {
  try {
    // yield console.log('container id is', action.payload)
    const response = yield axios.get(`/api/items/${action.payload}`)
    // yield console.log('payload is', response.data)
    yield put({ type: 'SET_CONTAINER_ITEMS', payload: response.data });
  } catch (error) {
    console.log('Error in fetchItems', error);
  }
}

function* deleteItem(action) {
  try {
    yield axios.delete(`api/items/${action.payload.deleteID}`)
    yield put({ type: 'FETCH_CONTAINER_ITEMS', payload: action.payload.container
    })
  } catch (error) {
    console.log('Error in deleteItem', error)
  }
}

function* fetchCurrentItem(action) {
  try {
    console.log(action.payload)
    const response = yield axios.get(`api/items/current/${action.payload}`)
    // yield console.log('response from fetchCurrentItem', response.data)
    yield put({type: 'SET_CURRENT_ITEM', payload: response.data[0]})
  } catch (error) {
    console.log('Error in fetchCurrentItem', error)
  }
}

function* editItem(action) {
  try {
    // console.log('sending', action.payload)
    yield axios.put(`api/items/${action.payload.id}`, action.payload)
  } catch (error) {
    console.log('Error in fetchEditItem', error)
  }
}

function* addNewItemC(action) {
  try {
    yield axios.post(`api/items/${action.payload.containerID}`, action.payload.itemInfo)
  } catch (error) {
    console.log('Error in addNewItemC', error)
  }
}

function* fetchAllItems(){
  try {
    const response = yield axios.get(`api/items/viewall`)
    yield put({type: 'SET_ALL_ITEMS', payload: response.data})
  } catch (error) {
    console.log('Error in fetchAllItems', error)
  }
}

function* searchItems(action){
  try {
    const response = yield axios.get(`api/items/search/${action.payload}`)
    yield put({type: 'SET_SEARCH_ITEMS', payload: response.data})
  } catch (error) {
    console.log('Error in fetchAllItems', error)
  }
}

function* itemsSaga() {
  yield takeLatest('FETCH_RECENT_ITEMS', fetchRecentItems);
  yield takeLatest('FETCH_CONTAINER_ITEMS', fetchContainerItems);
  yield takeLatest('DELETE_ITEM', deleteItem);
  yield takeLatest('FETCH_CURRENT_ITEM', fetchCurrentItem)
  yield takeLatest('EDIT_ITEM', editItem);
  yield takeLatest('ADD_NEW_ITEM_C', addNewItemC)
  yield takeLatest('FETCH_ALL_ITEMS', fetchAllItems)
  yield takeLatest('SEARCH_ITEMS', searchItems)
}

export default itemsSaga;