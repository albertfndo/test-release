<script setup lang="ts">
const _controller = useLoading();
</script>

<template>
  <div v-show="_controller.isLoading" class="overlay"></div>

  <div v-show="_controller.isLoading" class="modal-wrapper">
    <div class="loader">
      <div class="square-circle"></div>
      <div class="loader-text">
        <p>{{ _controller.text }}</p>
      </div>
    </div>
  </div>
</template>
