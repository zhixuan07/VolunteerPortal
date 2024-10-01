<script setup lang="ts">
import { useFirebaseAuth } from "../composables/useFirebaseAuth";
import APPURL from "~/types/AppURL";
////////////////////
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  routeLocation: {
    type: String,
    required: true,
  },
});

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const { loginWithCustomEmailAndPassword } = useFirebaseAuth();
////////////////////
const loginwithcustom = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Please fill in all fields";
    return;
  }
  loginWithCustomEmailAndPassword(email.value, password.value).then((value) => {
    if(value){
      navigateTo(props.routeLocation);
    }else{
      errorMessage.value = "Invalid Credentials";
    }
    
  });
};
</script>

<template>
<div class="flex items-center justify-center h-screen w-screen  bg-opacity-80 backdrop-filter backdrop-blur-lg">
  <div class="flex w-3/4 shadow-lg rounded-lg overflow-hidden">
    <!-- Left Side: Login Form-->
    <div class="w-1/2 p-10 bg-white">
      <h1 class="text-3xl font-semibold text-center">{{ $props.name }}</h1>
      <form @submit.prevent="loginwithcustom" class="w-full">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Email</label>
          <input
            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Password</label>
          <input
            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="flex justify-end mb-4">
          <NuxtLink :to="APPURL.ORG_FORGOT_PASSWORD" class="text-sm text-blue-500 hover:text-blue-700">Forgot Password?</NuxtLink>
        </div>
        <div class="text-red-700 text-sm">{{ errorMessage }}</div>
        <button
          class="w-full px-4 py-2 mt-2 font-bold text-white bg-orange-400 rounded-full hover:bg-orange-500 focus:outline-none focus:shadow-outline transition duration-300"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
    <div
    class=" w-1/2 bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center p-10 bg-opacity-80 backdrop-filter backdrop-blur-lg"
  >
    <div class="flex flex-col items-center justify-center h-full space-y-6 text-center px-2">
      <h1 class="text-2xl font-semibold text-white">Welcome to Login</h1>
      <h2 class="text-md font-light text-white">Don't Have an Account?</h2>
      <NuxtLink 
        :to="APPURL.ORG_REGISTER"
        class="px-6 py-2 text-white border w-full border-white rounded-full hover:bg-white hover:text-orange-500 transition duration-300"
      >
        Sign Up
      </NuxtLink>
    </div>
  </div>
  </div>
 
</div>
</template>

<style scoped></style>
