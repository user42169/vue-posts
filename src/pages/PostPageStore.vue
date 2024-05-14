<template>

    <div>
        <h1>{{ $store.state.likes }}</h1>

        <div>
            <my-button @click="$store.commit('incrementLikes')">Like</my-button>
            <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
        </div>
        <h1>Posts page</h1>

        <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search ..." />

        <div class="app__btns">

            <my-button @click="showDialog" style="">

                Create post

            </my-button>

            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />

        </div>

        <my-dialog v-model:show="dialogVisible">

            <post-form @create="createPost" />

        </my-dialog>


        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
        <div v-else>Loading</div>
        <div v-intersection="loadMorePosts" class="observer"></div>


        <div class="page__wrapper">

            <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
            'current-page': page === pageNumber
        }" @click="changePage(pageNumber)"> {{ pageNumber }} </div>

        </div>
        <div ref="observer" class="observer"></div>
        <div v-intersection="loadMorePosts" class="observer"></div>

    </div>

</template>

<script>

import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

import axios from 'axios';

export default {

    components: {
        PostList, PostForm
    },

    data() {
        return {
            // posts: [],
            dialogVisible: false,
            // isPostsLoading: false,
            // selectedSort: '',
            // searchQuery: '',
            // page: 1,
            // limit: 10,
            // totalPages: 0,
            // sortOptions: [
            //     { value: 'title', name: 'Name' },
            //     { value: 'Description', name: 'Description' },
            // ]
        }
    },

    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',

        }),

        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts',
        }),

        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },

        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },

        showDialog() {
            this.dialogVisible = true
        },

        // changePage(pageNumber) {
        //     this.page = pageNumber
        //     this.fetchPosts()
        // },

        // async fetchPosts() {

        //     try {
        //         this.isPostsLoading = true;
        //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        //             params: {
        //                 _page: this.page,
        //                 _limit: this.limit
        //             }
        //         });

        //         this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        //         this.posts = response.data;

        //     } catch (e) {

        //         alert('error')

        //     } finally {
        //         this.isPostsLoading = false;
        //     }
        // },
        // async loadMorePosts() {

        //     try {

        //         this.page += 1;

        //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        //             params: {
        //                 _page: this.page,
        //                 _limit: this.limit
        //             }
        //         });

        //         this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        //         this.posts = [...this.posts, ...response.data];

        //     } catch (e) {

        //         alert('error')

        //     } finally {

        //     }
        // },
    },

    mounted() {

        this.fetchPosts();
        // this.$refs.observer;

        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }

        // const callback = (entries, observer) => {
        //     if(entries[0].isIntesecting && this.posts.length < this.totalPages) {
        //         this.loadMorePosts()

        //     }
        // };

        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);

    },


    computed: {
        ...mapState({
            posts: state => state.post.posts,
            likes: state => state.post.likes,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions

        }),

        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
            incrementLikes: 'post/incrementLikes',
            decrementLikes: 'post/decrementLikes',
        })

        // sortedPosts() {

        //     return [...this.posts].sort((post1, post2) => {
        //         return post1[this.selectedSort]?.LocalComponents(post2[this.selectedSort])
        //     })

        // },

        // sortedAndSearchedPosts() {
        //     return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        // }
    },

    watch: {
        // selectedSort(newValue) {
        //     this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.LocalComponents(post2[newValue])

        //     })
        // },
        // page() {
        //     this.fetchPosts()
        // }
    }
}


</script>

<style>

.app__btns {

    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}

.observer {
    height: 30px;
    background: green;
}

</style>
