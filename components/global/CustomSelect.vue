<script setup lang="ts">
export type Choice = {
  id: number;
  text: string;
};

const props = defineProps<{
  modelValue: any;
  placeholder: string;
  options: Choice[];
  autofill?: boolean;
}>();

const attrs = useAttrs();
const emits = defineEmits(["update:modelValue", "inputOption", "search"]);

const textInput = ref<HTMLInputElement | null>(null);
const text = ref("");
const isChoiceOpen = ref(false);
const keyIndex = ref(-1);

const choosenValue = ref<number[]>([]);

const choices = computed(() => {
  const filteredChoice = props.options.filter((option) => {
    const regex = new RegExp(text.value.toLowerCase());
    return option.text.toLowerCase().search(regex) >= 0;
  });

  return filteredChoice;
});

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

watch(
  () => props.options,
  () => {
    const choice = props.options.filter((value) => value.id == props.modelValue!);
    if (choice.length) {
      text.value = choice?.[0].text;
    }
  }
);

function onFocus() {
  isChoiceOpen.value = true;
  // text.value = "";
  emits("update:modelValue", null);
}

function onBlur() {
  setTimeout(() => {
    isChoiceOpen.value = false;
  }, 150);
}

function choose(choice: Choice, isActive = false) {
  keyIndex.value = -1;
  textInput.value?.blur();

  if (isActive) {
    text.value = "";
    modelValue.value = -1;
    return;
  }

  text.value = choice.text;
  modelValue.value = choice.id;
  emits("inputOption", choice);

  isChoiceOpen.value = false;
}

function keydown(event: KeyboardEvent) {
  if (event.code == "ArrowDown") {
    keyIndex.value += 1;
  }

  if (event.code == "ArrowUp") {
    keyIndex.value = keyIndex.value > -1 ? keyIndex.value - 1 : keyIndex.value;
  }

  if (event.code == "Enter") {
    choose(choices.value[keyIndex.value]);
  }
}
</script>

<template>
  <div class="custom-select">
    <input
      v-model="text"
      type="text"
      v-bind="attrs"
      :placeholder="props.placeholder"
      @keydown="keydown"
      @focus="onFocus"
      @blur="onBlur"
      @input="emits('search', text)"
    />
    <div class="absolute top-1/2 right-2 -translate-y-1/2">
      <Iconify icon="ic:round-keyboard-arrow-down" class="text-primaryText" />
    </div>

    <div v-if="!props.autofill" v-show="isChoiceOpen" class="options">
      <template v-for="(option, index) in options" :key="index">
        <div
          class="item"
          @mousedown="
            choose(option, keyIndex == index || choosenValue.includes(option.id))
          "
        >
          {{ option.text }}
        </div>
      </template>
    </div>

    <div v-else v-show="isChoiceOpen" class="options">
      <template v-for="(option, index) in options" :key="index">
        <div
          class="item"
          @mousedown="
            choose(option, keyIndex == index || choosenValue.includes(option.id))
          "
        >
          {{ option.text }}
        </div>
      </template>
    </div>
  </div>
</template>
