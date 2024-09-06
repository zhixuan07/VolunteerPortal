<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const errorMessage = ref("");
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as dbRef, push, get, query } from "firebase/database";
import APPURL from "~/types/AppURL";
import {useAccount} from "@/composables/useAccount"
/////////////////////////////////////////////// Variables ////////////////////////////////////////////////////
const orgName = ref("");
const email = ref("");
const phoneNumber = ref("");
const ssmNumber = ref("");
const ssmCertificate = ref<File | null>(null);
const showConfirmation = ref(false);
const saveOrganisationAccountApplication = useAccount().saveOrganisationAccountApplication;
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    ssmCertificate.value = target.files[0];
  }
};
/////////////////////////////////////////////// Functions ////////////////////////////////////////////////////
const register = async () => {
  saveOrganisationAccountApplication(email.value, orgName.value, phoneNumber.value, ssmNumber.value, ssmCertificate.value)
};



const closeConfirmation = () => {
  showConfirmation.value = false;
  navigateTo(APPURL.ORG_LOGIN);
};
</script>

<template>
  <div class="flex items-center justify-center h-screen w-screen">
    <div
      class="flex w-3/4 shadow-lg rounded-lg overflow-hidden"
      v-if="!showConfirmation"
    >
      <!-- Left Side: Registration Form -->
      <div class="w-1/2 p-10 bg-white">
        <form @submit.prevent="register">
          <h1 class="text-2xl font-semibold mb-6">Registration of Account</h1>

          <!-- Organisation Name Field -->
          <div class="mb-4">
            <label class="block mb-2 sm:text-sm">Organisation Name</label>
            <input
              class="rounded shadow appearance-none border px-2 py-2 w-full"
              type="text"
              placeholder="Name"
              v-model="orgName"
              required
            />
          </div>

          <!-- Email Field -->
          <div class="mb-4">
            <label class="block mb-2 sm:text-sm">Email</label>
            <input
              class="rounded shadow appearance-none border px-2 py-2 w-full"
              type="email"
              placeholder="xxx@email.com"
              v-model="email"
              required
            />
          </div>

          <!-- Phone Number Field -->
          <div class="mb-4">
            <label class="block mb-2 sm:text-sm">Phone Number</label>
            <input
              class="rounded shadow appearance-none border px-2 py-2 w-full"
              type="text"
              placeholder="60"
              v-model="phoneNumber"
              required
            />
          </div>

          <!-- SSM Number Field -->
          <div class="mb-4">
            <label class="block mb-2 sm:text-sm">SSM Registration Number</label>
            <input
              class="rounded shadow appearance-none border px-2 py-2 w-full"
              type="text"
              placeholder="SSM Number"
              v-model="ssmNumber"
              required
            />
          </div>

          <!-- SSM Certification File Upload -->
          <div class="mb-4">
            <label class="block mb-2 sm:text-sm">SSM Certification</label>
            <input
              @change="handleFileUpload"
              type="file"
              accept=".pdf,.jpeg,.jpg"
              class="file-input file-input-bordered w-full"
              required
            />
          </div>

          <!-- Error Message Display -->
          <div class="text-red-700 mb-3" v-if="errorMessage">
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <!-- Right Side: Welcome Message -->
      <div
        class="w-1/2 bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center p-10 bg-opacity-80 backdrop-filter backdrop-blur-lg"
      >
        <div class="text-center text-white">
          <h1 class="text-2xl font-semibold mb-4">Registration</h1>
          <p class="font-light mb-6">Alreadt Have an Account?</p>
          <NuxtLink
            to="/organisation/login"
            class="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-orange-500 transition duration-300"
          >
            Sign In
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="showConfirmation" class="flex items-center justify-center">
    <div class="bg-yellow-200 p-4 rounded shadow-lg text-center">
      <p>
        Your registration has been submitted. Please wait for admin approval.
      </p>
      <button
        @click="closeConfirmation"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Login
      </button>
    </div>
  </div>
  </div>

 
</template>

<style scoped></style>
