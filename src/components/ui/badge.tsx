import React from "react";
import clsx from "clsx";

type BadgeProps = {
    children: React.ReactNode;
    variant?: "blue" | "yellow" | "green" | "red";
    className?: string;
};

const colorMap = {
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
};

export default function Badge({
    children,
    variant = "blue",
    className = "",
}: BadgeProps) {
    return (
        <span
            className={clsx(
                "inline-flex items-center rounded font-medium",
                colorMap[variant],
                className
            )}
        >
            {children}
        </span>
    );
}