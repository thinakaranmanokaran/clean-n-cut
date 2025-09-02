import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:bg-primary-light hover:shadow-medium transition-smooth",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90 transition-smooth",
        outline:
          "border border-input bg-background shadow-soft hover:bg-accent hover:text-accent-foreground transition-smooth",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80 transition-smooth",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground transition-smooth",
        link: 
          "text-primary underline-offset-4 hover:underline transition-smooth",
        hero:
          "bg-gradient-primary text-primary-foreground shadow-medium hover:shadow-strong hover:scale-105 transition-bounce font-semibold",
        glass:
          "bg-background/80 backdrop-blur-sm border border-border shadow-soft hover:bg-background/90 transition-smooth",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-lg px-10 text-base",
        xl: "h-16 rounded-lg px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
