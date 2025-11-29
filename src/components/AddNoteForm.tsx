"use client";
import { NOTE_STATUSES, TASK_STATUSES } from "@/drizzle/schema";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./ui/Input";
import Label from "./ui/Label";

const EMPTY_TASK_ERROR_MESSAGE = "The note is empty! Add description or a task";
const formSchema = z
  .object({
    name: z.string().min(1),
    status: z.enum(NOTE_STATUSES),
    description: z.string().optional(),
    tasks: z
      .array(
        z.object({
          name: z.string().min(1),
          status: z.enum(TASK_STATUSES),
        })
      )
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.description && (!val.tasks || val.tasks.length < 1)) {
      ctx.addIssue({
        code: "custom",
        message: EMPTY_TASK_ERROR_MESSAGE,
        path: ["description"],
      });

      ctx.addIssue({
        code: "custom",
        message: EMPTY_TASK_ERROR_MESSAGE,
        path: ["tasks"],
      });
    }
  });

export default function AddNoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <form className="w-[400px] h-fit p-4 rounded-lg bg-card " action="">
      <div className="gap-2 flex flex-col">
        <Label className="pl-1" htmlFor="name">
          Name
        </Label>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </div>
    </form>
  );
}
