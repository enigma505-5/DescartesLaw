import React from "react";
import clsx from "clsx";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    className?: string;
    disabled?: boolean;
};

const baseStyles = "inline-flex rounded-md items-center justify-center";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-blue-200 text-blue-700 hover:bg-blue-300",
    secondary: "border border-blue-400 text-white",
};

export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                baseStyles,
                variantStyles[variant],
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {children}
        </button>
    );
}