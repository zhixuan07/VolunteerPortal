<script setup lang="ts">
import APPURL from '~/types/AppURL';

/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const emit = defineEmits(["submit"]);
const props = defineProps({
  event: {
    type: Object as () => EventData | null,
  },
  eventId: {
    type: String,

  },
});
// Define the imagePreview as a string or null, since it holds either the base64 string or nothing
const imagePreview = ref<string | null>(null);

// File input is defined as an HTMLInputElement or null
const fileInput = ref<HTMLInputElement | null>(null);
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
  image: props.event?.image  ,
});
const volunteerEventTypes = [
  "Community Outreach and Support",
  "Environmental Conservation",
  "Disaster Relief and Humanitarian Aid",
  "Skills-Based Volunteering",
  "International Development",
  "Animal Rescue and Care",
  "Teaching and Education",
  "Working with Children and Youth",
  "Community Development",
  "Elderly Support",
  "Sports and Leisure",
  "Farm Work",
  "Climate Change",
];

const isEditing = computed(() => !!props.event);
/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////
const handleFileUpload = (event: Event) => {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    eventData.value.image = target.files[0];
  }
};
const validateTimeInterval=(startTime:any,endTime:any)=>{
  const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Check if start time is earlier than end time
    if (start >= end) {
        return false; // Invalid interval
    }
    return true;
}
const validateDate=(date:any)=>{
  const today = new Date();
  const selectedDate = new Date(date);
  if (selectedDate < today) {
      return false; // Invalid date
  }
  return true;
}
const handleSubmit = (event:any) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const startTime = formData.get('startTime'); // Assuming you have an input named 'startTime'
  const endTime = formData.get('endTime'); // Assuming you have an input named 'endTime'
  const date = formData.get('date'); // Assuming you have an input named 'date'
  if (!validateTimeInterval(startTime, endTime)) {
      alert("End time must be later than start time.");
      return;
  }
  if (!validateDate(date)) {
      alert("Date must be later than today.");
      return;
  }
  if (isEditing.value) {
    updateEvent(eventData.value);

  } else {
    createEvent(eventData.value, eventData.value.image as File);
    
  }

  
};

const triggerFileUpload = (event: Event): void => {
  event.preventDefault();
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Handle file input change event
const handleFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file) {
    eventData.value.image = file;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        imagePreview.value = e.target.result as string; // Set image preview
      }
    };
    reader.readAsDataURL(file);
  }
};

const deleteImagePreview = (event:Event) => {
  event.preventDefault();
  imagePreview.value = null;
  eventData.value.image = '';
};
async function createEvent(eventData:any, eventImage:File) {
  try {
    if (!eventData.image) {
      throw new Error("No image file selected");
    }

    const rawData = toRaw(eventData);
    console.log(rawData);
    const createEvent = await useEvent().createEvent(rawData, eventImage);
    if (createEvent) {
      navigateTo(APPURL.ORG_EVENTS);
    } else {
      alert("Event creation failed");
    }
  } catch (error) {
    console.log(error);
    alert("Error creating event");
  }
}
const updateEvent = async(submit:EventData) => {
  try {
      const rawData = toRaw(eventData.value);
      eventData.value = submit;
      
      await useEvent().updateEvent(eventData.value.id!,rawData);
      
  } catch (error) {
    console.error("Error updating event:", error);
    
  }
 
};


/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////

</script>
<template>
  <div>
    <form @submit.prevent="handleSubmit" class="space-y-3 mb-2 mt-2">
      <div
        class="  border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <!-- Image preview or icon if no image -->
       
        <div v-if="imagePreview || eventData.image" class="mb-4 relative">
          <img
            :src="imagePreview || eventData.image?.toString() "
            alt="Uploaded image"
            class="max-w-full rounded-lg shadow-lg"
          />
          <div v-if="imagePreview || eventData.image" class="absolute right-2 top-2">

            <button @click="deleteImagePreview">
              <Icon name="material-symbols:cancel-outline" class="text-red-700 w-10 h-10"></Icon>
            </button>
          </div>
        </div>

        <div v-else class="flex flex-col items-center text-gray-500">
          <!-- Placeholder Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mb-4 text-gray-400"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7h18M3 12h18m-9 5h9"
            />
          </svg>

          <!-- Button to trigger the file input -->
          <button
            @click="triggerFileUpload"
            class="bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v16m16-16v16M4 4h16m-8 4v8m-4-4h8"
              />
            </svg>
            Upload Image
          </button>
        </div>

        <!-- Hidden file input -->
        <input

          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileChange"
          accept="image/*"
          
        />
      </div>
      <div>
        Title
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Title"
          v-model="eventData.title"
          required
        />
      </div>

      <div>
        Purpose
        <textarea
          class="textarea h-24 textarea-bordered w-full"
          placeholder="Overview"
          v-model="eventData.purpose"
          required
        ></textarea>
      </div>
      <div>
        Description
        <textarea
          class="textarea h-24 textarea-bordered w-full"
          placeholder="Description"
          v-model="eventData.description"
          required
        ></textarea>
      </div>
      <div>
        Role
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Role"
          v-model="eventData.role"
          required
        />
      </div>
    
    
      <div class="flex flex-col">
        Event type
        <select v-model="eventData.eventType" class="select select-bordered w-full max-w-xs" required>
          <option
            v-for="eventType in volunteerEventTypes"
            :key="eventType"
            :value="eventType"
          >
            {{ eventType }}
          </option>
        </select>
      </div>
      <div class="flex flex-row gap-4">
        <div>
        Date
        <input
          type="date"
          class="input input-bordered w-full"
          placeholder="Date"
          v-model="eventData.date"
          name="date"
          required
          min=""
        />
      </div>
        <div>
          Start Time
          <input
            type="time"
            class="input input-bordered w-full"
            name="startTime"
            placeholder="Start Time"
            v-model="eventData.startTime"
            required
          />
        </div>
        <div>
          End Time
          <input
            type="time"
            class="input input-bordered w-full"
            name="endTime"
            placeholder="End Time"
            v-model="eventData.endTime"
            required
          />
        </div>
      </div>
      <div>
        Location
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Location"
          v-model="eventData.location"
          required
        />
      </div>
      <div v-if="!props.event">
        <button class="btn btn-primary">Create</button>
      </div>
      <div v-else class="flex gap-2 m-2">
        <button class="btn btn-primary">Update</button>
        
      </div>
    </form>
  </div>
</template>

<style scoped></style>
