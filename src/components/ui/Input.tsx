import cn from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      type="text"
      className={cn(
        "w-full outline-none bg-background hover:bg-background/90 focus:ring-3 focus:ring-primary px-4 py-2 rounded-lg transition-all",
        props.className
      )}
    />
  );
}
