import cn from "@/lib/cn";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ ...props }: LabelProps) {
  return (
    <label {...props} className={cn("font-semibold text-base text-foreground/90", props.className)}>
      {props.children}
    </label>
  );
}
