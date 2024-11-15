<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import { useEvent } from "~/composables/useEvent";
import { useAttendance } from "~/composables/useAttendance";
import { ref } from "vue";
import APPURL from "~/types/AppURL";
/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: "auth",
  layout: "org",
});
/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const route = useRouter().currentRoute.value;
const eventId = route.params.id as string;
const participants = ref([] as any[]);
const eventData = ref<EventData | null>(); // Initialize as null
const useAttend = useAttendance();
const loadingParticipantId = ref(false);
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////

// Fetch event data
const fetchEvent = async () => {
  try {
    const event = await useEvent().getEvent(eventId);
    // Directly set eventData to the returned event
    eventData.value = event;
    
  } catch (error) {
    console.error("Error fetching event:", error);
  }finally{

  }
};

const checkedInCount = computed(() => {
  return participants.value.filter((p) => p.attendance === "Completed").length;
});
/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
onMounted(async () => {
  participants.value = await useEvent().getEventParticipantsWithUserInfo(
    eventId
  );
  await fetchEvent();
});
</script>

<template>
  <div class="mx-4 my-2">
    <div>
      <div class="breadcrumbs text-md">
      <ul>
        <li><NuxtLink :to="APPURL.ORG_EVENTS" >Events</NuxtLink></li>
        <li><NuxtLink> Manage Attendance</NuxtLink></li>
      </ul>
    </div>
      <div v-if="eventData">
        <EventCard :event="eventData" />
      </div>
      <div class="mt-8 mb-8 w-full flex justify-between">
        <label class="input input-bordered flex items-center gap-2 w-fit">
          <input type="text" class="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
        <div class="space-x-2">
          <button class="btn btn-primary text-white" @click="openModal">
          Take Attendance
        </button>
        <NuxtLink class="btn btn-primary text-white" :to="APPURL.ORG_REMINDERS+`/${eventId}`">
         Email Participants
        </NuxtLink>
        </div>
       
      </div>
    </div>
    <div class="overflow-x-auto">
      <div
        v-if="participants.length === 0"
        class="text-2xl w-full h-full flex justify-center text-slate-400"
      >
        No Participants
      </div>
      <div v-else>
        <div>
          <h1 class="text-lg font-semibold">Attendance List</h1>
          <AttendanceProgress
            :checked-in-count="checkedInCount"
            :total-participants="participants.length"
          />
        </div>

        <table class="tabel-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr class="bg-orange-400 text-white">
              <th class="px-2 py-2">Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Emergency contact</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(participant, index) in participants"
              :key="index"
              class="text-center"
            >
              <td class="py-3 px-4 border-b border-orange-200">
                {{ participant.userInfo.name }}
              </td>
              <td class="py-3 px-4 border-b border-orange-200">
                {{ participant?.userInfo.email }}
              </td>
              <td class="py-3 px-4 border-b border-orange-200">
                {{ participant?.phone }}
              </td>
              <td class="py-3 px-4 border-b border-orange-200">
                {{ participant?.emergency_contact }}
              </td>
              <td class="py-3 px-4 border-b border-orange-200">
                <template v-if="loadingParticipantId === true">
                  <span class="loading loading-spinner loading-sm"></span>
                </template>
                <template v-else>
                  {{ participant.attendance ?? "Pending"}}
                </template>
             
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <slot>
      <AttendanceModal
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      :eventId="eventId"
      :participants="participants"
      @close="isModalOpen = false"
      
    />
    </slot>
    
  </div>
</template>

<style scoped></style>
~/components/composables/useEvent~/components/composables/useAttendance