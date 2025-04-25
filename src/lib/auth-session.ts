import {auth} from "@/auth/auth";
import {unauthorized} from "next/navigation";

export const getSession = async () => {
  const session = await auth()
  return session
}

export const getUser = async () => {
  const session = await getSession()
  return session?.user
}

export const getRequiredUser = async () => {
  const user = await getUser()
  if (!user) {
    unauthorized()
  }
  return user
}
