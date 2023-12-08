<template>
  <NuxtLoadingIndicator />
  <Watermark v-if="!isProduction()" />

  <main id="auth">
    <slot />
  </main>
</template>
