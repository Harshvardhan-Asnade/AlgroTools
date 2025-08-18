import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <circle cx="50" cy="50" r="48" fill="url(#paint0_linear_logo)" />
      <path d="M35 40 H 65" stroke="white" strokeWidth="6" />
      <path d="M50 40 V 70" stroke="white" strokeWidth="6" />
      <defs>
        <linearGradient
          id="paint0_linear_logo"
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8F65D7" />
          <stop offset="1" stopColor="#293462" />
        </linearGradient>
      </defs>
    </svg>
  );
}
