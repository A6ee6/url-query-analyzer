"use client";

import { useState, useEffect, ReactNode } from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (!savedTheme) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <BackgroundWrapper darkMode={darkMode}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {(title || description) && (
          <div className="mb-8">
            {title && <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">{title}</h2>}
            {description && <p className="text-slate-600 dark:text-slate-400">{description}</p>}
          </div>
        )}
        {children}
      </div>
      <Footer currentYear={currentYear} />
    </BackgroundWrapper>
  );
}
