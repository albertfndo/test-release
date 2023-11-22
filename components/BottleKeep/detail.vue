<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import moment from "moment";
import KeepingData from "~/models/KeepingData";

const props = defineProps<{
  bottleKeepDetail: KeepingData | null;
  openDetailModal: boolean;
  isRekeep: boolean;
}>();

const emits = defineEmits(["close", "release", "rekeep"]);
const modalDialog = ref(null);

function getDate(date: string | undefined) {
  return date ? moment(date).format("DD MMM YYYY, HH:mm") : "-";
}

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
            <p>: {{ props.bottleKeepDetail?.bottleName }}</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Guest Name</p>
            <p>: {{ props.bottleKeepDetail?.customer?.name }}</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Phone Number</p>
            <p>: {{ props.bottleKeepDetail?.customer?.phone }}</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Expired Date</p>
            <p>
              :
              {{ getDate(props.bottleKeepDetail?.expiredAt) }}
            </p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Status</p>
            <p>: {{ props.bottleKeepDetail?.statusText }}</p>
          </div>
        </div>
        <div
          v-for="(history, index) in props.bottleKeepDetail?.histories"
          v-show="props.bottleKeepDetail?.histories.length"
          :key="index"
          class="bottle-detail"
        >
          <div class="detail-items">
            <p>#{{ index + 1 }} Keeping</p>
          </div>
          <img
            :src="history.imageUrl"
            class="rounded-lg aspect-video w-full bg-gray-300 h-auto"
            alt="Detail Photo"
          />

          <p class="brand mt-4">Keeping</p>
          <div class="detail-items">
            <p class="detail-items-label">Date</p>
            <p>: {{ getDate(history.stored_at) }}</p>
          </div>
          <p class="detail-items-label">Notes</p>
          <textarea
            v-model="history.description"
            class="global-textarea"
            rows="5"
            readonly
          ></textarea>

          <p class="brand mt-4">Pick Up</p>
          <div class="detail-items">
            <p class="detail-items-label">Date</p>
            <p>
              :
              {{ getDate(history.released_at) }}
            </p>
          </div>
          <p class="detail-items-label">Notes</p>
          <textarea
            v-model="history.release_notes"
            class="global-textarea"
            rows="5"
            readonly
          ></textarea>
          <div class="mb-14"></div>
        </div>
      </div>
      <div
        v-show="props.bottleKeepDetail?.histories.length"
        class="sticky-button"
      >
        <button
          type="button"
          class="btn-full"
          :class="
            props.bottleKeepDetail?.status == 1 ? 'exit' : 'btn-full active'
          "
          :disabled="props.bottleKeepDetail?.status == 1"
          @click="
            props.bottleKeepDetail?.status == 2
              ? emits('release')
              : emits('rekeep')
          "
        >
          {{
            props.bottleKeepDetail?.status == 2 ||
            props.bottleKeepDetail?.status == 1
              ? "Release"
              : "Rekeep"
          }}
        </button>
      </div>
    </div>
  </Transition>
</template>
