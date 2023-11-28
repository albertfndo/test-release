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

function showButton() {
  return (
    props.bottleKeepDetail?.histories.length &&
    props.bottleKeepDetail.status != 4
  );
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
            <p class="detail-items-label">Nama Botol</p>
            <p>: {{ props.bottleKeepDetail?.bottleName }}</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Nama Tamu</p>
            <p>: {{ props.bottleKeepDetail?.userFullName }}</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">No. Tlpn</p>
            <p>: {{ props.bottleKeepDetail?.phoneNumber }}</p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Tanggal Expired</p>
            <p>
              :
              {{ getDate(props.bottleKeepDetail?.expiredAt) }}
            </p>
          </div>
          <div class="detail-items">
            <p class="detail-items-label">Status</p>
            <p>: {{ props.bottleKeepDetail?.bottleStatusIndoText }}</p>
          </div>
        </div>
        <div
          v-for="(history, index) in props.bottleKeepDetail?.histories"
          v-show="props.bottleKeepDetail?.histories.length"
          :key="index"
          class="bottle-detail"
        >
          <div class="detail-items">
            <p>Penyimpanan #{{ index + 1 }}</p>
          </div>
          <NuxtImg
            preload
            :src="history.imageUrl"
            class="rounded-lg aspect-video w-full bg-gray-300 object-cover"
            loading="lazy"
            quality="100"
            alt="Bottle Image"
            :placeholder="[50, 25, 75]"
          />

          <p class="brand mt-4">Penyimpanan</p>
          <div class="detail-items">
            <p class="detail-items-label">Tanggal</p>
            <p>: {{ getDate(history.stored_at) }}</p>
          </div>
          <p class="detail-items-label">Catatan</p>
          <textarea
            v-model="history.description"
            class="global-textarea"
            rows="5"
            readonly
          ></textarea>

          <p class="brand mt-4">Pengambilan</p>
          <div class="detail-items">
            <p class="detail-items-label">Tanggal</p>
            <p>
              :
              {{ getDate(history.released_at) }}
            </p>
          </div>
          <p class="detail-items-label">Catatan</p>
          <textarea
            v-model="history.release_notes"
            class="global-textarea"
            rows="5"
            readonly
          ></textarea>
          <div v-show="showButton()" class="mb-14"></div>
        </div>
        <div v-show="showButton()" class="sticky-button">
          <button
            v-show="[1, 2].includes(props.bottleKeepDetail?.status)"
            type="button"
            class="btn-full"
            :class="
              props.bottleKeepDetail?.status == 1
                ? 'exit'
                : 'btn-full active border-none'
            "
            :disabled="props.bottleKeepDetail?.status == 1"
            @click="emits('release')"
          >
            Release
          </button>
          <button
            v-show="props.bottleKeepDetail?.status == 3"
            type="button"
            class="btn-full"
            :class="
              props.bottleKeepDetail?.status == 1
                ? 'exit'
                : 'btn-full active  border-none'
            "
            :disabled="props.bottleKeepDetail?.status == 1"
            @click="emits('rekeep')"
          >
            Rekeep
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
