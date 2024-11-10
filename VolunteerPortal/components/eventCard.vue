<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const props = defineProps({
  event: {
    type: Object as PropType<EventData>,
    required: true,
  },
});
const eventData = ref<EventData>({
  id: props.event?.id || "",
  title: props.event?.title || "",
  purpose: props.event?.purpose || "",
  description: props.event?.description || "",
  orgId: props.event?.orgId || "",
  role: props.event?.role || "",
  date: props.event?.date || "",
  eventType: props.event?.eventType || "",
  startTime: props.event?.startTime || "",
  endTime: props.event?.endTime || "",
  location: props.event?.location || "",
  status: props.event?.status || "",
  image: props.event?.image,
});
/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
</script>
<template>
  <div class="flex flex-row bg-white border gap-10 rounded-lg">
    <div>
      <img
        :src="eventData.image?.toString()"
        alt="Event Image"
        class="object-fill rounded-lg"
      />
    </div>
    <div class="top-0 space-y-2">
      <div class="text-2xl font-semibold">{{ eventData.title }}</div>
      <div class="text-lg flex items-center gap-2">
        <Icon name="mdi:calendar"></Icon> {{ eventData.date }},{{
          eventData.startTime
        }}
        - {{ eventData.endTime }}
      </div>
      <div class="text-lg flex items-center gap-2">
        <Icon name="mdi:map-marker"></Icon>Location: {{ eventData.location }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
