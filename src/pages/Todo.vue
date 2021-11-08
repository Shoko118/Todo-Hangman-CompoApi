<template>
  <h1>this is the todo page</h1>
  <!-- input of text -->
  <input
    type="text"
    placeholder="enter a list"
    v-model="newList"
    @keyup.enter.prevent="addButton"
  />
  <!-- input of number -->
  <input
    type="number"
    placeholder="enter rating"
    v-model="newRating"
    min="1"
    max="5"
  />
  <button @click.prevent="addButton">Add</button>
  <button v-if="deleteArray.length > 0" @click.prevent="undoDeletedTodos">
    Undo deleted todos
  </button>
  <!-- loop todos =========-->
  <div
    v-for="(todo, index) in filterTodos"
    :key="index"
    :class="{ done: todo.completed }"
  >
    <b>Rating</b>: {{ todo.rating }}
    {{ todo.list }}
    <button @click.prevent="removeTodos(index)">X</button>
    <input type="checkbox" v-model="todo.completed" />
  </div>
  <!-- select options============== -->
  <select name="Filter" v-model="filters">
    <option value="All">All</option>
    <option value="Delete">Delete</option>
    <option value="Complete">Complete</option>
    <option value="Incomplete">Incomplete</option>
    <option value="ratingAscend">Sort ascend by importance</option>
  </select>
</template>

<script>
import { computed, ref } from "vue";
export default {
  setup() {
    const newList = ref("");
    const newRating = ref(1);
    let deleteArray = ref([]);
    const filters = ref("All");
    const todos = ref([
      { rating: 1, list: "swimming", completed: false, incomplete: false },
      { rating: 2, list: "basketball", completed: false, incomplete: false },
      { rating: 3, list: "badminton", completed: false, incomplete: false },
    ]);

    // computed ============
    const filterTodos = computed(() => {
      if (filters.value === "All") return todos.value;
      else if (filters.value === "Delete") return deleteArray.value;
      else if (filters.value === "Complete") {
        return todos.value.filter((todo) => todo.completed === true);
      } else if (filters.value === "Incomplete") {
        return todos.value.filter((todo) => todo.incomplete === false);
      } else if (filters.value === "ratingAscend") {
        return todos.value.sort((a, b) => a.rating - b.rating);
      }
    });

    // functions============
    function addButton() {
      todos.value.push({
        list: newList.value,
        rating: newRating.value,
      });
      newList.value = "";
    }

    function removeTodos(index) {
      deleteArray.value.push(todos.value[index]);
      todos.value.splice(index, 1);
    }

    function undoDeletedTodos() {
      deleteArray.value.forEach((todo) => {
        todos.value.push(todo);
      });
      deleteArray.value = [];
    }

    return {
      newList,
      newRating,
      deleteArray,
      filters,
      todos,
      filterTodos,
      addButton,
      removeTodos,
      undoDeletedTodos,
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
