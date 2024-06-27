"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing Token" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const res = await fetch(process.env.BACKEND_URL + "/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      password: password,
      token: token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { error: JSON.parse(await res.text()).message };
  }

  return { success: "Password updated" };
};
