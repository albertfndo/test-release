<script setup lang="ts"></script>
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
      <div class="hidden md:flex gap-4">
        <button class="btn-general">Edit</button>
        <button class="btn-general">Publish</button>
      </div>
      <div class="flex md:hidden gap-4">
        <button class="btn-general">
          <Iconify icon="ic:round-edit" class="text-lg" />
        </button>
        <button class="btn-general">
          <Iconify icon="ic:round-publish" class="text-lg" />
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
            <p class="text-primaryText">12 November 2023 / Belum diterima</p>
          </div>
          <div class="flex items-center gap-2">
            <Iconify icon="ic:round-location-on" class="text-primaryText" />
            <p class="text-primaryText">Helen's Epicentrum</p>
          </div>
          <div class="flex items-center gap-2">
            <Iconify icon="ic:round-person" class="text-primaryText" />
            <p class="text-primaryText">Helen</p>
          </div>
          <div class="flex items-center gap-2">
            <Iconify icon="game-icons:beer-bottle" class="text-primaryText" />
            <p class="text-primaryText">70 / 120 (Pcs)</p>
          </div>
          <div class="flex items-center gap-2">
            <Iconify
              icon="material-symbols:draft-orders"
              class="text-primaryText"
            />
            <p class="text-primaryText">Draft</p>
          </div>
        </div>
      </div>
    </div>
    <div class="max-h-[70vh] overflow-y-auto">
      <table class="w-full">
        <thead>
          <tr>
            <th v-show="isAdmin()" class="w-[3%]">#</th>
            <th class="w-[3%]">No</th>
            <th>Nama Botol</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
          <tr>
            <td v-show="isAdmin()"><input type="checkbox" /></td>
            <td>1</td>
            <td>Botol 1</td>
            <td>Ready</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
