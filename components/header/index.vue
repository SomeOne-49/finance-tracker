<template>
  <header class="mt-10 flex items-center justify-between">
    <NuxtLink to="/" class="text-primary font-mono font-bold">
      Finance Tracker
    </NuxtLink>
    <div>
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }"
        v-if="user"
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />

        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ user.email }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon
            :name="item.icon"
            class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
          />
        </template>
      </UDropdown>
      <div v-else>
        <NuxtLink to="/login" class="font-mono">Login</NuxtLink>
      </div>
    </div>
  </header>
</template>


<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const items = [
  [{
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    click: () => console.log('Link to settings in the future')
  }, {
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: async () => {
      await supabase.auth.signOut()
      return navigateTo('/login')
    }
  }]
]
</script>