import axios from 'axios'

const ENDPOINT = 'https://polar-woodland-18362.herokuapp.com/api/'

export default {
    list: {
        create: async function(list) {
            return axios.post(ENDPOINT + `list`, list)
        },
        read: async function(id) {
            return axios.get(ENDPOINT + `list/${id}`)
        },
        all: async function() {
            return axios.get(ENDPOINT + 'list')
        }
    },
    item: {
        create: async function(listId, item) {
            return axios.post(ENDPOINT + `list/${listId}/item`, item)
        },
        update: async function(listId, itemId, item) {
            return axios.put(ENDPOINT + `list/${listId}/item/${itemId}`, item)
        },
        delete: async function(listId, itemId) {
            return axios.delete(ENDPOINT + `list/${listId}/item/${itemId}`)
        },
    }
}
