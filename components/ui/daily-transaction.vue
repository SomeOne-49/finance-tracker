<template>
  <div
    class="grid grid-cols-2 border-b border-gray-200 py-4 font-semibold text-gray-500 dark:border-gray-800 dark:text-gray-500"
  >
    <div class="flex items-center justify-between">
      {{ date }}
    </div>

    <div class="flex items-center justify-end me-10">
      {{ currency }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["transactions", "date"]);
const sum = computed(() => {
  let sum = 0;
  for (const transaction of props.transactions) {
    if (transaction.type === "Income") sum += transaction.amount;
    else sum -= transaction.amount;
  }
  return sum;
});

const {currency} = useCurrency(sum)

</script>
