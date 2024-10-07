<template>
    <div class="mb-4">
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="bg-orange-400 h-2.5 rounded-full"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        {{ checkedInCount }} / {{ totalParticipants }} checked in ({{ progressPercentage }}%)
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    checkedInCount: {
      type: Number,
      required: true
    },
    totalParticipants: {
      type: Number,
      required: true
    }
  });
  
  const progressPercentage = computed(() => {
    if (props.totalParticipants === 0) return 0;
    return Math.round((props.checkedInCount / props.totalParticipants) * 100);
  });
  </script>