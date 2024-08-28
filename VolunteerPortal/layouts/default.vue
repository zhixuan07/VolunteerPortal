<script setup lang="ts">
const mobileMenuOpen = ref(false);


const toggleNav   = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    console.log(mobileMenuOpen.value);
};</script>

<template>
  <div class="flex">
    <div>
      <aside
        class="bg-[#1c212c] h-screen w-64 hidden sm:flex flex-col items-center pt-5 pb-2 space-y-7 relative"
      >
        <div
          class="w-full pr-3 pl-4 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
        >
          <div
            class="font-QuicksandMedium pl-4 text-gray-400/60 flex gap-2 items-center text-[15px] uppercase"
          >
           
            VConnect
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <NuxtLink to="/admin" class="font-QuicksandMedium"
                >   Account Applications</NuxtLink
              >
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <NuxtLink to="/admin/organisations" class="font-QuicksandMedium"
                >Manage Organisations</NuxtLink
              >
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <router-link to="/admin/reports" class="font-QuicksandMedium"
                >Reports</router-link
              >
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <router-link class="font-QuicksandMedium" to="/adminAppointment"
                ></router-link
              >
            </div>
          </div>
        </div>

        <!-- menu items -->
        <div
          class="w-full pr-3 pl-4 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
        >
          <div
            class="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase"
          >
            Profile
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <span class="font-QuicksandMedium">edit profile</span>
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <span class="font-QuicksandMedium">log out</span>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div class="flex-grow h-screen overflow-x-auto">
      <div class="sm:hidden w-screen sticky top-0 bg-[#1c212c]">
        <div
          @click="toggleNav"
          class="flex justify-start items-center h-10 md:hidden"
        >
          <button type="button" class="text-white ml-4 focus:outline-none">
            <svg viewBox="0 0 24 24" class="w-7 h-7 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
        <nav :class="mobileMenuOpen ? 'flex-col' : 'hidden'">
          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-80 self-stretch pl-1 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <routerLink
                to="/adminDashboard"
                class="font-QuicksandMedium text-white ml-4 text-lg"
                >Home</routerLink
              >
            </div>
          </div>
          <div
            class="w-full flex flex-col items-center gap-x-1.5 group select-none"
          >
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-80 self-stretch pl-1 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <routerLink
                to="/adminDashboard"
                class="font-QuicksandMedium text-white ml-4 text-lg"
                >Home</routerLink
              >
            </div>
          </div>
        </nav>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
