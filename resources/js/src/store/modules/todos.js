import axios from "axios";

const state = {
    getTodos: [],
    todos: [],
    loading: true,
    err: false,
    canAdd: true
}
const getters = {
    todos: state => state.todos,
    loading: state => state.loading,
    err: state => state.err,
    canAdd: state => state.canAdd,
}
const actions = {
    //cruds
    async fetchTodos({ commit }) {
        await axios.get("http://127.0.0.1:8000/api/tasks/").then(res => { commit('setTodos', res.data); this.dispatch('filterTodos', 'all'); state.loading = false; }).catch(err => {
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
            console.log(res.data);
            commit('updateTodo', updatedTodo)
        }).catch(err => console.log(err));
    },

    //filter getTodos
    filterTodos({ commit }, filter) {
        let todos = state.getTodos;
        if (filter == "all") {
            commit('filterTodos', todos.filter((el) => el.trashed == 0))
            state.canAdd = true;
        } else if (filter == "completed") {
            commit('filterTodos', todos.filter(
                (el) => el.completed == 1 && el.trashed == 0
            ));
            state.canAdd = false;
        } else if (filter == "incompleted") {
            commit('filterTodos', todos.filter(
                (el) => el.completed == 0 && el.trashed == 0
            ));
            state.canAdd = false;
        } else if (filter == "trashed") {
            commit('filterTodos', todos.filter((el) => el.trashed == 1));
            state.canAdd = false;
        }
    },
}
const mutations = {
    setTodos: (state, data) => (state.getTodos = data),
    addTodo: (state, todo) => {
        state.getTodos.unshift(todo);
        state.todos.unshift(todo);
    },
    updateTodo: (state, updatedTodo) => {
        state.getTodos.splice(state.getTodos.findIndex(el => el.id == updatedTodo.id), 1, updatedTodo);
        state.canAdd && updatedTodo.trashed == 0 ? state.todos.splice(state.todos.findIndex(el => el.id == updatedTodo.id), 1, updatedTodo) : state.todos.splice(state.todos.findIndex(el => el.id == updatedTodo.id), 1);
    },
    filterTodos: (state, todos) => (state.todos = todos),

}
export default {
    state,
    getters,
    actions,
    mutations
}