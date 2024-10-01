<script setup lang="ts">
import Login from "../../components/login.vue";
import APPURL from "../../types/AppURL";
definePageMeta({
    layout:'auth'
})

</script>

<template>
    
        <Login name="Organisation Portal" :routeLocation=APPURL.ORG_DASHBOARD />
    
</template>



<style scoped>

</style>