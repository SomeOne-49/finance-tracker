<template>
  <UCard v-if="!success">
    <template #header> Sign-in to Finance Tracker </template>
    <form @submit.prevent="login">
      <UFormGroup
        label="Email"
        name="email"
        class="mb-4"
        help="You will receive an email with the confimation link."
        required
      >
        <UInput
          placeholder="you@example.com"
          icon="i-heroicons-envelope"
          required
          v-model="email"
        />
      </UFormGroup>
      <UFormGroup label="Password" name="password" class="mb-4" required>
        <UInput
          type="password"
          placeholder="********"
          icon="i-heroicons-lock-closed"
          required
          v-model="password"
        />
      </UFormGroup>
      <UFormGroup
        label="Confirm Password"
        name="cPassword"
        class="mb-4"
        required
      >
        <UInput
          type="password"
          placeholder="********"
          icon="i-heroicons-lock-closed"
          required
          v-model="cPassword"
        />
      </UFormGroup>
      <div class="flex items-center justify-between max-sm:flex-col">
        <UButton
          label="Sign up"
          color="black"
          type="submit"
          variant="solid"
          :loading="pending"
          :diabled="pending"
        />
        <p class="text-sm text-gray-400">
          Already have account?
          <NuxtLink to="login" class="text-primary">Login.</NuxtLink>
        </p>
      </div>
    </form>
  </UCard>
  <UCard v-else>
    <template #header> Account has been creat </template>
    <div class="text-center"></div>
  </UCard>
</template>

<script setup>
const success = ref(false);
const email = ref("");
const password = ref("");
const cPassword = ref("");
const pending = ref(false);
const toast = useToast();
const supabase = useSupabaseClient();

useRedirectIfAuthenticated();

const login = async () => {
  pending.value = true;
  try {
    if (password.value !== cPassword.value)
      return errorToast({ title: "Password must match." });

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: "http://localhost:3000",
        confirm: false,
      },
    });
    if (error) {
      errorToast({
        title: "Error authenticating",
        description: error.message,
      });
      throw error;
    } else success.value = true;
  } finally {
    pending.value = false;
  }
};
</script>
