<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import { useEvent } from "~/composables/useEvent";
import APPURL from "~/types/AppURL";
/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: "auth",
  layout: "org",
});
/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const route = useRouter().currentRoute.value
const eventData = ref<EventData | null>(); // Initialize as null
const eventId =  route.params.id as string;  
// Fetch event data
const fetchEvent = async () => {
  try {
    const event = await useEvent().getEvent(eventId)
    // Directly set eventData to the returned event
    eventData.value = event;
    
  } catch (error) {
    console.error("Error fetching event:", error);
  }
}; 
/////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////
const updateEvent = async(submit:EventData) => {
  try {
      const rawData = toRaw(eventData.value);
      eventData.value = submit;
      await useEvent().updateEvent(eventId,rawData);
      navigateTo(APPURL.ORG_EVENTS);
      
  } catch (error) {
    console.error("Error updating event:", error);
    
  }
 
};
/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
onMounted(async () => {
  await fetchEvent();
  
 
});
</script>
<template>
  <div class="mx-4 my-6 overflow-y-auto">
    <div class="text-2xl font-semibold">Edit Event</div>
      <template v-if="eventData">
        <EventForm :event="eventData" />
      </template>
      <template v-else>
        <div class="loading">Loading event data...</div>
      </template>
    
  </div>
</template>

<style scoped></style>
