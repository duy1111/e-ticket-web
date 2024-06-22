"use client";
import { useSession } from "next-auth/react";

import * as z from "zod";
import axios from "axios";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CalendarIcon, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { EventType } from "@/types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Location from "@/components/location";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Editor } from "@/components/editer";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  start_time: z.date({
    required_error: "start time is required.",
  }),
  end_time: z.date({
    required_error: "end time is required.",
  }),
  imageUrl: z.string().min(1),
  locationId: z.number(),
  eTicketBook: z.object({
    total: z.string(),
    price: z.string(),
    currency: z.string().default("USD"),
  }),
});

type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  initialData: EventType | null;
  eventId?: string;
}

export const ProductForm: React.FC<EventFormProps> = ({ initialData, eventId }) => {

  const session = useSession();
  
  const router = useRouter();
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit event" : "Create event";
  const description = initialData ? "Edit a event." : "Add a new event";
  const toastMessage = initialData ? "Event updated." : "Event created.";
  const action = initialData ? "Save changes" : "Create";
  const defaultValues = initialData
    ? {
        ...initialData,
        start_time: new Date(initialData?.start_time),
        end_time: new Date(initialData?.end_time),
        eTicketBook: {
          total: String(initialData?.ETicketBook?.total || 0),
          price: String(initialData?.ETicketBook?.price || 0),
          currency: "USD",
        },
        locationName: initialData?.location?.address,
      }
    : {
        name: "",
        description: "",
        start_time: new Date(new Date().setDate(new Date().getDate() + 1)),
        end_time: new Date(new Date().setDate(new Date().getDate() + 2)),
        locationId: undefined,
        imageUrl: undefined,
        eTicketBook: {
          total: "",
          price: "",
          currency: "USD",
        },
        locationName: "",
      };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      setLoading(true);
      if (initialData && eventId) {
        await fetch("http://localhost:3001/" + `event/update/${eventId}`, {
          method: "PUT",
          body: JSON.stringify({
            ...data,
            creatorId: user?.id,
            eTicketBook: {
              ...data.eTicketBook,
              total: +data.eTicketBook.total,
              price: +data.eTicketBook.price,
            },
          }),
          headers: {
            "Authorization": "Bearer " + session.data?.accessToken,
            "Content-Type": "application/json",
          },
        });
      } else {
        await fetch("http://localhost:3001/" + "event/create", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            creatorId: user?.id,
            eTicketBook: {
              ...data.eTicketBook,
              total: +data.eTicketBook.total,
              price: +data.eTicketBook.price,
            },
          }),
          headers: {
            "Authorization": "Bearer " + session.data?.accessToken,
            "Content-Type": "application/json",
          },
        });
      }
      router.refresh();
      router.push(`/event`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const { isSubmitting, isValid } = form.formState;

  const onDelete = async () => {
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
    //   router.refresh();
    //   router.push(`/${params.storeId}/products`);
    //   toast.success("Product deleted.");
    // } catch (error: any) {
    //   toast.error("Something went wrong.");
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
  };


  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-[1200px]">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className=" w-full  rounded-md overflow-y-auto" >
                      <Editor
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-4 gap-8 mt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Event name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eTicketBook.total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Total"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eTicketBook.price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={"9.9"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Location form={form} />
          <Button disabled={loading || isSubmitting || !isValid} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
