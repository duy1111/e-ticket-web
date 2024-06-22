"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, username } = validatedFields.data;
  const res = await fetch(process.env.BACKEND_URL + "auth/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res);

  if (!res.ok) {
    return { error: JSON.parse(await res.text()).message };
  }

  return { success: "Success" };
};
