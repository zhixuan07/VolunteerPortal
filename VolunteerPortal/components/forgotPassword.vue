<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import { useAccount } from "~/composables/useAccount";
import { useFirebaseAuth } from "~/composables/useFirebaseAuth";
import {useToast} from "~/composables/useToast";
import APPURL from "~/types/AppURL";
/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const { checkUserAccountExists } = useAccount();
const { resetAccountPassword } = useFirebaseAuth();
const toast = useToast();
const email = ref<string>("");
const errorMessage = ref<string>("");
/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////
async function sendResetPasswordLink() {
  if (!email.value) {
    errorMessage.value = "Please enter your email";
    return;
  }
  const emailExists = await checkUserAccountExists(email.value);
  if (!emailExists) {
    errorMessage.value = "Email does not exist";
    return;
  }else{
    await resetAccountPassword(email.value);
    toast.success("Password reset link sent to your email");
  }
  
}
/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
</script>

<template>
  <div class="bg-white shadow-xl px-8 py-7 w-80 h-80 rounded-lg">
    <div class="flex flex-col items-center space-y-4 h-full">
      <h1 class="text-3xl font-semibold">Forgot Password</h1>
      <p class="text-sm text-slate-400">
        Enter your email and we'll send you a link to reset password
      </p>
      <input
        type="text"
        class="input input-bordered p-2 w-full"
        placeholder="Email"
        v-model="email"
      />

      <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
      <button @click="sendResetPasswordLink" class="btn btn-primary text-white w-full">
        Submit
      </button>

      <NuxtLink
        :to="APPURL.ORG_LOGIN"
        class="group flex items-center justify-center gap-2 text-sm text-blue-500 mt-4 hover:underline">
        <Icon
          name="ooui:arrow-previous-ltr"
          class="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-x-1" />
        <span>Back to Login</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
