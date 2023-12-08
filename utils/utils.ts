import numeral from "numeral";
import { roleConstants } from "./RoleConstant";
import moment from "moment";

const userData = useUserData();

export function fuzzySearch(text: string, haystack: string) {
  const hay = text.toLowerCase();
  let i = 0;
  let n = -1;
  let l;
  haystack = haystack.toLowerCase();

  for (; (l = haystack[i++]); ) {
    if ((n = hay.indexOf(l, n + 1)) === -1) {
      return false;
    }
  }

  return true;
}

export function formatNumber(number: number) {
  return numeral(number).format("0,0");
}

export function cloneJson(json: Record<string, any>) {
  return JSON.parse(JSON.stringify(json));
}

export function formatTitle(text: string): string {
  const result = text!.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function isProduction() {
  const config = useRuntimeConfig();
  return config.public.environment == "production";
}

export function getNextPage(page: string): number {
  const nextPage = page?.split("page=")[1].split("&")[0];
  return parseInt(nextPage);
}

export function isAdmin() {
  return userData.value.roles?.some((role) => roleConstants.includes(role));
}

export function formatDate(date: string) {
  return date ? moment(date).format("DD MMM YYYY") : "Not Set";
}
// export function registerLocalStorageMeta() {
// localStorage.setItem("APP_ENV", import.meta.env.VITE_APP_ENV);
// localStorage.setItem("VERSION", import.meta.env.VITE_VERSION);
// }

// export function isProduction() {
//   const config = useRuntimeConfig();
//   return config.public.environment == "production"
// }

// export function isStaging() {
//   const config = useRuntimeConfig();
//   return config.public.environment == "staging"
// }

// export function isLocal() {
//   const config = useRuntimeConfig();
//   return config.public.environment == "local"
// }
