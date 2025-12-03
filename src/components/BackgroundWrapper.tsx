"use client";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  darkMode: boolean;
}

export default function BackgroundWrapper({ children, darkMode }: BackgroundWrapperProps) {
  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${darkMode ? "bg-slate-950" : "bg-white"}`}>
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-60 dark:opacity-40"></div>

      {/* Floating orbs for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}
