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
const detailModal = ref(props.openDetailModal);
const showLogs = ref(false);

function getDate(date: string | undefined) {
  return date ? moment(date).format("DD MMM YYYY, HH:mm") : "-";
}

function showButton() {
  return (
    props.bottleKeepDetail?.histories.length &&
    props.bottleKeepDetail.status != 4
  );
}

function logsAction() {
  detailModal.value = !detailModal.value;
  showLogs.value = !showLogs.value;
}

onClickOutside(modalDialog, () => emits("close"));
</script>

<template>
  <div v-show="detailModal || showLogs" class="overlay"></div>

  <Transition name="fade">
    <div v-if="detailModal" class="modal-wrapper">
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
          <div class="detail-items">
            <button
              v-show="isAdmin()"
              class="btn-xs general w-mwwwwax"
              @click="logsAction()"
            >
              <Iconify
                icon="ant-design:file-search-outlined"
                class="text-base"
              />
              <span>Lihat Logs</span>
            </button>
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
    <div v-else class="modal-wrapper">
      <div ref="modalDialog" class="modal-card">
        <h2>Logs</h2>
        <table class="w-full bg-primaryBg/20">
          <thead>
            <tr>
              <th>No</th>
              <th>Action</th>
              <th>Catatan</th>
              <th>Dibuat oleh</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(log, index) in props.bottleKeepDetail?.logs"
              :key="index"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ log.actionText }}</td>
              <td>{{ log.notes }}</td>
              <td>{{ log.createdBy }}</td>
            </tr>
          </tbody>
        </table>
        <button class="exit mt-4" @click="logsAction()">Tutup</button>
      </div>
    </div>
  </Transition>
</template>
