<template>
  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h4 class="font-mono text-xl font-bold">Add Transiction</h4>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        ref="form"
        @submit="save"
      >
        <UFormGroup label="Type" name="type" class="mb-4" :required="true">
          <USelectMenu
            v-model="state.type"
            placeholder="Select type"
            :options="transactionTypes"
          />
        </UFormGroup>
        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <UInput
            v-model.number="state.amount"
            type="number"
            placeholder="Transaction amount"
            icon="i-heroicons-currency-dollar"
          />
        </UFormGroup>
        <UFormGroup
          label="Transaction date"
          hint="Optional"
          name="created_at"
          class="mb-4"
        >
          <UInput
            v-model="state.created_at"
            type="date"
            placeholder="Transaction date"
            icon="i-heroicons-calendar-days"
          />
        </UFormGroup>
        <UFormGroup
          label="Description"
          hint="Optional"
          name="description"
          class="mb-4"
        >
          <UInput
            v-model="state.description"
            type="text"
            placeholder="Transaction description"
            icon="i-heroicons-document-text"
          />
        </UFormGroup>
        <UFormGroup
          label="Category"
          name="category"
          class="mb-4"
          :required="true"
          v-if="state.type === 'Expense'"
        >
          <!-- hint="Optional" -->
          <USelectMenu
            v-model="state.category"
            placeholder="Select category"
            :options="transactionCategories"
          />
        </UFormGroup>
        <div class="flex justify-end gap-3">
          <UButton
            type="button"
            color="red"
            label="Cansel"
            @click="isOpen = false"
          />
          <UButton
            type="submit"
            color="green"
            label="Save"
            :loading="pending"
          />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
<script setup>
import { transactionCategories, transactionTypes } from "~/constants";
import { z } from "zod";

const supabase = useSupabaseClient();
const { doneToast, errorToast } = useAddToast();

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "added"]);

const defaultSchema = z.object({
  amount: z.number().positive("amount must be more than 0."),
  created_at: z.string().optional(),
  description: z.string().optional(),
});

const incomeSchema = z.object({
  type: z.literal("Income"),
});
const expenseSchema = z.object({
  type: z.literal("Expense"),
  category: z.enum(transactionCategories, {
    required_error: "You must select expense category.",
  }),
});

const investmentsSchema = z.object({
  type: z.literal("Investments"),
});
const savingSchema = z.object({
  type: z.literal("Saving"),
});

const schema = z.intersection(
  z.discriminatedUnion("type", [
    incomeSchema,
    expenseSchema,
    investmentsSchema,
    savingSchema,
  ]),
  defaultSchema,
);

const form = ref(null);
const pending = ref(false);

const save = async () => {
  if (form.value.errors.length) return;
  pending.value = true;
  try {
    const { error } = await supabase.from("transactions").upsert(state.value);
    if (error) throw error;
    emit("added");
    doneToast({
      title: "Transaction Added.",
    });
    isOpen.value = false;
  } catch (e) {
    errorToast({
      title: "Transaction Not Added",
      description: e.message,
    });
  } finally {
    pending.value = false;
  }
};

const initState = {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined,
};

const state = ref({
  ...initState,
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    Object.assign(state.value, initState);
    form.value.clear();
    emit("update:modelValue", value);
  },
});
</script>
