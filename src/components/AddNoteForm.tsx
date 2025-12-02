"use client";
import { NOTE_STATUSES, TASK_STATUSES } from "@/drizzle/schema";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./ui/Input";
import Label from "./ui/Label";
import TextArea from "./ui/TextArea";
import Select from "./ui/Select";
import Button from "./ui/Button";
import { Plus } from "lucide-react";

const TaskSchema = z.object({
  name: z.string().min(1),
  status: z.enum(TASK_STATUSES),
});

const EMPTY_TASK_ERROR_MESSAGE = "The note is empty! Add description or a task";
const formSchema = z
  .object({
    name: z.string().min(1),
    status: z.enum(NOTE_STATUSES),
    description: z.string().optional(),
    addTask: TaskSchema,
    tasks: z.array(TaskSchema).optional(),
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
    getValues,
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "tasks",
  });

  return (
    <form
      className="w-[500px] h-fit p-6 rounded-lg bg-card space-y-4"
      action=""
    >
      <div className="gap-2 flex flex-col">
        <Label className="pl-1" htmlFor="name">
          Name
        </Label>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="name"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </div>

      <div className="flex gap-2 flex-col">
        <Label className="pl-1" htmlFor="description">
          Description
        </Label>
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextArea
              id="description"
              className="resize-none h-36"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </div>

      <div>
        <Label className="text-sm">Task Name</Label>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Controller
              name="addTask.name"
              control={control}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <Input onChange={onChange} value={value} />
              )}
            />
            <Controller
              name="addTask.status"
              control={control}
              defaultValue={"completed"}
              render={({ field: { onChange, value } }) => (
                <Select
                  className="w-1/2"
                  value={value!}
                  onChange={onChange}
                  options={[
                    { label: "Pending", value: TASK_STATUSES[0] },
                    { label: "Completed", value: TASK_STATUSES[1] },
                  ]}
                ></Select>
              )}
            />
          </div>
          <Button
            type="button"
            className="w-fit px-4"
            onClick={() => {
              const task = getValues("addTask");
              const { success, error } = TaskSchema.safeParse(task);
              if (!success) {
                const errors = error.flatten().fieldErrors;
                console.log(errors);
              } else {
                append({ name: task.name, status: task.status });
              }
            }}
          >
            Add
          </Button>
        </div>

        <ul className="space-y-2 overflow-y-scroll max-h-[140px]">
          {fields.map((item, index) => (
            <li className="flex gap-2" key={item.id}>
              <Controller
                name={`tasks.${index}.name`}
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input onBlur={onBlur} onChange={onChange} value={value} />
                )}
              />
              <Controller
                name={`tasks.${index}.status`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    className="w-1/2"
                    onChange={onChange}
                    value={value!}
                    options={[
                      { label: "Pending", value: TASK_STATUSES[0] },
                      { label: "Completed", value: TASK_STATUSES[1] },
                    ]}
                  />
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
