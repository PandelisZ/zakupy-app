
const ADD_LIST = 'LIST/LIST/ADD_LIST';
const UPDATE_LIST = 'LIST/LIST/UPDATE_LIST';
const DELETE_LIST = 'LIST/LIST/DELETE_LIST';
const RESET_LIST = 'LIST/LIST/RESET_LIST';
const SET_CURRENT_LIST = 'LIST/LIST/SET_CURRENT_LIST';

const initialState = {
    lists: [],
    currentList: {
        _id: undefined
    }
};

export default function listReducer(state = initialState, action) {

  switch (action.type) {
    case ADD_LIST:
      return {
        lists: [
            ...state.lists,
            action.list
        ],
        currentList: action.list
      };
    case SET_CURRENT_LIST:
        return {
            ...state,
            currentList: action.list
        };
    case UPDATE_LIST:
        let lists = [...state.lists];
        let indexOfUpdate = lists.findIndex((list) =>{
            return list.title == action.list.title;
        });
        lists[indexOfUpdate] = action.list;
        return {
            ...state,
            lists: lists,
        }
    case DELETE_LIST:
        return {
            ...state,
            lists: state.lists.filter(function(list) {
                return list.title != action.list.title;
            })
        }
    case RESET_LIST:
        return initialState
    default:
      return state;
  }
}

export function addList(list) {
    return {
        type: ADD_LIST,
        list,
    };
}

export function updateList(list){
    return {
        type: UPDATE_LIST,
        list,
    }
}

export function deleteList(list){
    return {
        type: DELETE_LIST,
        list,
    }
}

export function resetList(){
    return {
        type: RESET_LIST
    }
}

export function setCurrentList(list){
    return {
        type: SET_CURRENT_LIST,
        list
    }
}

