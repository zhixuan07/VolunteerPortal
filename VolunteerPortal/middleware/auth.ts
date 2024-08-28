import { defineNuxtRouteMiddleware } from "#app";

export default defineNuxtRouteMiddleware((context) => {
    const ID_TOKEN = sessionStorage.getItem('idToken');
    if (!ID_TOKEN) {
        return navigateTo('/');
    }
 
});
 
