import Main from '@/pages/Main';
import PostPage from '@/pages/PostPage';
import PostIdPage from '@/pages/PostIdPage';
import {routes, createRouter, createWebHistory} from 'vue-router';
import PostPageStore from '@/pages/PostPageStore.vue';

 routes = [

    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageStore
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
