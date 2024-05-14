<template>
    <div v-if="posts.length > 0">
        <h3>List posts</h3>
        
        <transition-group name="post-list">
            <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)" />
        </transition-group>

    </div>

    <h2 v-else style="color: red">No posts</h2>

</template>

<script>
import PostItem from "@/components/PostItem";

export default {
    components: { PostItem },

    props: {
        posts: {

            type: Array,
            required: true,

        }
    }
}

</script>

<style scoped></style>
