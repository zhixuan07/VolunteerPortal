<script setup lang="ts">

/////////////////////////////////////////Imports///////////////////////////////////////////////////////////////////////
import  {useApplication}from '@/composables/useApplication'
import { useAccount } from '~/composables/useAccount';
/////////////////////////////////////////Meta/////////////////////////////////////////////////////////////////////////
definePageMeta({
    layout: 'default',
    middleware: 'auth'
});
/////////////////////////////////////////Variables/////////////////////////////////////////////////////////////////////
const orgApplications = ref([] as any[]);
const application = useApplication();
const account = useAccount();
/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////
async function approveApplication (orgId: string)  {
    alert("Approving application");
    try{
        const applicationApprove = await application.approveOrganisationApplication(orgId);
        if(applicationApprove){
            alert("Application approved");
          
        }else{
            console.log("Application not approved");
        }
    }catch{
        console.log("Error approving application");
    }
    
}
async function rejectApplication (orgId: string)  {
    alert("Rejecting application");
    try{
        const applicationReject = await application.rejectOrganisationApplication(orgId);
        if(applicationReject){
            alert("Application rejected");
            
        }else{
            console.log("Application not rejected");
        }
    }catch{
        console.log("Error rejecting application");
    }
    
}
/////////////////////////////////////////Initialisations/////////////////////////////////////////////////////////////
onMounted(async () => {
    const applications = await useApplication().retrieveOrganisationApplications();
    orgApplications.value = applications;

});
/////////////////////////////////////////Templates//////////////////////////////////////////////////////////////////
</script>

<template>
     <div class="overflow-x-auto">
    <table class="table-auto w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-orange-300 text-white">
          <th class="px-4 py-2">Organisation Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Phone Number</th>
          <th class="px-4 py-2">SSM Number</th>
          <th class="px-4 py-2">SSM Certificate</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="org in orgApplications" :key="org.id" class="text-center odd:bg-white even:bg-orange-100">
          <td class="border px-4 py-2">{{ org.orgName }}</td>
          <td class="border px-4 py-2">{{ org.email }}</td>
          <td class="border px-4 py-2">{{ org.phoneNumber }}</td>
          <td class="border px-4 py-2">{{ org.ssmNumber }}</td>
          <td class="border px-4 py-2">
            <a :href="org.ssmCertificateUrl" target="_blank" class="text-orange-600 hover:underline">
              View Certificate
            </a>
          </td>
          <td class="border px-4 py-2">
            <span v-if="org.status==='pending'" class="bg-yellow-500 text-white font-bold py-1 px-2 rounded">
              Pending
            </span>
            <span v-else-if="org.status==='approved'" class="bg-green-500 text-white font-bold py-1 px-2 rounded">
              Approved
            </span>
            <span v-else class="bg-red-500 text-white font-bold py-1 px-2 rounded">
                Rejected
            </span>
          </td>
          <td class="grid grid-flow-col gap-2 px-2" v-if="org.status==='pending'"> 
            <button @click="approveApplication(org.id)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Approve
            </button>
            <button @click="rejectApplication(org.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Reject
            </button>
          </td>
          <td v-else>
            No Action
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>

</style>