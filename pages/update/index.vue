<script setup lang="ts">
import { ipcRenderer, IpcRenderer } from "electron";

const ipc = ipcRenderer;
const progress = ref("0");

ipc.on("downloaded_progress", (event, args) => {
  progress.value = args;
});

definePageMeta({
  layout: "auth",
});
</script>
<template>
  <section id="updatePage" class="h-screen">
    <div class="flex flex-col items-center h-full justify-center">
      <img
        preload
        src="/images/logo/hwg-logo.svg"
        class="mx-auto"
        width="160px"
        alt="Outlet Management Tools"
      />
      <h1 class="headline-3 text-primaryText leading-relaxed">
        Sedang melakukan pembaruan aplikasi
      </h1>
      <p class="text-primaryText font-poppins-r">{{ progress }}</p>
    </div>
  </section>
</template>
