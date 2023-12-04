<script setup lang="ts">
const notes = ref("");

const characterCount = computed(() => {
  return notes.value.length + "/200";
});

watch(
  () => notes.value,
  (newValue) => {
    if (newValue.length > 200) {
      notes.value = newValue.slice(0, 200);
    }
  }
);
</script>
<template>
  <section id="addNewDataHead" class="without-topbar">
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
      <h1 class="subtitle-2 text-primaryText">
        {{ "Form Delivery Order" }}
      </h1>
    </div>
  </section>

  <section id="addNewDataBody" class="page-body flex w-full justify-center">
    <div class="w-3/4">
      <form class="form-new-guest" @submit.prevent="">
        <div class="form-group">
          <label for="bottleName"
            >Nomor Surat Jalan <span class="asterisk"></span
          ></label>
          <input id="deliveryReceiptNumber" type="text" disabled />
        </div>
        <div class="my-4 max-h-[50vh] overflow-y-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th class="text-center w-[3%]">#</th>
                <th class="text-center w-[3%]">No</th>
                <th>Nama Botol</th>
                <th>Pemilik</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Jameson</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Equil</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
              <tr>
                <td><input class="text-center" type="checkbox" /></td>
                <td class="text-center">1</td>
                <td>Civas</td>
                <td>Albert</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="form-group">
          <label for="description"
            >Catatan <span class="asterisk"></span
          ></label>
          <textarea
            v-model="notes"
            rows="5"
            placeholder="Ketik disini..."
          ></textarea>
          <p class="text-primaryText text-end">{{ characterCount }}</p>
        </div>
        <div class="mt-10">
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="btn-full disabled"
              @click="navigateTo('/delivery')"
            >
              Batal
            </button>
            <button
              type="button"
              class="btn-full active"
              @click="console.log(1)"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
