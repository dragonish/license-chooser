<template>
  <q-page
    :style="{
      position: 'absolute',
      top: headerHeight + 'px',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <q-splitter
      v-model="splitterModel"
      class="col"
      separator-class="bg-blue-grey"
      separator-style="width: 3px"
      style="overflow: hidden"
    >
      <template #before>
        <q-card class="full-height column">
          <q-bar class="bg-transparent">
            <div class="text-h5">{{ $t("app.filters") }}</div>

            <span class="text-subtitle2 q-px-xs">
              {{ licenseStore.filterCount }}/{{ licenseStore.allFilterCount }}
            </span>

            <q-space />

            <q-btn
              flat
              dense
              no-caps
              icon="restart_alt"
              :label="$t('app.reset')"
              @click="licenseStore.resetFilters()"
            />
          </q-bar>

          <q-separator />

          <q-card-section class="col q-pa-none" style="overflow: hidden">
            <q-scroll-area class="fit" style="padding: 0; margin: 0">
              <filter-component />
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </template>

      <template #after>
        <q-card class="full-height column">
          <q-bar class="bg-transparent">
            <div class="text-h5">{{ $t("app.licenses") }}</div>

            <span class="text-subtitle2 q-px-xs">
              {{ licenseStore.licenseCount }}/{{ licenseStore.allLicenseCount }}
            </span>

            <q-space />

            <q-input
              v-model="licenseStore.search"
              dense
              outlined
              :placeholder="$t('app.search')"
              class="q-mr-sm search-input"
              style="width: 200px"
            >
              <template #append>
                <q-icon
                  v-if="licenseStore.search"
                  name="close"
                  class="cursor-pointer"
                  @click="licenseStore.search = ''"
                />
              </template>
            </q-input>

            <q-btn-dropdown
              flat
              dense
              no-caps
              icon="sort"
              :label="currentSortLabel"
            >
              <q-list>
                <q-item
                  v-for="sort in sortOptions"
                  :key="sort.value"
                  clickable
                  v-close-popup
                  :active="licenseStore.sortKey === sort.value"
                  @click="switchSort(sort.value)"
                >
                  <q-item-section>{{ sort.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-bar>

          <q-separator />

          <q-card-section class="col q-pa-none" style="overflow: hidden">
            <q-scroll-area
              ref="rightScrollAreaRef"
              class="fit"
              style="padding: 0; margin: 0"
            >
              <q-virtual-scroll
                :items="licenseStore.sortList"
                :virtual-scroll-item-size="300"
                :scroll-target="rightScrollTarget"
                v-slot="{ item }"
              >
                <div :key="item.id" class="q-pa-md">
                  <license-card
                    :item="item"
                    @copy="onCopy"
                    @download="onDownload"
                  />
                </div>
              </q-virtual-scroll>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </template>
    </q-splitter>

    <download-dialog
      v-model="showDialog"
      :id="downloadId"
      :user-fields
      @submit="onSubmit"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useQuasar, type QScrollArea } from "quasar";
import { useI18n } from "vue-i18n";
import { useLicenseStore } from "stores/license";
import { copy } from "src/utils/copy";
import { downloadTxt } from "src/utils/download";
import LicenseCard from "components/LicenseCard.vue";
import DownloadDialog from "components/DownloadDialog.vue";
import FilterComponent from "components/FilterComponent.vue";

const $q = useQuasar();
const { t } = useI18n();

const licenseStore = useLicenseStore();

const splitterModel = ref(50); // start at 50%
const showDialog = ref(false);
const downloadId = ref("");
const userFields = ref<UserField[] | undefined>();
const headerHeight = ref(0);

const rightScrollAreaRef = ref<QScrollArea>();
const rightScrollTarget = computed(() =>
  rightScrollAreaRef.value?.getScrollTarget(),
);

const sortOptions = computed(() => [
  { label: t("app.usage"), value: "usage" as const },
  { label: "ID", value: "id" as const },
]);

const currentSortLabel = computed(
  () => sortOptions.value.find((s) => s.value === licenseStore.sortKey)?.label,
);

function switchSort(sort: SortType) {
  licenseStore.sortKey = sort;
}

function updateHeaderHeight() {
  const header = document.querySelector(".q-header");
  headerHeight.value = header?.getBoundingClientRect().height ?? 0;
}

onMounted(() => {
  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeaderHeight);
});

async function onDownload(id: string) {
  downloadId.value = id;
  const license = licenseStore.getLicense(id);
  if (license) {
    userFields.value = license.userFields;
    if (userFields.value) {
      showDialog.value = true;
    } else {
      // direct download
      await onSubmit(id, {});
    }
  }
}

async function onCopy(value: string) {
  const res = await copy(value);
  if (res) {
    $q.notify({
      type: "positive",
      message: t("app.copySuccess"),
      caption: value,
    });
  } else {
    $q.notify({
      type: "negative",
      message: t("app.copyFail"),
    });
  }
}

async function onSubmit(id: string, data: Record<string, string>) {
  const templateFile = `/templates/${id}.txt`;

  const response = await fetch(templateFile);
  if (!response.ok) {
    $q.notify({
      type: "negative",
      message: t("file.notExist"),
      caption: templateFile,
    });
    return;
  }

  let content = await response.text();
  if (!content) {
    $q.notify({
      type: "negative",
      message: t("file.emptyContent"),
      caption: templateFile,
    });
    return;
  }

  for (const [key, value] of Object.entries(data)) {
    content = content.replaceAll(`<${key}>`, value);
  }

  downloadTxt("LICENSE", content);
  $q.notify({
    type: "positive",
    message: t("file.download"),
    caption: id,
  });
}
</script>

<style scoped>
.search-input :deep(.q-field__control) {
  height: 28px;
  min-height: 28px;
}
.search-input :deep(.q-field__marginal) {
  height: 28px;
}
</style>
