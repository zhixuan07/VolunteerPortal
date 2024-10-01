<template>
    <div v-if="visible" :class="[
      'flex items-center justify-between p-4 mb-4 rounded-lg',
      statusClasses[props.status]
    ]">
      <div class="flex items-center">
        <span class="mr-2 text-xl" v-html="statusIcons[props.status]"></span>
        <p class="text-sm font-medium">{{ props.message }}</p>
      </div>
      <button @click="close" class="text-xl font-semibold">&times;</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  interface Props {
    status: 'alert' | 'danger' | 'success' | 'pending';
    message: string;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    status: 'alert',
  });
  
  const emit = defineEmits(['close']);
  
  const visible = ref(true);
  
  const statusClasses = {
    alert: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    danger: 'bg-red-100 text-red-700 border border-red-300',
    success: 'bg-green-100 text-green-700 border border-green-300',
    pending: 'bg-blue-100 text-blue-700 border border-blue-300',
  };
  
  const statusIcons = {
    alert: '&#9888;',
    danger: '&#9940;',
    success: '&#10004;',
    pending: '&#8987;',
  };
  
  const close = () => {
    visible.value = false;
    emit('close');
  };
  </script>