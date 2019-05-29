import api from '../../api'
import uuidv1 from 'uuid/v1';

const ADD_ITEM = 'ITEM/ITEM/ADD_ITEM';
const UPDATE_ITEM = 'ITEM/ITEM/UPDATE_ITEM';
const DELETE_ITEM = 'ITEM/ITEM/DELETE_ITEM';
const GET_ALL_ITEMS = 'LIST/ITEM/GET_ALL_ITEMS';
const RESET_ITEMS = 'ITEM/ITEM/RESET_ITEMS';
const REQUEST_ITEMS = 'LIST/ITEM/REQUEST_ITEMS';
const RECEIVE_ITEMS = 'LIST/ITEM/RECEIVE_ITEMS';

const initialState = {
    isFetching: false
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
        if (state[action.item.listId]) {
            return {
                ...state,
              [action.item.listId]: [
                  ...state[action.item.listId],
                  action.item
              ],
            };
        } else {
            return {
                ...state,
              [action.item.listId]: [
                  action.item
              ],
            };
        }

    case UPDATE_ITEM:
        let items = [...state[action.item.listId]];
        let indexOfUpdate = items.findIndex((item) =>{
            return item.title == action.item.title;
        });
        items[indexOfUpdate] = action.item;
        return {
            ...state,
            [action.item.listId]: items
        }
    case DELETE_ITEM:
        return {
            ...state,
            [action.item.listId]: state[action.item.listId].filter(function(item) {
                return item.title != action.item.title;
            })
        }
    case GET_ALL_ITEMS:
        return state[action.item.listId]
    case RESET_ITEMS:
        return initialState
    case REQUEST_ITEMS:
    case RECEIVE_ITEMS:
      return {
        ...state,
        [action.listId]: executeItemsRequest(state, action).items
      }
    default:
      return state;
  }
}

function executeItemsRequest(
    state = {
      isFetching: false,
      items: []
    },
    action
  ) {
    switch (action.type) {
      case REQUEST_ITEMS:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case RECEIVE_ITEMS:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.items,
        })
      default:
        return state
    }
  }

export function addItem(item) {

        api.item.create(item.listId, {
            ...item,
            _id: uuidv1()
        })
        return {
            type: ADD_ITEM,
            item,
        }
}


export function requestsItemsFromApi(listId){
    return {
        type: REQUEST_ITEMS,
        listId
    }
}

export function receiveItemsFromApi(listId, items) {
    return {
        type: RECEIVE_ITEMS,
        items: items.map(i => {
            return {
                ...i,
                listId
            }
        }),
        listId,
    }
}

function fetchItems(listId) {
    return function (dispatch) {
        dispatch(requestsItemsFromApi(listId))
        return api.list.read(listId).then((response) => {
            dispatch(receiveItemsFromApi(listId, response.data.data.items))
        })
    }
}

function shouldFetchItems(state, listId) {
    const items = state[listId]
    if (!items) {
        return true
    } else if (state.isFetching) {
        return false
    }
}

export function fetchItemsIfNeeded(listId) {
    return (dispatch, getState) => {
        if (shouldFetchItems(getState(), listId)) {
                return dispatch(fetchItems(listId))
            }
        }
}

export function updateItem(item){
    api.item.update(item.listId, item._id, item)
    return {
        type: UPDATE_ITEM,
        item,
    }
}

export function deleteItem(item){
    api.item.delete(item.listId, item._id)
    return {
        type: DELETE_ITEM,
        item,
    }
}

export function getAllItemsForList(listId){
    return {
        type: GET_ALL_ITEMS,
        listId,
    }
}

export function resetItems(){
    return {
        type: RESET_ITEMS
    }
}
