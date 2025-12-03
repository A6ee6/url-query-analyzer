"use client";

export type QueryParam = {
  name: string;
  value: string;
  isUrl?: boolean;
};

interface QueryTableProps {
  queryParams: QueryParam[];
  onCopy: (text: string, id: string) => void;
  copied: string | null;
}

export default function QueryTable({ queryParams, onCopy, copied }: QueryTableProps) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg shadow-slate-200/50 dark:shadow-none rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/50 transition-all duration-300">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Query Parameters
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Found <span className="font-semibold text-indigo-600 dark:text-indigo-400">{queryParams.length}</span> parameter
              {queryParams.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
          <thead className="bg-slate-50 dark:bg-slate-800/80">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                #
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Parameter Name
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800/30 divide-y divide-slate-100 dark:divide-slate-700/30">
            {queryParams.map((param, index) => (
              <tr key={index} className="hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 dark:text-slate-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-sm font-mono font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-700/50">
                    {param.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-700 dark:text-slate-300 break-all max-w-md">
                  {param.isUrl ? (
                    <a
                      href={param.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span className="truncate">{param.value}</span>
                    </a>
                  ) : (
                    param.value || <span className="text-slate-400 dark:text-slate-500 italic">(empty)</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onCopy(param.value, `param-${index}`)}
                    className="p-2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    title="Copy value"
                  >
                    {copied === `param-${index}` ? (
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
