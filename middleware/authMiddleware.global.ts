import { useUserData } from "./../composables/useUserData";

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;

  const userData = useUserData();

  if (
    to.fullPath !== "/auth/login" &&
    !userData.value.token &&
    to.fullPath !== "/update"
  ) {
    return navigateTo("/auth/login");
  } else if (to.fullPath === "/auth/login" && userData.value.token) {
    return abortNavigation();
  }
});
