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
          <external-a href="https://github.com/dragonish/license-chooser">
            dragonish/license-chooser
          </external-a>
        </div>
        <div>
          <span class="text-weight-medium">{{ $t("about.license") }}:</span>
          <external-a
            href="https://github.com/dragonish/license-chooser/blob/main/LICENSE"
          >
            Open Software License 3.0
          </external-a>
        </div>

        <q-separator class="q-my-sm" />

        <div>
          <span class="text-weight-medium">{{ $t("about.dataFrom") }}:</span>
          <external-a href="https://github.com/github/choosealicense.com">
            github/choosealicense.com
          </external-a>
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
import ExternalA from "components/ExternalA.vue";

const modelValue = defineModel<boolean>("model-value", { required: true });
</script>
