import { defineNuxtRouteMiddleware } from "#app";
import { useFirebaseAuth } from "~/composables/useFirebaseAuth";
export default defineNuxtRouteMiddleware((context) => {
    const ID_TOKEN = sessionStorage.getItem('idToken');
    const userID = sessionStorage.getItem('userId');
    // TODO: Verify the user role
    if (!userID) {
        return navigateTo('/organisation/login');
    }
 
});
 
