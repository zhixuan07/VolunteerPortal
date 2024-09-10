<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import APPURL from "~/types/AppURL";
import { useEvent } from "~/composables/useEvent";
import {useUploadFile} from "~/composables/useUpload";
import { or } from "firebase/firestore";
/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: "auth",
  layout: "org",
});
/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const eventData = {
  orgId: "",
  title: "",
  purpose: "",
  description: "",
  role: "",
  date: "",
  eventType: "",
  startTime: "",
  endTime: "",
  location: "",
  image: "",
};
const eventImage = ref<File | null>(null);
/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////
async function createEvent(event: any) {
    try {   
        useEvent().createEvent(eventData,eventImage.value);
        alert("Event created successfully");
        navigateTo(APPURL.ORG_EVENTS);
    } catch (error) {
        console.log(error);
    }
    
}
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    eventImage.value = target.files[0];
  }
};
/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
</script>
<template>
  <div class="min-h-screen">
    <div class="ml-8 mr-8">
      <NuxtLink :to="APPURL.ORG_EVENTS">Back</NuxtLink>
      <div class="overflow-y-auto px-2">
        <EventForm @submit="createEvent" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
