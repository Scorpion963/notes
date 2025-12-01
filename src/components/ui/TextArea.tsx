import cn from "@/lib/cn";
import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full outline-none bg-background hover:bg-background/90 focus:ring-3 focus:ring-primary px-4 py-2 rounded-lg transition-all",
        className
      )}
    ></textarea>
  );
}
