<script setup lang="ts">
import { useAccount } from '#imports';
const organisationDetails = ref([] as any);
onMounted(async () => {
  organisationDetails.value = await useAccount().getOrganisationAccountDetails();
});
</script>

<template>
     <div class="overflow-x-auto">
    <table class="table-auto w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-orange-300 text-white">
          <th class="px-4 py-2">Organisation Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Phone Number</th>
         

          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="org in organisationDetails" :key="org.id" class="text-center odd:bg-white even:bg-orange-100">
          <td class="border px-4 py-2">{{ org.name }}</td>
          <td class="border px-4 py-2">{{ org.email }}</td>
          <td class="border px-4 py-2">{{ org.phoneNumber }}</td>

          <td class="grid grid-flow-col gap-2 px-2" v-if="org.status==='Lock'"> 
            <button @click="" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              UnLock
            </button>
            
          </td>
          <td v-else class="border px-4 py-">
            <button @click="" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Lock
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>

</style>