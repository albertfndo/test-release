<script setup lang="ts"></script>
<template>
  <NuxtLoadingIndicator />
  <Watermark v-if="!isProduction()" />

  <main>
    <slot />
  </main>
</template>
