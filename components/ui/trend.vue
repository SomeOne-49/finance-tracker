<template>
  <div>
    <div class="font-mono font-normal" :class="[color]">{{ title }}</div>
    <div class="mb-2 text-2xl font-extrabold text-black dark:text-white">
      <USkeleton class="h-8 w-full" v-if="loading" />
      <div v-else>{{ currency }}</div>
    </div>

    <div>
      <USkeleton class="h-6 w-full" v-if="loading" />
      <div v-else class="flex items-center space-x-1 text-sm">
        <UIcon :name="icon" :class="{ green: trendingUp, red: !trendingUp }" />
        <div class="text-gray-500 dark:text-gray-400">
          {{ percentageTrend }} vs last {{ period }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  amount: Number,
  lastAmount: Number,
  color: String,
  loading: Boolean,
  lastPeriod: String
});

const {amount} = toRefs(props)

const period = computed(() => {
  switch(props.lastPeriod) {
    case 'Yearly': 
    return 'Year'
    case 'Monthly': 
    return 'Month'
    case 'Daily': 
    return 'Day'
  }
})
const {currency} =  useCurrency(amount);

const trendingUp = computed(() => {
  return props.amount >= props.lastAmount;
});

const icon = computed(() => {
  return trendingUp.value
    ? "i-heroicons-arrow-trending-up"
    : "i-heroicons-arrow-trending-down";
});

const percentageTrend = computed(() => {
  if (props.amount === 0 || props.lastAmount === 0) return "∞%";
  const bigger = Math.max(props.amount, props.lastAmount);
  const lower = Math.min(props.amount, props.lastAmount);
  const ratio = ((bigger - lower) / lower) * 100;
  return `${ratio.toFixed(2)}%`;
});
</script>

<style scoped>
.green {
  @apply text-green-600 dark:text-green-400;
}
.red {
  @apply text-red-600 dark:text-red-400;
}
</style>
