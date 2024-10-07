<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
      <h2 class="text-lg font-bold mb-4">Attendance</h2>
      <form @submit.prevent="handleSubmit">
        <table class="table-auto w-full bg-white shadow-md rounded-lg">
          <!-- ... table header ... -->
          <thead>
            <tr class="bg-orange-400 text-white">
              <th class="px-2 py-2">Name</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
            </thead>
          <tbody>
            <tr
              v-for="participant in participants"
              :key="participant.id"
              class="text-center"
            >
              <td class="py-3 px-4 border-b border-orange-200">
                {{ participant.userInfo.name }}
              </td>
              <td class="py-3 px-4 border-b border-orange-200">
                <input
                  type="radio"
                  :id="`present-${participant.id}`"
                  :name="`attendance-${participant.id}`"
                  :checked="participant.attendance === 'Completed'"
                  @change="updateAttendanceStatus(participant.id, 'Completed')"
                  class="mr-2"
                />
              </td>
              <td class="py-3 px-4 border-b border-orange-200">
                <input
                  type="radio"
                  :id="`absent-${participant.id}`"
                  :name="`attendance-${participant.id}`"
                  :checked="participant.attendance === 'Absent'"
                  @change="updateAttendanceStatus(participant.id, 'Absent')"
                  class="mr-2"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-4">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            @click="handleSubmit"
          >
            Submit Attendance
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAttendance } from "~/composables/useAttendance";
import { useToast } from "~/composables/useToast";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  participants: {
    type: Array,
    required: true,
  },

});
const toast = useToast();
const emit = defineEmits(["close"]);
const participants = ref(props.participants);

const updateAttendanceStatus= async (participantId: string, status: string) => {
  const participant :any = participants.value.find(
    (participant: any) => participant.id === participantId
  );
  if (participant ) {
    participant.attendance = status;
   
  }
};
const updateAttendance = async() => {
  for (const participant  of participants.value){
    await useAttendance().markAttendance(participant.id, participant.attendance);
  }
  toast.success("Attendance updated successfully");
};

const closeModal = () => {
  emit("close");
};

const handleSubmit = () => {
 updateAttendance();

};
</script>