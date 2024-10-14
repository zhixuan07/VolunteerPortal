<script setup lang="ts">
const mobileMenuOpen = ref(false);
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';

async function logout() {
    const auth = useFirebaseAuth();
    auth.logout();
    reloadNuxtApp();
}

const toggleNav   = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    console.log(mobileMenuOpen.value);
};</script>

<template>
<div class="flex">
    <div>
      <aside
        class="bg-orange-600 h-screen w-64 hidden sm:flex flex-col items-center pt-5 pb-2 space-y-7 relative"
      >
        <div
          class="w-full pr-3 pl-4 flex flex-col gap-y-1 text-white fill-white text-sm"
        >
          <div
            class="font-QuicksandMedium pl-4 text-orange-200/80 flex gap-2 items-center text-[15px] uppercase"
          >
            VConnect
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-white transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 text-sm"
            >
              <NuxtLink to="/admin/applications" class="font-QuicksandMedium text-white"
                >Account Applications</NuxtLink
              >
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-white transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 text-sm"
            >
              <NuxtLink to="/admin/organisations" class="font-QuicksandMedium text-white"
                >Manage Organisations</NuxtLink
              >
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-white transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 text-sm"
            >
              <NuxtLink to="/admin/reports" class="font-QuicksandMedium text-white"
                ></NuxtLink
              >
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-white transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 text-sm"
            >
              <NuxtLink class="font-QuicksandMedium text-white" to="/"
                ></NuxtLink
              >
            </div>
          </div>
        </div>

        <!-- Profile Section -->
        <div
          class="w-full pr-3 pl-4 flex flex-col gap-y-1 text-white fill-white text-sm"
        >
          <div
            class="font-QuicksandMedium pl-4 text-orange-200/80 text-xs text-[11px] uppercase"
          >
            Profile
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-white transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 text-sm"
            >
              <span class="font-QuicksandMedium text-white">Edit Profile</span>
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-white transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 text-sm"
            >
              <span @click="logout" class="font-QuicksandMedium text-white">Log Out</span>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div class="flex-grow h-screen overflow-x-auto">
      <div class="sm:hidden w-screen sticky top-0 bg-orange-500">
        <div
          @click="toggleNav"
          class="flex justify-start items-center h-10 md:hidden"
        >
          <button type="button" class="text-white ml-4 focus:outline-none">
            <svg viewBox="0 0 24 24" class="w-7 h-7 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
        <nav :class="mobileMenuOpen ? 'flex-col' : 'hidden'">
          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-80 self-stretch pl-1 rounded flex items-center space-x-2 transition-all duration-200 text-sm"
              href="#"
            >
              <NuxtLink
                class="font-QuicksandMedium text-white ml-4 text-lg"
                >Home</NuxtLink
              >
            </div>
          </div>
          <div
            class="w-full flex flex-col items-center gap-x-1.5 group select-none"
          >
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-80 self-stretch pl-1 rounded flex items-center space-x-2 transition-all duration-200 text-sm"
              href="#"
            >
              <NuxtLink
                to="/"
                class="font-QuicksandMedium text-white ml-4 text-lg"
                >Dashboard</NuxtLink
              >
            </div>
          </div>
        </nav>
      </div>
      <RouterView></RouterView>
    </div>
  </div>

</template>

<style scoped></style>
