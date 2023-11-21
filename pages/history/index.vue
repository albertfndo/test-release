<script setup lang="ts">
const actions = reactive<Action[]>([
  {
    text: "Refresh",
    icon: "ic:round-refresh",
    color: "white",
    hbid: "res-refresh",
    click: async () => console.log("refresh"),
  },
]);
</script>

<template>
  <section id="bottleKeepHistoryHead">
    <Topbar
      page-title="Bottle Keeping History"
      :use-actions="true"
      :actions="actions"
    />
  </section>
</template>
