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
      <div class="flex items-center justify-between max-sm:flex-col">
        <UButton
          label="Login"
          color="black"
          type="submit"
          variant="solid"
          :loading="pending"
          :diabled="pending"
        />
        <!-- <p class="text-gray-400 text-sm">
          You don't have an account? <NuxtLink to="signup" class="text-primary">Sign up.</NuxtLink>
        </p> -->
      </div>
    </form>
  </UCard>
  <UCard v-else>
    <template #header> Email has been sent </template>
    <div class="text-center">
      <p class="mb-4">
        We have sent an email to <strong>{{ email }}</strong> with a link to
        sign-in.
      </p>
      <p>
        <strong class="text-red-500">Important:</strong> The link will expire in
        5 minutes.
      </p>
    </div>
  </UCard>
</template>

<script setup>
const success = ref(false);
const email = ref("");
const password = ref("");
const pending = ref(false);
const { errorToast } = useAddToast();

const supabase = useSupabaseClient();

useRedirectIfAuthenticated();

const login = async () => {
  pending.value = true;
  try {
    //! This method is limited 3 time in hour.
    // const { error } = await supabase.auth.signInWithOtp({
    //   email: email.value,
    //   options: {
    //     emailRedirectTo: "http://localhost:3000/confirm",
    //   },
    // });

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
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
