import { useLocalStorage } from "@vueuse/core";
import User from "../models/User";

export type AuthUserData = {
  token: string | null,
  user: User | null,
  roles: string[] | null,
  permissions: string[] | null,
}

export const useUserData = () => {
  const data = useLocalStorage<AuthUserData>('user_data', {
    token: null,
    user: null,
    roles: null,
    permissions: null
  })

  return data;
}

