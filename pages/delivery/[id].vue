<script setup lang="ts">
import moment from "moment";
import { DeliveryStatus } from "~/models/Delivery";
import { BottleStatus } from "~/models/KeepingData";

const _delivery = useDelivery();
const route = useRoute();
const completeModal = ref(false);
const deleteModal = ref(false);
const lostBottle = ref(0);

onMounted(() => {
  nextTick(() => {
    initialize();
  });
});

async function initialize() {
  await _delivery.getDeliveryById(parseInt(route.params.id));

  if (_delivery.delivery.bottles) {
    lostBottle.value = _delivery.delivery.bottles.filter(
      (bottle) => bottle.status != BottleStatus.lostOnDelivery
    ).length;
  }
}

function getDate(date: string) {
  return moment(date).format("DD MMM YYYY");
}

function changeStatus(status: number) {
  _delivery.updateDelivery(parseInt(route.params.id), status);
}

function deleteData() {
  _delivery.deleteDelivery(parseInt(route.params.id));
}

function chooseBottle(id: number) {
  if (_delivery.form.bottles.includes(id)) {
    _delivery.form.bottles = _delivery.form.bottles.filter(
      (bottleId: number) => bottleId !== id
    );
  } else {
    _delivery.form.bottles.push(id);
  }
}
</script>
<template>
  <section id="detailHead" class="without-topbar">
    <div class="flex justify-between">
      <div class="flex items-center gap-4">
        <button
          type="button"
          class="btn-regular-nav"
          @click="navigateTo('/delivery')"
        >
          <Iconify
            icon="ic:round-chevron-left"
            class="text-primaryText text-2xl"
          />
        </button>
        <h1 class="subtitle-2 text-primaryText">Detail Surat Jalan</h1>
      </div>

      <div
        v-show="_delivery.delivery.status == DeliveryStatus.draft"
        class="flex gap-4"
      >
        <button class="btn-status confirmed hover:active duration-200">
          <Iconify icon="tabler:trash-x" class="text-lg md:hidden" />
          <span class="detail" @click="deleteModal = true">Hapus</span>
        </button>
        <button class="btn-full no-bg">
          <Iconify icon="ic:round-edit" class="text-lg md:hidden" />
          <span class="detail">Edit</span>
        </button>
        <button
          class="btn-status pending active"
          @click="changeStatus(DeliveryStatus.publish)"
        >
          <Iconify icon="material-symbols:publish" class="text-lg md:hidden" />
          <span class="detail">Publish</span>
        </button>
      </div>
      <div
        v-show="
          isAdmin() &&
          ![DeliveryStatus.draft, DeliveryStatus.selesai].includes(
            _delivery.delivery.status
          )
        "
      >
        <button class="btn-status pending active">
          <Iconify
            icon="icon-park-outline:delivery"
            class="text-lg md:hidden"
          />
          <span class="detail" @click="completeModal = true">Sampai</span>
        </button>
      </div>
    </div>
  </section>

  <section id="detailHead" class="page-body">
    <div class="card mb-4">
      <div class="card-header">
        <Iconify icon="mdi:form-outline" class="text-primaryText" />
        <h2>NO. 123123/123123/2023</h2>
      </div>
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div class="flex items-center gap-2">
            <Iconify icon="ic:round-date-range" class="text-primaryText" />
            <p class="text-primaryText">
              {{
                getDate(_delivery.delivery?.createdAt) +
                " / " +
                getDate(_delivery.delivery?.updatedAt)
              }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Iconify icon="ic:round-location-on" class="text-primaryText" />
            <p class="text-primaryText">{{ _delivery.delivery.outlet }}</p>
          </div>
          <div class="flex items-center gap-2">
            <Iconify icon="ic:round-person" class="text-primaryText" />
            <p class="text-primaryText">{{ _delivery.delivery.createdBy }}</p>
          </div>
          <div class="flex items-center gap-2">
            <Iconify icon="game-icons:beer-bottle" class="text-primaryText" />
            <p class="text-primaryText">
              {{ lostBottle }} / {{ _delivery.delivery.bottles?.length }} (Pcs)
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Iconify
              icon="material-symbols:draft-orders"
              class="text-primaryText"
            />
            <p class="text-primaryText">
              {{ _delivery.delivery.deliveryStatusIndonesian }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <p v-show="isAdmin()" class="text-red-500 font-poppins-r mb-1">
      *Centang botol yang hilang diperjalanan
    </p>
    <div class="max-h-[70vh] overflow-y-auto">
      <table class="w-full">
        <thead>
          <tr>
            <th
              v-show="
                isAdmin() && _delivery.delivery.status != DeliveryStatus.selesai
              "
              class="w-[3%]"
            >
              #
            </th>
            <th class="w-[3%]">No</th>
            <th>Nama Botol</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bottleData, index) in _delivery.delivery.bottles"
            :key="index"
          >
            <td
              v-show="
                isAdmin() && _delivery.delivery.status != DeliveryStatus.selesai
              "
            >
              <input type="checkbox" @change="chooseBottle(bottleData.id)" />
            </td>
            <td>{{ index + 1 }}</td>
            <td>{{ bottleData.bottleName }}</td>
            <td
              :class="
                bottleData.status == BottleStatus.lostOnDelivery
                  ? 'text-red-500'
                  : ''
              "
            >
              {{ bottleData.bottleStatusIndoText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal
      v-show="completeModal"
      :open-global-modal="completeModal"
      :form-mode="true"
      :use-button="true"
      :use-small-modal="true"
      @submit="changeStatus(DeliveryStatus.selesai)"
      @close="completeModal = false"
    >
      <h2>Konfirmasi Pengiriman</h2>
      <p>Apakah anda yakin ingin menyelesaikan pengiriman ini?</p>
      <textarea
        v-model="_delivery.form.notes"
        placeholder="Catatan Pengiriman"
        rows="5"
        class="global-textarea mt-2"
      ></textarea>
    </Modal>
    <Modal
      v-show="deleteModal"
      :open-global-modal="deleteModal"
      :form-mode="true"
      :use-button="true"
      :use-small-modal="true"
      @submit="deleteData()"
      @close="deleteModal = false"
    >
      <h2>Konfirmasi Penghapusan</h2>
      <p>Apakah anda yakin ingin menghapus data pengiriman ini?</p>
    </Modal>
  </section>
</template>
