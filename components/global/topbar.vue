<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import type { Action } from "~/models/Action";

const props = defineProps<{
  pageTitle: string;
  useActions: boolean;
  actions: Action[] | null;
}>();

const dropdown = ref(null);
const showDropdown = ref(false);

onClickOutside(dropdown, () => (showDropdown.value = false));
</script>

<template>
  <div class="flex justify-between items-center">
    <h1 class="subtitle-2 text-primaryText">{{ props.pageTitle }}</h1>

    <div
      v-if="props.useActions"
      class="hidden lg:flex justify-end items-center gap-2"
    >
      <template v-for="(action, index) in props.actions" :key="index">
        <button
          type="button"
          class="btn-head"
          :class="action.color"
          :data-hbid="action.hbid"
          @click="action.click"
        >
          <Iconify
            v-if="action.icon != null"
            :icon="action.icon"
            class="mx-auto text-xl"
          />
          <p v-html="action.text"></p>
        </button>
      </template>
    </div>

    <div class="relative block lg:hidden">
      <button type="button" @click="showDropdown = true">
        <Iconify
          icon="ic:baseline-more-vert"
          class="text-primaryText text-xl"
        />
      </button>

      <Transition name="drop" mode="out-in">
        <div
          v-show="showDropdown"
          ref="dropdown"
          class="absolute right-0 top-0 z-10"
        >
          <div class="option-dropdown">
            <template v-for="(action, index) in props.actions" :key="index">
              <button
                type="button"
                class="btn-head-mobile"
                :class="action.color"
                :data-hbid="action.hbid"
                @click="action.click"
              >
                <div class="flex items-center gap-2">
                  <Iconify :icon="action.icon" class="text-xl" />
                  <p>{{ action.text }}</p>
                </div>
              </button>
            </template>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
