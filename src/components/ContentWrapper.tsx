interface ContentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <main className="flex-grow py-8 ">
      <div className="w-full">{children}</div>
    </main>
  );
}
