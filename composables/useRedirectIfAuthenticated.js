export const useRedirectIfAuthenticated = (url = '/') => {
  const u = useSupabaseUser();
  watch(u, (u) => {
    if (u)
      return navigateTo(url)
  }, { immediate: true });
  return { u }
}