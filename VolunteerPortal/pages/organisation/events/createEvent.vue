<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////
import APPURL from "~/types/AppURL";
import { useEvent } from "~/composables/useEvent";
import {useUploadFile} from "~/composables/useUpload";
/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: "auth",
  layout: "org",
});
/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////




/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
</script>
<template>
  <div class="min-h-screen">
    <div class="ml-8 mr-8">
      <NuxtLink :to="APPURL.ORG_EVENTS" class="flex items-center gap-2"><Icon name="mdi:arrow-back" ></Icon>Back</NuxtLink>
      <div class="overflow-y-auto px-2">
        <EventForm  />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
