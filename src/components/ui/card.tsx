import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

export function Card({ children }: CardProps) {
    return (
        <div className="bg-inherit shadow-md rounded-lg overflow-hidden max-w-sm w-full">
            {children}
        </div>
    );
}

export function CardContent({ children }: CardProps) {
    return <div className="p-4">{children}</div>;
}
