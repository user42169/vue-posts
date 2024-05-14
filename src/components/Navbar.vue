<template>

    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>

        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')" >Posts</my-button>
            <my-button @click="$router.push('/store')" >Store</my-button>
        </div>
    </div>

</template>

<script>

export default {
}

</script>

<style>

.navbar {

    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;

    cursor: pointer;
}

.navbar__btns {
    margin-left: auto;
    
    cursor: pointer;

}

</style>