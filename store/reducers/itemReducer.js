import api from '../../api'
import uuidv1 from 'uuid/v1';

const ADD_ITEM = 'ITEM/ITEM/ADD_ITEM';
const UPDATE_ITEM = 'ITEM/ITEM/UPDATE_ITEM';
const DELETE_ITEM = 'ITEM/ITEM/DELETE_ITEM';
const GET_ALL_ITEMS = 'LIST/ITEM/GET_ALL_ITEMS';

const initialState = {
    items: [],
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
        console.log(state)
      return {
        items: [
            ...state.items,
            action.item
        ],
      };
    case UPDATE_ITEM:
        let items = [...state.items];
        let indexOfUpdate = items.findIndex((item) =>{
            return item.title == action.item.title;
        });
        items[indexOfUpdate] = action.item;
        return {
            ...state,
            items: items,
        }
    case DELETE_ITEM:
        return {
            items: state.items.filter(function(item) {
                return item.title != action.item.title;
            })
        }
    case GET_ALL_ITEMS:
        return {
            items: state.items.filter(function(item) {
                return item.listId === action.listId
            })
        }
    default:
      return state;
  }
}

export function addItem(item) {

        api.item.create(item.listId, {
            ...item,
            _id: uuidv1()
        })
        return{
            type: ADD_ITEM,
            item,
        }
}



export function updateItem(item){
    return {
        type: UPDATE_ITEM,
        item,
    }
}

export function deleteItem(item){
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
