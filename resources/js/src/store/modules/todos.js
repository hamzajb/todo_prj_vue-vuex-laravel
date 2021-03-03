import axios from "axios";

const state = {
    todos: [],
    loading: true,
    err: false,
}
const getters = {
    alltodos: state => state.todos,
    loading: state => state.loading,
    err: state => state.err,
}
const actions = {
    async fetchTodos({ commit }) {
        await axios.get("http://127.0.0.1:8000/api/tasks/").then(res => { commit('setTodos', res.data); state.loading = false; }).catch(err => {
            state.loading = false;
            state.err = true;
            console.log(err);
        });
    },
    async addTodo({ commit }, todo) {
        await axios.post("http://127.0.0.1:8000/api/tasks/", todo).then(res => {
            commit('addTodo', res.data)
        }).catch(err => console.log(err));
    },
    async updateTodo({ commit }, updatedTodo) {
        await axios.put("http://127.0.0.1:8000/api/tasks/" + updatedTodo.id, updatedTodo).then(res => {
            commit('updateTodo', updatedTodo)
        }).catch(err => console.log(err));
    },
    async deleteTodo({ commit }, id) {
        await axios.delete("http://127.0.0.1:8000/api/tasks/" + id).then(res => {
            commit('deleteTodo', id)
        }).catch(err => console.log(err));
    }
}
const mutations = {
    setTodos: (state, data) => (state.todos = data),
    addTodo: (state, todo) => { state.todos.unshift(todo); },
    updateTodo: (state, updatedTodo) => state.todos.splice(state.todos.findIndex(el => el.id == updatedTodo.id), 1, updatedTodo),
    deleteTodo: (state, id) => state.todos.splice(state.todos.findIndex(el => el.id == id.id), 1)
}
export default {
    state,
    getters,
    actions,
    mutations
}