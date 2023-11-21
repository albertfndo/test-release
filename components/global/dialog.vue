<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const _controller = useDialog();
const modalDialog = ref(null);

onClickOutside(modalDialog, () => (_controller.isShown = false));
</script>

<template>
  <div v-show="_controller.isShown" class="overlay"></div>

  <Transition name="fade">
    <div v-show="_controller.isShown" class="modal-wrapper">
      <div ref="modalDialog" class="modal-card">
        <h2>{{ _controller.title }}</h2>
        <p v-html="_controller.content"></p>

        <div class="mt-8 flex justify-center gap-3">
          <button
            v-if="_controller.showBack"
            type="button"
            class="exit"
            @click="_controller.callback.onTapBack"
          >
            {{ _controller.backText }}
          </button>
          <button
            type="button"
            class="confirm"
            @click="_controller.callback.onTapConfirm"
          >
            {{ _controller.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
