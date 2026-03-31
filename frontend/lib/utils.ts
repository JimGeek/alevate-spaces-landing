import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getImageUrl(path: string | null | undefined): string {
    if (!path) return "";
    // Build absolute URL from relative path
    const url = path.startsWith("http")
        ? path
        : `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}${path}`;
    // Upgrade http → https for production API domain so Next.js image optimisation accepts it
    return url.replace(/^http:\/\/api\.superhomes\.app/, "https://api.superhomes.app");
}
