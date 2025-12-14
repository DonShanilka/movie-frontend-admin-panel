"use client";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: "primary" | "danger" | "secondary";
};

export default function SaveButton({
  children,
  type = "button",
  onClick,
  fullWidth = false,
  variant = "primary",
}: ButtonProps) {
  const base =
    "py-2 px-4 rounded-lg font-semibold text-sm transition shadow-md";

  const variants = {
    primary: "bg-yellow-300 hover:bg-yellow-400 text-black",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}
