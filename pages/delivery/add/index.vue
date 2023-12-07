<script setup lang="ts">
const _bottle = useBottleKeeping();
const _delivery = useDelivery();

onMounted(() => {
  _bottle.$reset();
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData(search?: string, page?: number) {
  await _bottle.getBottleDatas(search, true, page);
}

const characterCount = computed(() => {
  return _delivery.form.notes.length + "/200";
});

watch(
  () => _delivery.form.notes,
  (newValue) => {
    if (newValue.length > 200) {
      _delivery.form.notes = newValue.slice(0, 200);
    }
  }
);

function chooseBottle(id: number) {
  if (_delivery.form.bottles.includes(id)) {
    _delivery.form.bottles = _delivery.form.bottles.filter(
      (bottleId: number) => bottleId !== id
    );
  } else {
    _delivery.form.bottles.push(id);
  }
}

function draftData() {
  _delivery.submitDelivery();
}
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
              <tr
                v-for="(bottleData, index) in _bottle.bottleDatas"
                v-show="_bottle.bottleDatas.length"
                :key="index"
              >
                <td>
                  <input
                    class="text-center"
                    type="checkbox"
                    @change="chooseBottle(bottleData.id)"
                  />
                </td>
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ bottleData.bottleName }}</td>
                <td>{{ bottleData.userFullName }}</td>
              </tr>
              <tr v-show="!_bottle.bottleDatas.length">
                <td colspan="4" class="text-center">Tidak ada data</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="form-group">
          <label for="description"
            >Catatan <span class="asterisk"></span
          ></label>
          <textarea
            v-model="_delivery.form.notes"
            rows="5"
            placeholder="Ketik disini..."
          ></textarea>
          <p class="text-primaryText text-end">{{ characterCount }}</p>
        </div>
        <div class="mt-10">
          <div class="grid grid-cols-3 gap-4">
            <button
              type="button"
              class="btn-full disabled"
              @click="navigateTo('/delivery')"
            >
              Batal
            </button>
            <button type="button" class="btn-full active" @click="draftData()">
              Simpan
            </button>
            <button
              type="button"
              class="btn-full active"
              @click="console.log(1)"
            >
              Simpan & Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
