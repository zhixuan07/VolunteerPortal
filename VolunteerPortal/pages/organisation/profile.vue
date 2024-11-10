<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import { useAccount } from '#imports';
/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: 'auth',
  layout: 'org',
});
/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const {getProfile} = useAccount();
const orgDetails = ref<OrganiserDetails | null>(null);
/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////
const updateProfile = async () => {
  try {
    await useAccount().updateProfile(orgDetails.value);
    console.log('Profile updated:', orgDetails.value);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
onMounted(async () => {
  try {
    orgDetails.value = await getProfile();
    console.log('Fetched profile:', orgDetails.value);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
});
</script>
<template>
    <div class="flex bg-slate-100 min-h-screen">
      <div class="mx-auto w-3/5"> 
        <h1 class="text-2xl font-semibold">My Profile</h1>
        <form v-if="orgDetails" @submit.prevent="updateProfile" class="bg-white border rounded-lg px-10 py-10 space-y-2 flex flex-col">
          <h1>Organisation Name</h1>
          <input type="text" v-model="orgDetails.name" class="input input-bordered">
          <h1>Phone Number</h1>
          <input type="text" v-model="orgDetails.phoneNumber" class="input input-bordered">
          <h1>Organisation Description</h1>
          <textarea v-model="orgDetails.description" class="textarea textarea-bordered h-96"></textarea>
          <button type="submit" class="btn btn-primary text-white">Update</button>
        </form>
        <p v-else>Loading profile data...</p>
      </div>
    </div>
  </template>



<style scoped>

</style>