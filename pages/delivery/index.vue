<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
const searchKey = ref("");
const filterModal = ref(false);
const actions = reactive<Action[]>([
  {
    text: "Refresh",
    icon: "ic:round-refresh",
    color: "white",
    click: async () => initializaData(),
  },
]);
</script>
<template>
  <section id="deliveryHead">
    <Topbar
      page-title="Pengiriman Botol"
      :use-actions="true"
      :actions="actions"
    />

    <div class="menu-bar my-6">
      <div class="flex gap-2 mb-4 md:mb-0">
        <p>Status:</p>
        <div class="button-group">
          <button type="button" class="btn-rsvp-status pending">Semua</button>
          <button type="button" class="btn-rsvp-status new">
            <Pic></Pic>ublish
          </button>
          <button type="button" class="btn-rsvp-status arrived">Selesai</button>
          <button type="button" class="btn-rsvp-status">Draft</button>
        </div>
      </div>

      <div class="flex justify-end gap-2 md:w-1/2">
        <button type="button" class="btn-add-guest" @click="filterModal = true">
          <div class="new">
            <Iconify icon="mdi:filter" class="text-primaryBg text-xl" />
            <p>Filter</p>
          </div>
          <p class="block lg:hidden">
            <Iconify
              icon="mdi:plus-circle"
              class="mx-auto text-primaryBg text-xl"
            />
          </p>
        </button>

        <div class="devider hidden md:block"></div>
        <button
          type="button"
          class="btn-add-guest"
          @click="navigateTo('/bottle-keeping/add')"
        >
          <div class="new">
            <Iconify icon="mdi:plus-circle" class="text-primaryBg text-xl" />
            <p>Tambah</p>
          </div>
          <p class="block lg:hidden">
            <Iconify
              icon="mdi:plus-circle"
              class="mx-auto text-primaryBg text-xl"
            />
          </p>
        </button>
      </div>
    </div>
  </section>
  <section id="deliveryBody" class="page-body">
    <div class="mt-8 overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th>No Surat</th>
            <th>Tanggal Kirim</th>
            <th>Tanggal Terima</th>
            <th>Outlet</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="navigateTo(`/delivery/${1}`)"
          >
            <td class="text-center">1</td>
            <td>2021/0001</td>
            <td>12/12/2021</td>
            <td>12/12/2021</td>
            <td>Outlet 1</td>
            <td class="text-center">
              <span class="status-pill bg-success">Selesai</span>
            </td>
          </tr>
          <tr
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="navigateTo(`/delivery/${1}`)"
          >
            <td class="text-center">1</td>
            <td>2021/0001</td>
            <td>12/12/2021</td>
            <td>12/12/2021</td>
            <td>Outlet 1</td>
            <td class="text-center">
              <span class="status-pill bg-blue-400 text-primaryText"
                >Publish</span
              >
            </td>
          </tr>
          <tr
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="navigateTo(`/delivery/${1}`)"
          >
            <td class="text-center">1</td>
            <td>2021/0001</td>
            <td>12/12/2021</td>
            <td>12/12/2021</td>
            <td>Outlet 1</td>
            <td class="text-center">
              <span class="status-pill bg-success">Selesai</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div v-else class="text-center mt-10">
      <NuxtImg
        preload
        src="/images/icon-not-found.svg"
        class="m-auto"
        width="160px"
        loading="lazy"
        quality="80"
        alt="No Data"
      />
      <h4 class="mt-2 text-primaryText subtitle-1-r">No Data</h4>
    </div> -->
  </section>
  <Modal
    v-if="filterModal"
    :use-button="true"
    :form-mode="true"
    :open-global-modal="filterModal"
    @close="filterModal = false"
  >
    <h2>Filter</h2>
    <form @submit.prevent="">
      <div class="flex flex-col w-full mb-4">
        <label class="text-primaryText">No Surat</label>
        <input
          type="text"
          class="p-2 bg-primaryBg/70 rounded-md focus:outline-brandSecondary placeholder-secondaryText/70"
          placeholder="Masukkan No Surat"
        />
      </div>
      <div class="w-full mb-4">
        <label class="text-primaryText" for="date">Tanggal</label>
        <Datepicker dark placeholder="Pilih Tanggal" class="w-1/4" />
      </div>
      <div class="w-full mb-4">
        <label class="text-primaryText" for="date">Outlet</label>
        <select class="form-select">
          <option disabled selected>Pilih Outlet</option>
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="name">Nama</option>
        </select>
      </div>
    </form>
  </Modal>
</template>
