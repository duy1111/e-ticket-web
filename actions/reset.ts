"use server";

import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const res = await fetch(
    process.env.BACKEND_URL + "auth/request-reset-password",
    {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return { error: JSON.parse(await res.text()).message };
  }

  //   const token = await res.json();

  //   await fetch(process.env.BACKEND_URL + "api/auth/reset-password", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email,
  //       token,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  return { success: "Reset email sent" };
};
