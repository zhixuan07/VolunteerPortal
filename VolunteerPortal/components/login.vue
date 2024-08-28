<script setup lang="ts">

import {useFirebaseAuth} from '../composables/useFirebaseAuth'
////////////////////
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    routeLocation:{
        type:String,
        required:true
    }
})

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const {loginWithCustomEmailAndPassword} = useFirebaseAuth()
////////////////////
const loginwithcustom = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Please fill in all fields";
    return;
  }
  loginWithCustomEmailAndPassword(email.value, password.value).then(()=>{
    navigateTo(props.routeLocation)
  })
  

}
</script>

<template>
  <div class="flex items-center justify-center  bg-gray-100">
    <div class="bg-white shadow-xl rounded px-8 py-7 w-80">
      <div class="flex flex-col items-center space-y-4">
        <h1 class="text-2xl font-semibold">Welcome, Organisation</h1>
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
              placeholder="Name"
              v-model="password"
             
            />
          </div>
          <div class="text-red-700 ">{{ errorMessage }}</div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
