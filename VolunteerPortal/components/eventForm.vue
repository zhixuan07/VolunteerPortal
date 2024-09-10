<script setup lang="ts">
/////////////////////////////////////////Imports//////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Meta////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Variables///////////////////////////////////////////////////////////////////////
const emit = defineEmits(["submit"]);
const props = defineProps({
  event: {
    type: Object as () => EventData | null,
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
  image: props.event?.image,
});

/////////////////////////////////////////Functions///////////////////////////////////////////////////////////////////////
const handleFileUpload = (event: Event) => {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    eventData.value.image = target.files[0];
  }
};
const handleSubmit = () => {
  emit("submit", { ...eventData.value });
};

const triggerFileUpload = (event:Event): void => {
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
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        imagePreview.value = e.target.result as string; // Set image preview
      }
    };
    reader.readAsDataURL(file);
  }
};

// Handle drag over event
const handleDragOver = (event: DragEvent): void => {
  event.preventDefault();
};

// Handle file drop event
const handleDrop = (event: DragEvent): void => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        imagePreview.value = e.target.result as string; // Set image preview
      }
    };
    reader.readAsDataURL(file);
  }
};
/////////////////////////////////////////Initialisations///////////////////////////////////////////////////////////////
onMounted(() => {
  console.log("Event props data", props.event);
});
</script>
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        Image
        <div>
          <input
            type="file"
            class="file-input w-full"
            placeholder="Image"
            @change="handleFileUpload"
          />
        </div>
        <div></div>
      </div>
      <div
        class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors"
       
      >
        <!-- Image preview or icon if no image -->
        <div v-if="imagePreview" class="mb-4">
          <img
            :src="imagePreview"
            alt="Uploaded image"
            class="max-w-full rounded-lg shadow-lg"
          />
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
        />
      </div>

      <div>
        Purpose
        <textarea
          class="textarea h-24 textarea-bordered w-full"
          placeholder="Overview"
          v-model="eventData.purpose"
        ></textarea>
      </div>
      <div>
        Description
        <textarea
          class="textarea h-24 textarea-bordered w-full"
          placeholder="Description"
          v-model="eventData.description"
        ></textarea>
      </div>
      <div>
        Role
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Role"
          v-model="eventData.role"
        />
      </div>
      <div></div>
      <div>
        Date
        <input
          type="date"
          class="input input-bordered w-full"
          placeholder="Date"
          v-model="eventData.date"
        />
      </div>
      <div>
        Event type
        <select
          class="select select-bordered w-full"
          placeholder="Event type"
          v-model="eventData.eventType"
        >
          <option>Youth</option>
          <option>HealthCare</option>
        </select>
      </div>
      <div class="flex flex-row">
        <div>
          Start Time
          <input
            type="time"
            class="input input-bordered w-full"
            placeholder="Start Time"
            v-model="eventData.startTime"
          />
        </div>
        <div>
          End Time
          <input
            type="time"
            class="input input-bordered w-full"
            placeholder="End Time"
            v-model="eventData.endTime"
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
        />
      </div>
      <div v-if="!props.event">
        <button class="btn btn-primary">Create</button>
      </div>
      <div v-else>
        <button class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
