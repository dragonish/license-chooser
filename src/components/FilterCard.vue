<template>
  <q-card
    class="q-mb-md"
    :class="{ 'highlight-filter-card': modelValue !== null }"
  >
    <q-card-section>
      <div class="text-h6">{{ question }}</div>

      <div class="text-body2 q-pt-md">{{ description }}</div>
    </q-card-section>

    <q-card-section class="q-pa-md">
      <q-option-group
        v-model="modelValue"
        type="radio"
        :options="options"
      ></q-option-group>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface FilterCardProps {
  question: string;
  description: string;
  options: { [key: string]: unknown }[];
}

defineProps<FilterCardProps>();

const modelValue = defineModel<unknown>("modelValue", { required: true });
</script>

<style>
.highlight-filter-card {
  outline: solid 2px #35a2ff;
}
</style>
