<script setup lang="ts">
const _controller = useSnackbar();

function exit() {
  _controller.tapExit();
}
</script>

<template>
  <Transition name="slideup">
    <div
      v-show="_controller.isShown"
      class="snackbar-modal-wrapper"
      @click="exit"
    >
      <div class="container">
        <div
          class="snackbar-modal-card"
          :class="_controller.isSuccess ? 'bg-success' : 'bg-danger'"
        >
          <div class="flex items-center gap-4">
            <Iconify
              :icon="
                _controller.isSuccess
                  ? 'mdi:checkbox-multiple-marked-circle-outline'
                  : 'mdi:close-octagon'
              "
              class="text-primaryText text-4xl"
            />
            <div class="small-modal-content">
              <h2>{{ _controller.title }}</h2>
              <p v-html="_controller.message"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
