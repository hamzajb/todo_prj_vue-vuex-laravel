<template>
  <div class="TodosList">
    <center v-if="loading">Loading...</center>
    <center v-else-if="err">Sorry error server</center>
    <div v-else>
      <div class="AllTodos">
        <!-- View options section -->
        <div class="row m-1 p-3 px-5 justify-content-end">
          <div class="col-auto d-flex align-items-center">
            <label class="text-secondary my-2 pr-2 view-opt-label"
              >Filter</label
            >
            <select
              v-model="filter"
              class="custom-select custom-select-sm btn my-2"
            >
              <option>all</option>
              <option>completed</option>
              <option>incompleted</option>
              <option>trashed</option>
            </select>
          </div>
        </div>
        <!-- Todo list section -->
        <div class="row mx-1 px-5 pb-3 w-80">
          <div class="col mx-auto">
            <div class="row px-3 align-items-center todo-item editing rounded">
              <div v-for="todo in todos" :key="todo.id" class="card w-100 m-2">
                <div class="card-body">
                  <input
                    type="checkbox"
                    id="myCheckboxId"
                    :checked="checked(todo.completed)"
                    @change.prevent="updateTask(todo.id)"
                  />
                  <div class="todo_title" :style="completed(todo.completed)">
                    {{ todo.title | capitlize }}
                  </div>
                  <div class="float-right delete" @click.prevent="">
                    <i class="far fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      filter: "all",
    };
  },
  filters: {
    capitlize: (v) => v.charAt(0).toUpperCase() + v.slice(1),
  },
  methods: {
    ...mapActions(["fetchTodos", "updateTodo", "deleteTodo"]),
    completed(isCompleted) {
      if (isCompleted == 1) {
        return "text-decoration: line-through;";
      }
    },
    checked(isCompleted) {
      if (isCompleted == 1) {
        return true;
      }
    },
    updateTask(id) {
      const todo = this.alltodos.find((el) => el.id == id);
      const toUpdate = {
        id: todo.id,
        title: todo.title,
        completed: todo.completed == 1 ? 0 : 1,
      };

      this.updateTodo(toUpdate);
    },
  },
  computed: {
    ...mapGetters(["alltodos", "loading", "err", "newValue"]),
    todos() {
      if (this.filter == "all") return this.alltodos;
      else if (this.filter == "completed") {
        return this.alltodos.filter((el) => el.completed == 1);
      } else if (this.filter == "incompleted") {
        return this.alltodos.filter((el) => el.completed == 0);
      } else {
        return this.alltodos.filter((el) => el.trashed == 1);
      }
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>

<style lang="scss" scoped>
.todo_title {
  display: inline;
}
.delete {
  cursor: pointer;
  .fa-trash-alt:hover {
    color: red;
  }
}
</style>