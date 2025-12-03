"use client";

export type QueryParam = {
  name: string;
  value: string;
  isUrl?: boolean;
};

interface ComparisonTableProps {
  queryParams1: QueryParam[];
  queryParams2: QueryParam[];
  onCopy: (text: string, id: string) => void;
  copied: string | null;
}

export default function ComparisonTable({ queryParams1, queryParams2, onCopy, copied }: ComparisonTableProps) {
  // Get all unique parameter names from both URLs
  const allParamNames = Array.from(new Set([...queryParams1.map((p) => p.name), ...queryParams2.map((p) => p.name)]));

  // Create a map for quick lookup
  const params1Map = new Map(queryParams1.map((p) => [p.name, p]));
  const params2Map = new Map(queryParams2.map((p) => [p.name, p]));

  const getParamValue = (map: Map<string, QueryParam>, name: string) => {
    return map.get(name)?.value || "";
  };

  const isParamMatch = (name: string) => {
    const val1 = getParamValue(params1Map, name);
    const val2 = getParamValue(params2Map, name);
    return val1 === val2;
  };

  const isUrl1 = (name: string) => {
    return params1Map.get(name)?.isUrl || false;
  };

  const isUrl2 = (name: string) => {
    return params2Map.get(name)?.isUrl || false;
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg shadow-slate-200/50 dark:shadow-none rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/50 transition-all duration-300">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Parameter Comparison
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Comparing <span className="font-semibold text-indigo-600 dark:text-indigo-400">{allParamNames.length}</span> unique parameter
              {allParamNames.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
          <thead className="bg-slate-50 dark:bg-slate-800/80">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Parameter Name
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                URL 1 Value
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                URL 2 Value
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Match
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800/30 divide-y divide-slate-100 dark:divide-slate-700/30">
            {allParamNames.map((paramName, index) => {
              const value1 = getParamValue(params1Map, paramName);
              const value2 = getParamValue(params2Map, paramName);
              const isMatch = isParamMatch(paramName);
              const hasValue1 = value1 !== "";
              const hasValue2 = value2 !== "";

              return (
                <tr
                  key={index}
                  className={`hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                    isMatch ? "bg-emerald-50/30 dark:bg-emerald-900/10" : "bg-amber-50/30 dark:bg-amber-900/10"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm font-mono font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-700/50">
                      {paramName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-700 dark:text-slate-300 break-all max-w-xs">
                    {hasValue1 ? (
                      isUrl1(paramName) ? (
                        <a
                          href={value1}
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
                          <span className="truncate">{value1}</span>
                        </a>
                      ) : (
                        value1
                      )
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 italic">(missing)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-700 dark:text-slate-300 break-all max-w-xs">
                    {hasValue2 ? (
                      isUrl2(paramName) ? (
                        <a
                          href={value2}
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
                          <span className="truncate">{value2}</span>
                        </a>
                      ) : (
                        value2
                      )
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 italic">(missing)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isMatch ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Match
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Different
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {hasValue1 && (
                        <button
                          onClick={() => onCopy(value1, `param1-${index}`)}
                          className="p-2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                          title="Copy URL 1 value"
                        >
                          {copied === `param1-${index}` ? (
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
                      )}
                      {hasValue2 && (
                        <button
                          onClick={() => onCopy(value2, `param2-${index}`)}
                          className="p-2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                          title="Copy URL 2 value"
                        >
                          {copied === `param2-${index}` ? (
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
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
