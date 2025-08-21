<script>
import ToDoList from './components/ToDoList.vue';
import AddToDo from './components/AddToDo.vue';
import EditToDo from './components/EditToDo.vue';

const API_URL = import.meta.env.VITE_API_URL;

export default {
  components: {
    ToDoList,
    AddToDo,
    EditToDo
  },
  data() {
    return {
      todos: [],
      editMode: false,
      editToDo: null,
      endpoint: `${API_URL}`
    }
  },
  // computed todo totals
  computed: {
    totalToDos() {
      return this.todos.length;
    },
    pendingToDos() {
      return this.todos.filter(
        todo => {return !todo.complete}
      ).length;
    },
    completedToDos() {
      return this.todos.filter(
        todo => {return todo.complete}
      ).length
    }
  },
  // created() {
  //   this.todos = []
  //   // below is redundant, non-persistent todos array before rest API implemented 
  //   // [
  //   //   {
  //   //     id: 1,
  //   //     text: "finishing writing Vue book",
  //   //     complete: false,
  //   //     date: new Date().toDateString(),
  //   //     dateCompleted: null
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     text: "workout",
  //   //     complete: false,
  //   //     date: new Date().toDateString(),
  //   //     dateCompleted: null
  //   //   },
  //   //   {
  //   //     id: 3,
  //   //     text: "buy christmas presents",
  //   //     complete: false,
  //   //     date: new Date().toDateString(),
  //   //     dateCompleted: null
  //   //   }            
  //   // ]
  // },
  methods: {
    async addToDo(toDo) {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(toDo)
      })
      const data = await res.json()
      this.todos = [...this.todos, data]
    },
    // old add todo method before Rest API implemented
    // addToDo(toDo) {
    //   this.todos = [...this.todos, toDo]
    // },
    // Rest API async deletion method
    async deleteToDo(toDoId) {
      if (confirm("Deleting ToDo. Are you sure?")) {
        const res = await fetch(this.endpoint + toDoId,{
            method: 'DELETE'
          })
          res.status === 200 ? (this.todos = this.todos.filter((todo) => todo.id !== toDoId)) : alert('Error deleting todo.')
      }
    },
    // old delete todo method before Rest API implemented
    // deleteToDo(toDoId) {
    //   if (confirm("This To Do item will be deleted. Are you sure?")) {
    //     this.todos = this.todos.filter((todo) => todo.id !== toDoId)
    //   }
    // },
    handleEdit(toDo) {
      this.editMode = true
      this.editToDo = toDo
    },
    async submitEdit(editedToDo) {
      const res = await fetch(this.endpoint + editedToDo.id, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(editedToDo)
      })
      const data = await res.json()

      this.todos = this.todos.map((todo) => todo.id === editedToDo.id ? {...todo, text: data.text} : todo)
      // reset editMode and editToDo once edit done
      this.editMode = false
      this.editToDo = null      
    },
    // old submitEdit method before Rest API implemented
    // submitEdit(editedToDo) {
    //   this.todos = this.todos.map(
    //     (todo) => todo.id === editedToDo.id ? {...todo, text: editedToDo.text} : todo
    //   )
    //   // reset editMode and editToDo once edit done
    //   this.editMode = false
    //   this.editToDo = null
    // },
    // Rest API method
    async fetchToDos() {
      // because await is used on fetch, the method declaration needs to be async
      const res = await fetch(this.endpoint)
      const data = await res.json()
      return data
    },
    async toggleComplete(toDo) {
      toDo.complete = !toDo.complete
      toDo.dateCompleted = new Date().toDateString()

      const res = await fetch(this.endpoint + toDo.id, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(toDo)
      })
      const data = await res.json()

      this.todos = this.todos.map((tempToDo) => tempToDo.id === toDo.id 
        ? {...tempToDo, complete: data.complete, dateCompleted: data.dateCompleted} : tempToDo)
    }
  },
  // async created() hook as we are awaiting the response from the fetch method
  async created() {
    this.todos = await this.fetchToDos()
  }
}
</script>

<template>
<div>
  <!-- Add To Do input component -->
  <EditToDo v-if="editMode" :editToDo="editToDo" :key="editToDo.id" @submit-edit="submitEdit" />
  <AddToDo v-else @add-todo="addToDo" />
  <!--Computed properties element-->
  <div class="text-center">
    <h5 class="border border-secondary rounded-3 d-inline-block mt-3 mb-0 p-2">Total ToDos: {{ totalToDos }} | Pending: {{ pendingToDos }} | Completed: {{ completedToDos }}</h5>
  </div>  
  <!-- We can now handle the custom event emitted from the ToDoList component by referencing the event in a handler (v-on) -->
  <ToDoList :todos="todos" @delete-todo="deleteToDo" @edit-todo="handleEdit" @toggle-complete="toggleComplete"/>
</div>
</template>