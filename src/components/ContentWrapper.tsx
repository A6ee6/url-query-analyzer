interface ContentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">{children}</div>
    </main>
  );
}
