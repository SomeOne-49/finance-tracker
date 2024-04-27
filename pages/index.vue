<template>
  <section class="mb-10 flex items-center justify-between">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selected" :options="transactionViewOptions" />
    </div>
  </section>

  <section
    class="mb-10 grid gap-x-16 gap-y-4 min-[450px]:grid-cols-2 lg:grid-cols-4"
  >
    <UiTrend
      color="green"
      title="Income"
      :amount="incomeTotal"
      :last-period="selected"
      :last-amount="previousIncomeTotal"
      :loading="pending"
    />
    <UiTrend
      color="red"
      title="Expense"
      :amount="expenseTotal"
      :last-period="selected"
      :last-amount="previousExpenseTotal"
      :loading="pending"
    />
    <UiTrend
      color="green"
      title="Investments"
      :amount="4000"
      :last-period="selected"
      :last-amount="3000"
      :loading="pending"
    />
    <UiTrend
      color="red"
      title="Saving"
      :amount="4000"
      :last-period="selected"
      :last-amount="4100"
      :loading="pending"
    />
  </section>

  <section class="mb-10 flex justify-between">
    <div>
      <h2 class="text-2xl font-bold">Transitions</h2>
      <div class="text-gray-50 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
        period
      </div>
    </div>
    <div>
      <ModelAddTransaction v-model="isOpen" @added="refresh()" />
      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        label="Add"
        @click="isOpen = true"
      />
    </div>
  </section>

  <section>
    <USkeleton class="mb-2 h-8 w-full" v-for="i in 4" :key="i" v-if="pending" />
    <div
      v-else
      v-for="(transactions, date) in transactionsGroupedByDate"
      :key="date"
      class="mt-8"
    >
      <UiDailyTransaction :transactions="transactions" :date="date" />
      <UiTransaction
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @deleted="refresh()"
      />
    </div>
  </section>
</template>

<script setup>
import { transactionViewOptions } from "~/constants.js";

const selected = ref(transactionViewOptions[0]);
const isOpen = ref(false);

const { current, previous } = useSelectedTimePeriod(selected);

const {
  transactions: {
    grouped: { byDate: transactionsGroupedByDate },
    incomeTotal,
    expenseTotal,
    incomeCount,
    expenseCount,
  },
  pending,
  refresh,
} = useFetchTransactions(current);

const {
  transactions: {
    incomeTotal: previousIncomeTotal,
    expenseTotal: previousExpenseTotal,
  },
} = useFetchTransactions(previous);
await refresh();
</script>
