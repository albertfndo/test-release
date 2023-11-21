<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
  bottleKeepDetail: any;
  openDetailModal: boolean;
  isRekeep: boolean;
}>();

const emits = defineEmits(["close", "release", "rekeep"]);
const modalDialog = ref(null);

onClickOutside(modalDialog, () => emits("close"));
</script>

<template>
  <div v-show="props.openDetailModal" class="overlay"></div>

  <Transition name="fade">
    <div v-show="props.openDetailModal" class="modal-wrapper">
      <div ref="modalDialog" class="modal-card">
        <div class="flex items-center justify-between">
          <h2>Detail</h2>
          <button class="close" @click="emits('close')">
            <Iconify icon="ant-design:close-outlined" class="text-2xl" />
          </button>
        </div>

        <div class="bottle-detail">
          <div class="detail-items">
            <p class="detail-items-label">Bottle Name</p>
            <p>: Rendhy Widjaja</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Guest Name</p>
            <p>: Rendhy Widjaja</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Phone Number</p>
            <p>: +6282115831114</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Expired Date</p>
            <p>: 26 Nov 2023</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Status</p>
            <p>: Locked</p>
          </div>
        </div>

        <div class="bottle-detail">
          <div class="detail-items">
            <p>#1 Keeping</p>
          </div>
          <div class="rounded-lg aspect-video w-full bg-gray-300 h-auto"></div>

          <p class="brand mt-4">Keeping</p>
          <div class="detail-items">
            <p class="detail-items-label">Date</p>
            <p>: 26 Nov 2021</p>
          </div>
          <p class="detail-items-label">Notes</p>
          <textarea class="global-textarea" rows="5" readonly></textarea>

          <p class="brand mt-4">Pick Up</p>
          <div class="detail-items">
            <p class="detail-items-label">Date</p>
            <p>: -</p>
          </div>
          <p class="detail-items-label">Notes</p>
          <textarea class="global-textarea" rows="5" readonly></textarea>
        </div>

        <div class="mb-14"></div>
      </div>
      <div class="sticky-button">
        <button
          type="button"
          class="btn-full active"
          @click="!props.isRekeep ? emits('release') : emits('rekeep')"
        >
          {{ !props.isRekeep ? "Release" : "Rekeep" }}
        </button>
      </div>
    </div>
  </Transition>
</template>
