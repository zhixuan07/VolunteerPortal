<script setup lang="ts">
import { useReport } from '~/composables/useReport';
import { ref } from 'vue';
const reports = ref([] as any);

onMounted(async () => {
  reports.value = await useReport().fetchReports();
});
</script>

<template>
    <div class="overflow-x-auto">
    <table class="table-auto w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-orange-300 text-white">
          <th class="px-4 py-2">Reporter Email</th>
          <th class="px-4 py-2">Reason</th>
          <th class="px-4 py-2">Message</th>
          <th class="px-4 py-2">Event Organisation</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.id" class="text-center odd:bg-white even:bg-orange-100">
          <td class="border px-4 py-2">{{ report.email }}</td>
          <td class="border px-4 py-2">{{ report.reason }}</td>
          <td class="border px-4 py-2">{{ report.message }}</td>
          <td class="border px-4 py-2">
           {{ report.event.orgName }}
          </td>
      
          
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>

</style>