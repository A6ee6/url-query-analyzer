"use client";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  darkMode: boolean;
}

export default function BackgroundWrapper({ children, darkMode }: BackgroundWrapperProps) {
  return <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>{children}</div>;
}
