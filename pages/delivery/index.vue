<script setup lang="ts">
const searchKey = ref("");
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
          <button type="button" class="btn-rsvp-status new">Dipublish</button>
          <button type="button" class="btn-rsvp-status arrived">Selesai</button>
          <button type="button" class="btn-rsvp-status">Draft</button>
        </div>
      </div>

      <div class="flex justify-end gap-2 md:w-1/2">
        <select class="form-select w-1/3">
          <option disabled selected>Pilih Outlet</option>
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="name">Nama</option>
        </select>
        <form class="search w-1/3" @submit.prevent="searchData()">
          <input
            v-model="searchKey"
            type="text"
            placeholder="Cari sesuatu..."
          />
          <button @click="searchData()">
            <Iconify icon="material-symbols:search" class="text-xl" />
          </button>
        </form>
        <div class="devider hidden md:block"></div>
        <button
          type="button"
          class="btn-add-guest"
          @click="navigateTo('/bottle-keeping/add')"
        >
          <div class="new">
            <Iconify icon="mdi:plus-circle" class="text-primaryBg text-xl" />
            <p>Tambah Data</p>
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
              <span class="status-pill bg-success">Complete</span>
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
              <span class="status-pill bg-success">Complete</span>
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
</template>
