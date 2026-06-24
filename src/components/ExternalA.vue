<template>
  <a :href target="_blank" rel="external" class="text-primary">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
interface ExternalAProps {
  href: string;
}

defineProps<ExternalAProps>();
</script>
