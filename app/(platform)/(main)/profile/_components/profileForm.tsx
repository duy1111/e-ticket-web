"use client";
import { Button } from "@/components/ui/button";
import {  Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ProfileType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod"


const formSchema = z.object({
  name: z.string().min(3),
  phoneNumber: z.string().min(10).max(13),
});


type ProfileFormValues = z.infer<typeof formSchema>

interface ProfileFormProps {
  initialData: ProfileType | null;
};

const ProfileForm = ({initialData}: ProfileFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {status, data: session} = useSession();



  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      phoneNumber: '',
    }
  });

  if(status !== "authenticated") {
    return null;
  }

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      const res = await fetch("https://api-e-ticket.onrender.com/" + `user/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Something went wrong.");
        return;
      }
      toast.success("Profile updated.");
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
     <div className="flex items-center justify-between">
        <Heading title={"Profile"} description={"Profile description"} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="jonh.doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input disabled={loading} placeholder="0931111111" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
