<script>
export default {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        onSubmit(e) {
            if (!this.text) {
                alert("Please enter text for To Do item.")
                return
            } else {
                const newToDo = {
                    // because add is handled by posting to JSON server, id of the will be
                    // automatically assigned so assigning this can now be ignored
                    //id: Math.floor(Math.random() * 100000),
                    text: this.text,
                    complete: false,
                    date: new Date().toDateString(),
                    dateCompleted: false
                }
                // emit the added todo in a custom event when the input is filled with valid text
                this.$emit('add-todo', newToDo)
                // reset the bound text data variable after event emitted
                this.text = ''
            }
        }
    }
}
</script>

<template>
<form @submit.prevent="onSubmit">
    <div class="input-group">
        <!-- The input value of the form is bound to the text data variable -->
        <input v-model="text" type="text">
        <button type="submit" class="btn btn-sm btn-secondary mx-2">Add ToDo</button>
    </div>
</form>
</template>