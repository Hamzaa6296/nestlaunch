import * as React from "react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, style, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(className)}
      style={{
        display: "block",
        fontSize: "13px",
        fontWeight: 500,
        color: "#0f1117",
        marginBottom: "6px",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        ...style,
      }}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
