"use client";

export type QueryParam = {
  name: string;
  value: string;
  isUrl?: boolean;
};

interface AlignedQueryTableProps {
  queryParams: QueryParam[];
  queryParams2?: QueryParam[];
  onCopy: (text: string, id: string) => void;
  copied: string | null;
  isComparison?: boolean;
}

export default function AlignedQueryTable({ queryParams, queryParams2, onCopy, copied, isComparison = false }: AlignedQueryTableProps) {
  // For comparison mode, get all unique parameter names from both URLs
  const allParamNames =
    isComparison && queryParams2
      ? Array.from(new Set([...queryParams.map((p) => p.name), ...queryParams2.map((p) => p.name)]))
      : queryParams.map((p) => p.name);

  // Create maps for quick lookup
  const params1Map = new Map(queryParams.map((p) => [p.name, p]));
  const params2Map = queryParams2 ? new Map(queryParams2.map((p) => [p.name, p])) : null;

  const getParamValue = (map: Map<string, QueryParam> | null, name: string) => {
    return map?.get(name)?.value || "";
  };

  const isUrl = (map: Map<string, QueryParam> | null, name: string) => {
    return map?.get(name)?.isUrl || false;
  };

  const isParamMatch = (name: string) => {
    if (!isComparison || !params2Map) return true;
    const val1 = getParamValue(params1Map, name);
    const val2 = getParamValue(params2Map, name);
    return val1 === val2;
  };

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
              Found <span className="font-semibold text-indigo-600 dark:text-indigo-400">{allParamNames.length}</span> parameter
              {allParamNames.length !== 1 ? "s" : ""}
              {isComparison && " (aligned for comparison)"}
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
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800/30 divide-y divide-slate-100 dark:divide-slate-700/30">
            {allParamNames.map((paramName, index) => {
              const value = getParamValue(params1Map, paramName);
              const value2 = isComparison ? getParamValue(params2Map, paramName) : "";
              const hasValue = value !== "";
              const hasValue2 = isComparison ? value2 !== "" : true;
              const isMatch = isParamMatch(paramName);
              const isUrlValue = isUrl(params1Map, paramName);
              const isUrlValue2 = isComparison ? isUrl(params2Map, paramName) : false;

              return (
                <tr
                  key={index}
                  className={`hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                    isComparison ? (isMatch ? "bg-emerald-50/30 dark:bg-emerald-900/10" : "bg-amber-50/30 dark:bg-amber-900/10") : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 dark:text-slate-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm font-mono font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-700/50">
                      {paramName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start justify-between group">
                      <div className="flex-1 text-sm font-mono text-slate-700 dark:text-slate-300 break-all min-w-0">
                        {hasValue ? (
                          isUrlValue ? (
                            <a
                              href={value}
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
                              <span className="truncate">{value}</span>
                            </a>
                          ) : (
                            value
                          )
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 italic">(missing)</span>
                        )}
                      </div>
                      {hasValue && (
                        <button
                          onClick={() => onCopy(value, `param-${index}`)}
                          className="ml-2 p-1.5 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 opacity-0 group-hover:opacity-100 flex-shrink-0"
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
