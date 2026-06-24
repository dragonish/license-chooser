<template>
  <q-card>
    <q-card-section class="relative-position">
      <div class="text-h6">
        {{ item.name }}
        <span v-if="item.abbreviation" class="text-subtitle2 text-italic">
          ({{ item.abbreviation }})
        </span>
      </div>

      <div class="text-subtitle1">
        ID:
        <external-a :href="`https://spdx.org/licenses/${item.id}.html`">
          {{ item.id }}
        </external-a>
        <template v-if="item.otherId">
          <template v-for="(v, i) in item.otherId" :key="i">
            /
            <external-a :href="`https://spdx.org/licenses/${v}.html`">
              {{ v }}
            </external-a>
          </template>
        </template>
        <template v-if="item.variantId">
          <template v-for="(val, key) in item.variantId" :key="key">
            /
            <external-a
              :href="`https://spdx.org/licenses/${key}.html`"
              :title="val"
            >
              {{ key }}
            </external-a>
          </template>
        </template>
      </div>

      <div class="absolute-bottom-right text-caption text-grey q-pa-sm">
        {{ $t("app.usage") }}:
        <external-a
          :href="`https://github.com/search?q=sort%3Astars+license%3A${item.id}&type=repositories`"
        >
          {{ item.usage > 1000 ? item.usage / 1000 + "M" : item.usage + "k" }}
        </external-a>
      </div>
    </q-card-section>

    <q-card-section class="text-body2 q-pt-none">
      {{ $t(`description["${item.id}"]`) }}
    </q-card-section>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-4">
        <div class="text-subtitle2 text-weight-bold text-center">
          {{ $t("category.permissions") }}
        </div>

        <q-list v-if="item.permissions" dense>
          <q-item v-for="(v, i) in item.permissions" :key="i">
            <q-item-section side>
              <q-icon color="positive" name="check_circle" />
            </q-item-section>

            <q-item-section
              :title="$t(`permission.${v}.description`)"
              class="cursor-help"
            >
              {{ $t(`permission.${v}.name`) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-4">
        <div class="text-subtitle2 text-weight-bold text-center">
          {{ $t("category.conditions") }}
        </div>

        <q-list v-if="item.conditions" dense>
          <q-item v-for="(v, i) in item.conditions" :key="i">
            <q-item-section side>
              <q-icon color="info" name="info" />
            </q-item-section>

            <q-item-section
              :title="$t(`condition.${v}.description`)"
              class="cursor-help"
            >
              {{ $t(`condition.${v}.name`) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-4">
        <div class="text-subtitle2 text-weight-bold text-center">
          {{ $t("category.limitations") }}
        </div>

        <q-list v-if="item.limitations" dense>
          <q-item v-for="(v, i) in item.limitations" :key="i">
            <q-item-section side>
              <q-icon color="negative" name="block" />
            </q-item-section>

            <q-item-section
              :title="$t(`limitation.${v}.description`)"
              class="cursor-help"
            >
              {{ $t(`limitation.${v}.name`) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn
        color="secondary"
        icon="content_copy"
        dense
        flat
        no-caps
        :label="$t('app.copyId')"
        @click="emit('copy', item.id)"
      />
      <q-btn
        color="secondary"
        icon="content_copy"
        dense
        flat
        no-caps
        :label="$t('app.copyName')"
        @click="emit('copy', item.name)"
      />
      <q-btn
        color="accent"
        :icon="
          item.userFields && item.userFields.length > 0
            ? 'browser_updated'
            : 'download'
        "
        dense
        flat
        no-caps
        :label="$t('app.download')"
        @click="emit('download', item.id)"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import ExternalA from "components/ExternalA.vue";

interface LicenseCardProps {
  item: LicenseItem;
}

defineProps<LicenseCardProps>();

const emit = defineEmits<{
  download: [id: string];
  copy: [content: string];
}>();
</script>

<style>
.cursor-help {
  cursor: help;
}
</style>
