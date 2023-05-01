<template>
    <div w-full bg-white flex flex-nowrap>
        <iframe
            id="iframe2"
            src="15server.html"
            b-0
            w-800px
            h-600px
            v-show="$route.path == '/watch'"
        ></iframe>
        <iframe
            id="iframe2"
            src="16server.html"
            b-0
            w-800px
            h-600px
            v-show="$route.path == '/watch'"
        ></iframe>
    </div>
</template>
<script setup lang="ts"></script>

<style scoped></style>
