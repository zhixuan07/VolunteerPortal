<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import { useEvent } from "~/composables/useEvent";

/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: "auth",
  layout: "org",
});
/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const route = useRouter().currentRoute.value;
const eventId = route.params.id as string;
const participants = ref([] as any[]);
/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
onMounted(async()=>{
  participants.value = await useEvent().getEventParticipantsWithUserInfo(eventId);
  console.log(participants.value)
})
</script>
<template>
 <div class="mx-4">
  <div>
    <div class="text-3xl font-semibold ">Events</div>
    <div class=" mt-8 mb-8 w-full flex justify-between">
      <label class="input input-bordered flex items-center gap-2 w-fit ">
        <input type="text" class="grow "  placeholder="Search" />
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


    </div>
  </div>
  <div class="overflow-x-auto">
    <div v-if="participants.length === 0 " class="text-2xl w-full h-full  flex justify-center text-slate-400">
        No Participants
    </div>
    <table v-else class="tabel-auto w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-orange-400 text-white">
          <th class="px-2 py-2">Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Emergency contact </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(participant, index) in participants" :key="index" class="text-center ">
          <td class="py-3 px-4 border-b border-orange-200">{{ participant.userInfo.name }}</td>
          <td class="py-3 px-4 border-b border-orange-200">{{ participant?.userInfo.email }}</td>
          <td class="py-3 px-4 border-b border-orange-200">{{ participant?.phone }}</td>
          <td class="py-3 px-4 border-b border-orange-200">
            {{ participant?.emergency_contact }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped></style>
