<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
  openGlobalModal: boolean;
  formMode?: boolean;
  useButton?: boolean;
}>();

const emits = defineEmits(["update:modelValue", "close", "submit"]);
const modalDialog = ref(null);

onClickOutside(modalDialog, () => emits("close"));
</script>

<template>
  <div v-show="props.openGlobalModal" class="overlay"></div>

  <Transition name="fade">
    <div v-show="props.openGlobalModal" class="modal-wrapper">
      <div ref="modalDialog" class="modal-card">
        <form class="general-form" @submit.prevent="emits('submit')">
          <slot></slot>

          <div v-if="props.useButton">
            <div v-if="props.formMode" class="mt-8 grid grid-cols-2 gap-3">
              <button type="button" class="exit" @click="emits('close')">
                Tutup
              </button>
              <button type="button" class="confirm" @click="emits('submit')">
                Simpan
              </button>
            </div>
            <div v-else class="mt-8 text-center">
              <button type="button" class="success" @click="emits('close')">
                Tutup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>
