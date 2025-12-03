interface FooterProps {
  currentYear: number;
}

export default function Footer({ currentYear }: FooterProps) {
  return (
    <footer className="material-surface border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-indigo-500 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">URL Query Analyzer</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto mb-4">
            Extract and analyze query parameters from any URL, including shortened and encrypted links.
          </p>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
            <p>&copy; {currentYear} URL Query Analyzer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
