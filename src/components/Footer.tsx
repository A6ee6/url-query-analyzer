interface FooterProps {
  currentYear: number;
}

export default function Footer({ currentYear }: FooterProps) {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 px-4 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-slate-800 dark:bg-slate-800/50 p-2 rounded-lg mr-3 border border-slate-700">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-slate-200">URL Query String Analyzer</span>
          </div>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            A powerful tool for extracting and analyzing query parameters from any URL, including shortened and encrypted links. Perfect for debugging, security
            analysis, and understanding complex URL structures.
          </p>
          <div className="pt-6 border-t border-slate-800 text-slate-500 text-sm">
            <p>&copy; {currentYear} URL Query String Analyzer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
