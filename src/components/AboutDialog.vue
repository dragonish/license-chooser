<template>
  <q-dialog v-model="modelValue">
    <q-card style="min-width: 500px; max-width: 700px">
      <q-card-section>
        <div class="text-h6">{{ $t("about.title") }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-sm">
        <div>
          <span class="text-weight-medium">{{ $t("about.author") }}:</span>
          dragonish
        </div>
        <div>
          <span class="text-weight-medium">{{ $t("about.projectRepo") }}:</span>
          <a
            href="https://github.com/dragonish/license-chooser"
            target="_blank"
            rel="external"
            class="text-primary"
          >
            dragonish/license-chooser
          </a>
        </div>
        <div>
          <span class="text-weight-medium">{{ $t("about.license") }}:</span>
          <a
            href="https://github.com/dragonish/license-chooser/blob/main/LICENSE"
            target="_blank"
            rel="external"
            class="text-primary"
          >
            Open Software License 3.0
          </a>
        </div>

        <q-separator class="q-my-sm" />

        <div>
          <span class="text-weight-medium">{{ $t("about.dataFrom") }}:</span>
          <a
            href="https://github.com/github/choosealicense.com"
            target="_blank"
            rel="external"
            class="text-primary"
          >
            github/choosealicense.com
          </a>
        </div>
        <div>
          <div class="text-weight-medium q-mb-xs">
            {{ $t("about.dataFromLicense") }}:
          </div>
          <q-card
            flat
            bordered
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
          >
            <q-card-section class="text-caption">
              <pre
                class="q-ma-none"
                style="white-space: pre-wrap; font-family: inherit"
                >{{ choosealicenseLicense }}</pre
              >
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          no-caps
          color="primary"
          :label="$t('app.cancel')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import choosealicenseLicense from "assets/licenses/choosealicense.com.txt?raw";

const modelValue = defineModel<boolean>("model-value", { required: true });
</script>
