<script setup lang="ts">
import Login from "../../components/login.vue";
import APPURL from "../../types/AppURL";
definePageMeta({
    layout:'auth'
})

</script>

<template>
    <div>
        <Login name="Admin Portal" :routeLocation=APPURL.ADMIN_INDEX />
    </div>
</template>



<style scoped>

</style>