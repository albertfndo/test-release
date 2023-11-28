<script setup lang="ts">
import type { PageLink } from "~~/models/Pagination";

const props = defineProps<{
  from: number;
  to: number;
  total: number;
  prev: string | null;
  next: string | null;
  links: PageLink[];
}>();

const emits = defineEmits(["changepage"]);
</script>

<template>
  <div class="my-3">
    <div class="flex justify-between items-center">
      <div class="text-sm lg:text-base">
        <div class="text-primaryText font-poppins-r">
          Showing
          <span>{{ props.from ?? 0 }}</span> to
          <span>{{ props.to ?? 0 }}</span> of
          <span>{{ props.total }}</span> results.
        </div>
      </div>

      <div class="hidden lg:flex text-sm lg:text-base">
        <ul class="pagination-wrapper">
          <template v-for="(page, index) in props.links" :key="index">
            <li
              v-if="page?.url != null"
              class="pagination"
              :class="page?.active ? 'active' : ''"
              @click="emits('changepage', page?.url)"
              v-html="page?.label"
            ></li>
            <li v-else class="pagination" v-html="page?.label"></li>
          </template>
        </ul>
      </div>
      <div class="flex lg:hidden gap-2">
        <button
          v-if="props.prev != null"
          type="button"
          class="pagination-mobile"
          @click="emits('changepage', props.prev)"
        >
          Prev
        </button>
        <button
          v-if="props.next != null"
          type="button"
          class="pagination-mobile"
          @click="emits('changepage', props.next)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
