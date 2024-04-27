<template>
  <div class="container max-w-4xl">
    <Header /> 
    <main class="my-10">
      <slot />
    </main>
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
      crossorigin: "",
    },
  ],
});
</script>

<style>
body {
  font-family: "Roboto", "Inter";
  @apply bg-white dark:bg-gray-900;
}
</style>
