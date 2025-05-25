"use server"

import { redirect } from "next/navigation"
import { validateCredentials, createUser, setSession, clearSession, findUserByEmail, findUserByUsername } from "./auth"

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const user = await validateCredentials(email, password)
  if (!user) {
    return { error: "Invalid email or password" }
  }

  await setSession(user)
  redirect("/dashboard")
}

export async function signUpAction(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!firstName || !lastName || !username || !email || !password) {
    return { error: "All fields are required" }
  }

  // Check if user already exists
  const existingUserByEmail = await findUserByEmail(email)
  if (existingUserByEmail) {
    return { error: "User with this email already exists" }
  }

  const existingUserByUsername = await findUserByUsername(username)
  if (existingUserByUsername) {
    return { error: "Username already taken" }
  }

  const newUser = await createUser({
    first_name: firstName,
    last_name: lastName,
    username,
    email,
    password,
  })

  const authUser = {
    id: newUser.id,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    username: newUser.username,
    email: newUser.email,
  }

  await setSession(authUser)
  redirect("/dashboard")
}

export async function logoutAction() {
  await clearSession()
  redirect("/")
}
