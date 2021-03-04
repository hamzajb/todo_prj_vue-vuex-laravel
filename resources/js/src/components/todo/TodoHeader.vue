<template>
  <div id="TodoHeader">
    <!-- App title section -->
    <div class="row m-1 p-4">
      <div class="col">
        <div
          class="p-1 h1 text-primary text-center mx-auto display-inline-block"
        >
          <i class="fa fa-check bg-primary text-white rounded p-2"></i>
          <u>My Todo-s</u>
        </div>
      </div>
    </div>
    <!-- Create todo section -->
    <div class="row m-1 p-3">
      <div class="col col-11 mx-auto">
        <div
          class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center"
        >
          <div class="col">
            <input
              class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
              type="text"
              :placeholder="placeholderText"
              v-model="title"
              :disabled="!canAdd"
              :style="cursol"
            />
          </div>
          <div class="col-auto px-0 mx-0 mr-2">
            <button
              @click.prevent="addNewTodo"
              class="btn btn-primary"
              :disabled="!canAdd"
              :style="cursol"
            >
              Add task
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="p-2 mx-4 border-black-25 border-bottom"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    addNewTodo: function () {
      const newTodo = {
        title: this.title,
        completed: 0,
        trashed: 0,
      };
      this.addTodo(newTodo);
      this.title = "";
    },
  },
  computed: {
    ...mapGetters(["canAdd"]),
    placeholderText() {
      return this.canAdd
        ? "Add new .."
        : "Back to all in filter to add new task";
    },
    cursol() {
      return this.canAdd ? "cursor: pointer" : "cursor: not-allowed";
    },
  },
};
</script>