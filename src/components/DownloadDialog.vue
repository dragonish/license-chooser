<template>
  <q-dialog v-model="modelValue">
    <q-card style="min-width: 600px">
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6">
            {{ $t("form.title") }}
            <span class="text-subtitle2">({{ id }})</span>
          </div>

          <div class="text-caption text-grey-7">
            {{ $t("form.allRequired") }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-for="field in userFields"
            :key="field"
            v-model="formData[field]"
            :label="$t('user.' + field)"
            outlined
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || $t('form.rule')]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            no-caps
            color="grey"
            :label="$t('app.cancel')"
          />
          <q-btn
            flat
            no-caps
            type="submit"
            color="primary"
            :label="$t('app.download')"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface DownloadDialogProps {
  id: string;
  userFields: UserField[] | undefined;
}

const modelValue = defineModel<boolean>("model-value", { required: true });

const props = withDefaults(defineProps<DownloadDialogProps>(), {
  userFields: () => [],
});

const emit = defineEmits<{
  submit: [id: string, data: Record<string, string>];
}>();

const formData = ref<Record<string, string>>({});

watch(
  () => props.userFields,
  (fields) => {
    if (fields) {
      const newData: Record<string, string> = {};
      fields.forEach((field) => {
        if (field === "year") {
          newData[field] =
            formData.value[field] || String(new Date().getFullYear());
        } else {
          newData[field] = formData.value[field] || "";
        }
      });
      formData.value = newData;
    }
  },
  { immediate: true },
);

function onSubmit() {
  emit("submit", props.id, formData.value);
  modelValue.value = false;
}
</script>
