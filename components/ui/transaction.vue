<template>
  <div
    class="grid grid-cols-3 border-b border-gray-200 py-4 text-gray-900 dark:border-gray-800 dark:text-gray-100"
  >
    <div class="col-span-2 flex items-center justify-between space-x-4">
      <div class="flex items-center space-x-1">
        <UIcon :name="icon" :class="[iconColor]" />
        <div>{{ description }}</div>
      </div>

      <div class="flex-shrink-0">
        <UBadge color="white" v-if="category">{{ category }}</UBadge>
      </div>
    </div>

    <div class="flex items-center justify-end space-x-2">
      <div>{{ currency }}</div>
      <div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"
            :loading="isLoading"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["transaction"]);
const emit = defineEmits(["deleted"]);

const { category, type, description } = props.transaction;

const isIncome = computed(() => type === "Income");
const icon = computed(() =>
  isIncome.value ? "i-heroicons-arrow-up-right" : "i-heroicons-arrow-down-left",
);
const iconColor = computed(() =>
  isIncome.value ? "text-green-600" : "text-red-600",
);

const { amount } = toRefs(props.transaction);
const { currency } = useCurrency(amount);

const supabase = useSupabaseClient();
const isLoading = ref(false);
const {doneToast,errorToast} = useAddToast();

const deleteTransaction = async (id) => {
  isLoading.value = true;
  try {
    await supabase.from("transactions").delete().eq("id", props.transaction.id);
    doneToast({
      title: "The transaction has been deleted!",
    });
    emit("deleted", props.transaction.id);
  } catch (error) {
    errorToast({
      title: "Some thing went wrong!",
    });
  } finally {
    isLoading.value = false;
  }
};

const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit"),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: deleteTransaction,
    },
  ],
];
</script>
