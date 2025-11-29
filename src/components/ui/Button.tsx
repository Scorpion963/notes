import cn from "@/lib/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn("bg-primary p-1 rounded-full cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
}
