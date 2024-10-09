<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import { ref } from "vue";
import { useEvent } from "~/composables/useEvent";
import {useReminder} from "~/composables/useReminder";
/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: "auth",
  layout: "org",
});
/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const emailTo = ref("1");
const participants = ref([] as any[]);
const route = useRouter().currentRoute.value;
const eventId = route.params.id as string;

const emailInfo = ref({
  name: "",
  replyTo: "",
  to: "",
  subject: "",
  message: "",
});
/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////
const sendReminderEmail = async () => {
  if (emailTo.value === "1") {
    emailInfo.value.to = participants.value
      .map((participant: any) => participant.userInfo.email)
      .join(",");
    console.log(emailInfo.value.to);
   await useReminder().sendReminder(emailInfo.value);
  } else {
    await useReminder().sendReminder(emailInfo.value);
  }
};
const updateRecipientEmail = (recipientEmail: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  const emails = new Set(emailInfo.value.to.split(',').filter(Boolean));

  if (target.checked) {
    emails.add(recipientEmail);
  } else {
    emails.delete(recipientEmail);
  }

  emailInfo.value.to = Array.from(emails).join(',');

};
/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
onMounted(async () => {
  participants.value = await useEvent().getEventParticipantsWithUserInfo(
    eventId
  );
  console.log(participants.value);
});
</script>
<template>
  <div class="mx-4 my-2">
    <h1 class="text-2xl font-semibold">Email To Attendance</h1>
    <form @submit.prevent="sendReminderEmail" class="space-y-2">
      <div class="">
        <h1>Name</h1>
        <input
          placeholder="Name"
          type="text"
          class="input input-bordered"
          v-model="emailInfo.name"
          required
        />
      </div>
      <div>
        <h1>Reply To</h1>
        <input
          placeholder="Reply To"
          type="text"
          class="input input-bordered"
          v-model="emailInfo.replyTo"
          required
        />
      </div>

      <div class="flex flex-col">
        <h1>To</h1>
        <select v-model="emailTo" class="select select-bordered">
          <option value="1" selected>All Attendees</option>
          <option value="2">Specific Attendees</option>
        </select>
        <div v-if="emailTo === '2'">
        <table class="table-auto w-full bg-white rounded-lg">
            <thead class="bg-orange-400 border">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody class="bg-white border text-center">
              <tr v-for="participant in participants" :key="participant.id" class="border-b ">
                <td><input type="checkbox" @change="(event) => updateRecipientEmail(participant.userInfo.email, event)"/></td>
                <td>{{ participant.userInfo.name }}</td>
                <td>{{ participant.userInfo.email }}</td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>
      <div class="flex flex-col">
        <h1>Subject</h1>
        <input
          placeholder="Name"
          type="text"
          class="input input-bordered"
          v-model="emailInfo.subject"
          required
        />
      </div>
      <div class="flex flex-col">
        <h1>Message</h1>
        <input
          placeholder="Name"
          type="text"
          class="input input-bordered"
          v-model="emailInfo.message"
          required
        />
      </div>
      <div>
        <button class="btn btn-primary">Send Email</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
~/components/composables/useEvent~/components/composables/useReminder