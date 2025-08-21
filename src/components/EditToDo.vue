<script>
export default {
    props: {
        editToDo: null
    },
    data() {
        return {
            text: ''
        }
    },
    methods: {
        onSubmit(e) {
            if (!this.text) {
                alert("Please enter ToDo text.")
                return
            } else {
                const editedToDo = {
                    ...this.editToDo,
                    text: this.text
                }
                // emit the edited todo in a custom event when the input is filled with valid text
                this.$emit('submit-edit', editedToDo)
                // reset the bound text data variable after event emitted
                this.text = ''
            }
        }
    },
    created() {
        this.text = this.editToDo.text
    },
    emits: [
        'submit-edit'
    ]
}
</script>

<template>
<form @submit.prevent="onSubmit">
    <div class="input-group">
        <input v-model="text" type="text">
        <button type="submit" class="btn btn-sm btn-secondary mx-2">Edit ToDo</button>    
    </div>
</form>
</template>