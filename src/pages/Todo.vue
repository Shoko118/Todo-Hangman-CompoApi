<template>
  <h1>this is the todo page</h1>
  <input
    type="text"
    placeholder="enter a list"
    v-model="newList"
    @keyup.enter.prevent="addButton"
  />
  <button @click.prevent="addButton">Add</button>
  <!-- loop todos -->
  <div
    v-for="(todo, index) in filterTodos"
    :key="index"
    :class="{ done: todo.completed }"
  >
    {{ todo.list }}
    <button @click.prevent="removeTodos(index)">X</button>
    <input type="checkbox" v-model="todo.completed" />
  </div>
  <!-- select options -->
  <select name="Filter" v-model="filters">
    <option value="All">All</option>
    <option value="Delete">Delete</option>
    <option value="Complete">Complete</option>
    <option value="Incomplete">Incomplete</option>
  </select>
</template>

<script>
import { computed, ref } from "vue";
export default {
  setup() {
    const newList = ref("");
    const deleteArray = ref([]);
    const filters = ref("All");
    const todos = ref([
      { list: "swimming", completed: false, incomplete: false },
      { list: "basketball", completed: false, incomplete: false },
      { list: "badminton", completed: false, incomplete: false },
      { list: "volleyball", completed: false, incomplete: false },
      { list: "hiking", completed: false, incomplete: false },
    ]);

    // computed
    const filterTodos = computed(() => {
      if (filters.value === "All") return todos.value;
      else if (filters.value === "Delete") return deleteArray.value;
      else if (filters.value === "Complete") {
        return todos.value.filter((todo) => todo.completed === true);
      } else if (filters.value === "Incomplete") {
        return todos.value.filter((todo) => todo.incomplete === false);
      }
    });

    // functions
    function addButton() {
      todos.value.push({
        list: newList.value,
      });
      newList.value = "";
    }

    function removeTodos(index) {
      deleteArray.value.push(todos.value[index]);
      todos.value.splice(index, 1);
    }

    return {
      newList,
      deleteArray,
      filters,
      todos,
      filterTodos,
      addButton,
      removeTodos,
    };
  },
};
</script>

<style>
.done {
  text-decoration: line-through;
  color: green;
}
</style>
