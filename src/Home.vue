<script>
import ToDoList from './components/ToDoList.vue';
import AddToDo from './components/AddToDo.vue';
import EditToDo from './components/EditToDo.vue';

// only need for persisting todos from non-local API
//const API_URL = import.meta.env.VITE_API_URL;

export default {
  components: {
    ToDoList,
    AddToDo,
    EditToDo
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todosData")) || [],
      editMode: false,
      editToDo: null
      //endpoint: `${API_URL}`
    }
  },
  // computed todo totals
  computed: {
    totalToDos() {
      return this.todos.length;
    },
    pendingToDos() {
      return this.todos.filter(todo => !todo.complete).length;
    },
    completedToDos() {
      return this.todos.filter(todo => todo.complete).length;
    }
  },
  methods: {
    // 
    addToDo(toDo) {
      // old async addToDo code
      // const res = await fetch(this.endpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify(toDo)
      // })
      // const data = await res.json()
      // this.todos = [...this.todos, data]
      
      // give a unique id
      toDo.id = Date.now();
      toDo.complete = false;
      toDo.date = new Date().toDateString();
      toDo.dateCompleted = null;

      // add todo into data
      this.todos.push(toDo);

      // update local storage
      this.updateLocalStorage();
    },
    deleteToDo(toDoId) {
      // old async deleteToDo code
      // if (confirm("Deleting ToDo. Are you sure?")) {
      //   const res = await fetch(this.endpoint + toDoId,{
      //       method: 'DELETE'
      //     })
      //     res.status === 200 ? (this.todos = this.todos.filter((todo) => todo.id !== toDoId)) : alert('Error deleting todo.')
      // }
      if (confirm("Deleting ToDo item. Are you sure?")) {
        this.todos = this.todos.filter(todo => todo.id !== toDoId);
        // update local storage
        this.updateLocalStorage();
      }
    },
    handleEdit(toDo) {
      this.editMode = true;
      this.editToDo = { ...toDo };
    },
    submitEdit(editedToDo) {
      // old async submitEdit code
      // const res = await fetch(this.endpoint + editedToDo.id, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify(editedToDo)
      // })
      // const data = await res.json()

      this.todos = this.todos.map((todo) => todo.id === editedToDo.id ? { ...todo, text: editedToDo.text } : todo)
      // reset editMode and editToDo once edit done
      this.editMode = false;
      this.editToDo = null;    
      // update local storage
      this.updateLocalStorage();
    },
    toggleComplete(toDo) {
      // old async toggleComplete code
      // toDo.complete = !toDo.complete
      // toDo.dateCompleted = new Date().toDateString()

      // const res = await fetch(this.endpoint + toDo.id, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify(toDo)
      // })
      // const data = await res.json()

      this.todos = this.todos.map((tempToDo) => 
          tempToDo.id === toDo.id 
          ? {
              ...tempToDo, 
              complete: !tempToDo.complete, 
              dateCompleted: !tempToDo.complete ? new Date().toDateString() : null
            } 
          : tempToDo
        );
        // update localStorage
        this.updateLocalStorage();
    },
    // update localStorage helper method
    updateLocalStorage() {
      localStorage.setItem("todosData", JSON.stringify(this.todos));
    },
    // Updated: instead load todos from localStorage
    fetchToDos() {
      // (old) Rest API method
      // async fetchToDos() {}
      // because await is used on fetch, the method declaration needs to be async
      // const res = await fetch(this.endpoint)
      // const data = await res.json()
      // return data      
      const storedData = JSON.parse(localStorage.getItem("todosData"));
      if (storedData) {
        this.todos = storedData;
      }
    },
    clearAll() {
      if (confirm("Are you sure you want to clear all ToDo items?")) {
        this.todos = [];
        localStorage.removeItem("todosData");
      }
    }    
  },
  // async created() hook
  created() {
    // old async created hook code (awaiting the response from the fetch method)
    // this.todos = await this.fetchToDos()

    this.fetchToDos();

    // add some placeholder example todos for first-time users
    if (this.todos.length === 0) {
      this.todos = [
        {
          id: 1,
          text: "Work out",
          complete: true,
          date: "Sat Aug 9 2025",
          dateCompleted: "Thu Aug 21 2025"
        },
        {
          id: 2,
          text: "Practice guitar",
          complete: false,
          date: "Sat Aug 9 2025",
          dateCompleted: false
        },
        {
          id: 3,
          text: "Walk the dog",
          complete: false,
          date: "Sat Aug 9 2025",
          dateCompleted: false
        },
        {
          id: 4,
          text: "Read philosophy",
          complete: false,
          date: "Thu Aug 21 2025",
          dateCompleted: false
        },
        {
          id: 5,
          text: "Make ToDo List application in Vue.js",
          complete: true,
          date: "Thu Aug 21 2025",
          dateCompleted: "Thu Aug 21 2025"
        }        
      ];
    }
  }
}
</script>

<template>
<div class="container-xl">
  <div class="d-flex justify-content-between flex-nowrap">
    <!-- Add To Do input component -->
    <EditToDo v-if="editMode" :editToDo="editToDo" :key="editToDo.id" @submit-edit="submitEdit" />
    <AddToDo v-else @add-todo="addToDo" />
    <!-- Clear all todos button-->
    <button type="button" class="btn btn-sm btn-danger mx-2 clear-btn" @click="clearAll" :disabled="!todos.length">Clear All ToDos</button>
  </div>
</div>  
<div class="container-xl">
  <!--Computed properties element-->
  <div class="text-center">
    <h5 class="border border-secondary rounded-3 d-inline-block mt-3 mb-0 p-2">Total ToDos: {{ totalToDos }} | Pending: {{ pendingToDos }} | Completed: {{ completedToDos }}</h5>
  </div>  
  <!-- We can now handle the custom event emitted from the ToDoList component by referencing the event in a handler (v-on) -->
  <ToDoList :todos="todos" @delete-todo="deleteToDo" @edit-todo="handleEdit" @toggle-complete="toggleComplete"/>
</div>
</template>

<style scoped>
/* disabled icon for disabled clear all button */
.clear-btn:disabled {
  cursor: not-allowed !important;
  pointer-events: auto !important;
  border: 1px solid grey;
}
</style>