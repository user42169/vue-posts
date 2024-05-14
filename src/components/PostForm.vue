<template>

    <form @submit.prevent>
        <h4>Post creator</h4>
        <my-input v-focus v-model="post.title" type="text" placeholder="name"></my-input>

        <my-input v-model="post.body" type="text" placeholder="description"></my-input>

        <my-button style="align-self: flex-end; margin-top: 15px;" @click="createPost">Create post</my-button>
    </form>

</template>

<script>

import MyButton from "@/components/UI/MyButton.vue"
import MyInput from "@/components/UI/MyInput.vue"

export default {

    components: {

        MyButton,
        MyInput

    },

    data() {

        return {
            post: {
                Title: '',
                Body: '',

            }
        }
    },

    methods: {
        createPost() {

            this.post.id = Date.now();

            this.$emit('create', this.post)

            this.port = {
                title: "",
                body: ""

            }
        }
    },
    watch: {
        post: {
            handler(newVal) {
            console.log(newVal)

            },
            deep: true
        }
    }
}

</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;

}

</style>