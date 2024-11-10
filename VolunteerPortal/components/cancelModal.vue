<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "~/composables/useToast";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
const toast = useToast();
const emit = defineEmits(["close","submit"]);


const closeModal = () => {
  emit("close");
};

const handleSubmit = () => {
    emit("submit");
  closeModal();

};
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
      <h2 class="text-lg font-bold mb-4">Cancel Event</h2>
      <form @submit.prevent="handleSubmit">
        Are you sure you want to cancel this event? This action cannot be undone.

        <div class="mt-4">
          <button
            type="button"
            @click="closeModal"
            class="btn btn-secondary text-white mr-2"
          >
            Close
          </button>
          <button
            type="submit"
            class="btn btn-primary text-white"
            @click="handleSubmit"
          >
            Cancel Event
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

