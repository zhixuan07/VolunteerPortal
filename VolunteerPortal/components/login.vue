<script setup lang="ts">
import { useFirebaseAuth } from "../composables/useFirebaseAuth";
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
  loginWithCustomEmailAndPassword(email.value, password.value).then(() => {
    navigateTo(props.routeLocation);
  });
};
</script>

<template>
  <div class="flex items-center justify-center rounded">
    <div class="bg-white shadow-xl px-8 py-7 w-80 h-80">
      <div class="flex flex-col items-center space-y-4">
        <h1 class="text-2xl font-semibold ">{{ $props.name }}</h1>
        <form @submit.prevent="loginwithcustom">
          <div class="mb-3">
            <label class="block mb-2 sm:text-sm">Email</label>
            <input
              class="rounded shadow appearance-none border px-2 py-2 w-full"
              type="text"
              placeholder="Name"
              v-model="email"
            />
          </div>
          <div class="mb-3">
            <label class="block mb-2 sm:text-sm">Password</label>
            <input
              class="rounded shadow appearance-none border px-2 py-2 w-full"
              type="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div class="text-red-700">{{ errorMessage }}</div>
          <button
            class="px-6 py-2 border bg-orange-400 border-white text-white rounded-full hover:bg-white hover:text-orange-400 hover:border-orange-400 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    <div
      class="flex items-center justify-center bg-orange-400 shadow-xl px-8 py-7 w-80 h-80 bg-opacity-80 backdrop-filter backdrop-blur-lg"
    >
      <div class="grid grid-flow-row text-center gap-4">
        <h1 class="text-2xl font-semibold text-white">Welcome to Login</h1>
        <h1  class="font-light text-white">Don't Have Account?</h1>
        <button
          class="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-orange-500 transition duration-300"
        >
        <NuxtLink to="/organisation/register" class="font-light ">Sign Up</NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
