<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import APPURL from "~/types/AppURL";
import { useEvent } from "~/composables/useEvent";
/////////////////////////////////////////Meta/////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: "auth",
  layout: "org",
});
/////////////////////////////////////////Variables////////////////////////////////////////////////////////////////////////
const events = ref<EventData[]>([]);
const cancelModalOpen = ref(false);
const event_ID = ref<string>("");
const searchEventName = ref("");
/////////////////////////////////////////Functions////////////////////////////////////////////////////////////////////////
const cancelEvent = async (eventId: string) => {
  try {
    await useEvent().cancelEvent(eventId);
  } catch (error) {
    console.error("Error cancelling event:", error);
  }
};
const openCancelModal = (eventID: string) => {
  cancelModalOpen.value = true;
  event_ID.value = eventID;
};
const filteredEvents = computed(() => {
  if (!searchEventName.value) return events.value;
  return events.value.filter((event) =>
    event.title.toLowerCase().includes(searchEventName.value.toLowerCase())
  );
});
/////////////////////////////////////////Initialisations//////////////////////////////////////////////////////////////////
onMounted(async () => {
  events.value = await useEvent().getEvents();
});
</script>
<template>
  <div class="mx-4">
    <div>
      <div class="text-3xl font-semibold">Events</div>
      <div class="mt-8 mb-8 w-full flex justify-between">
        <label class="input input-bordered flex items-center gap-2 w-fit">
          <input
            type="text"
            v-model="searchEventName"
            class="grow"
            placeholder="Search"
          />
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

        <button
          @click="navigateTo(APPURL.ORG_CREATE_EVENT)"
          class="btn btn-primary text-white"
        >
          Create Event
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <div
        v-if="filteredEvents.length === 0"
        class="text-2xl w-full h-full flex justify-center text-slate-400"
      >
        {{
          events.length === 0 ? "No Events Show" : "No matching events found"
        }}
      </div>
      <table v-else class="tabel-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr class="bg-orange-400 text-white">
            <th class="px-2 py-2">Event Title</th>
            <th>Event Date</th>
            <th>Event Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(event, index) in filteredEvents"
            :key="index"
            class="text-center"
          >
            <td class="py-3 px-4 border-b border-orange-200">
              {{ event.title }}
            </td>
            <td class="py-3 px-4 border-b border-orange-200">
              {{ event?.date }}
            </td>
            <td class="py-3 px-4 border-b border-orange-200">
              {{ event?.status }}
            </td>
            <td class="py-3 px-4 border-b border-orange-200">
              <div class="flex justify-center items-center gap-2">
                <NuxtLink :to="`${APPURL.ORG_EVENTS}/${event.id}`">
                  <Icon name="tabler:edit" />
                </NuxtLink>
                <NuxtLink :to="`${APPURL.ORG_PARTICIPANTS}/${event.id}`">
                  <Icon name="mdi:account-group"></Icon>
                </NuxtLink>
                <button @click="openCancelModal(event.id!)">
                  <Icon name="tabler:trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot>
      <CancelModal
        v-if="cancelModalOpen"
        :isOpen="cancelModalOpen"
        @close="cancelModalOpen = false"
        @submit="cancelEvent(event_ID)"
      />
    </slot>
  </div>
</template>

<style scoped></style>
