<script setup lang="ts">
import { ipcRenderer } from "electron";

const ipc = ipcRenderer;

onMounted(() => {
  ipc.on("update_available", () => {
    navigateTo("/update");
  });
});
</script>

<template>
  <Snackbar />
  <Dialog />
  <Loading />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
