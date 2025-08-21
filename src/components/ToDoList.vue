<script>
export default {
    props: {
        todos: Array
    },
    // we can use the emits property to create custom events
    emits:[
        'delete-todo', 
        'edit-todo',
        'toggle-complete'
    ]
}
</script>

<template>
    <div>
        <!--Pending ToDo List-->
        <h3 class="mb-2">Pending</h3>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">To Do</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Complete</th>
                    <th scope="col">Edit</th>
                    <th scope="col" v-on:click="">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in todos" :key="todo.id">
                    <template v-if="!todo.complete" >
                    <th scope="row">{{ todo.text }}</th>
                    <td>{{ todo.date }}</td>
                    <td>
                        <button @click="$emit('toggle-complete', todo)" class="btn btn-sm btn-success">
                            Complete
                        </button>
                    </td>
                    <td>
                        <!-- we use a custom even edit-todo, and the $emit method, to trigger the edit-todo event,
                         with the incident todo object to edit being passed as the second argument -->
                        <button class="btn btn-sm btn-warning" @click="$emit('edit-todo', todo)">
                            Edit
                        </button>
                    </td>
                    <td>
                        <!-- we use the custom event delete-todo, and the $emit method, to trigger the delete-todo event.
                         any arguments passed after the event name are passed as parameters to any listening callback (todo.id in this case) -->
                        <button class="btn btn-sm btn-danger" @click="$emit('delete-todo', todo.id)">
                            Delete
                        </button>
                    </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <!--Completed ToDo List-->
        <h3 class="mb-2">Completed</h3>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">To Do</th>
                    <th scope="col">Date Completed</th>
                    <th scope="col">Incomplete</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in todos" :key="todo.id">
                    <template v-if="todo.complete">
                        <th scope="row">{{ todo.text }}</th>
                        <td>{{ todo.dateCompleted }}</td>
                        <td>
                            <button class="btn btn-sm btn-success" @click="$emit('toggle-complete', todo)">
                                Incomplete
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="$emit('delete-todo', todo.id)">
                                Delete
                            </button>
                        </td>                        
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>