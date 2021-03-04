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
              class="custom-select custom-select-sm btn my-2"
              v-model="filter"
              @change="filterTodos(filter)"
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
                    v-if="todo.trashed != 1"
                    type="checkbox"
                    id="myCheckboxId"
                    :checked="checked(todo.completed)"
                    @change="updateTask(todo.id, 'completeStatus')"
                  />
                  <div class="todo_title" :style="completed(todo.completed)">
                    {{ todo.title | capitlize }}
                  </div>
                  <div
                    v-if="todo.trashed == 0"
                    class="float-right delete"
                    @click="updateTask(todo.id, 'trashed')"
                  >
                    <i class="far fa-trash-alt"></i>
                  </div>
                  <div
                    v-else
                    class="float-right restore"
                    @click="updateTask(todo.id, 'restored')"
                  >
                    <i class="fa fa-undo"></i>
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
    ...mapActions(["fetchTodos", "updateTodo", "filterTodos"]),
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
    updateTask(id, operation) {
      const todo = this.todos.find((el) => el.id == id);
      let toUpdate = {
        id: todo.id,
        title: todo.title,
      };
      if (operation == "completeStatus") {
        toUpdate.completed = todo.completed == 1 ? 0 : 1;
        toUpdate.trashed = todo.trashed;
      } else if (operation == "trashed") {
        toUpdate.completed = todo.completed;
        toUpdate.trashed = 1;
      } else {
        toUpdate.completed = todo.completed;
        toUpdate.trashed = 0;
      }
      this.updateTodo(toUpdate);
    },
  },
  computed: {
    ...mapGetters(["todos", "loading", "err"]),
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
.restore {
  cursor: pointer;
  .fa-undo:hover {
    color: green;
  }
}
</style>