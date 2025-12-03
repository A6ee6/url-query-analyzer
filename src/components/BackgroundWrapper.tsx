"use client";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  darkMode: boolean;
}

export default function BackgroundWrapper({ children, darkMode }: BackgroundWrapperProps) {
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 text-slate-800 dark:text-slate-200 flex flex-col min-h-screen transition-colors duration-500">
        {children}
      </div>
    </div>
  );
}
