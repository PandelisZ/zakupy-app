const ADD_LIST = 'LIST/LIST/ADD_LIST';
const UPDATE_LIST = 'LIST/LIST/UPDATE_LIST';
const DELETE_LIST = 'LIST/LIST/DELETE_LIST';

const initialState = {
    lists: [
        'wow'
    ],
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LIST:
      return {
        lists: [
            ...state.lists,
            action.list
        ],
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
            lists: state.lists.filter(function(list) {
                return list.title != action.list.title;
            })
        }
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
