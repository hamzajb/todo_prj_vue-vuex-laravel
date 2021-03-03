<template>
  <div id="todo">
    <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
      <TodoHeader />
      <TodosList />
    </div>
    <Footer />
  </div>
</template>

<script>
import TodoHeader from "../components/todo/TodoHeader.vue";
import TodosList from "../components/todo/TodosList.vue";
import Footer from "../components/global/Footer";

export default {
  components: {
    TodoHeader,
    TodosList,
    Footer,
  },
};
</script>
<style>
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.6;
}

.add-todo-input,
.edit-todo-input {
  outline: none;
}

.add-todo-input:focus,
.edit-todo-input:focus {
  border: none !important;
  box-shadow: none !important;
}

.view-opt-label,
.date-label {
  font-size: 0.8rem;
}

.edit-todo-input {
  font-size: 1.7rem !important;
}

.todo-actions {
  visibility: hidden !important;
}

.todo-item:hover .todo-actions {
  visibility: visible !important;
}

.todo-item.editing .todo-actions .edit-icon {
  display: none !important;
}
</style>