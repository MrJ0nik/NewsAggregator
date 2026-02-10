import { useCmsConfig } from "@/hooks/use-cms-config";
import { useNews } from "@/hooks/use-news";

function App() {
  const { data: config, isLoading: isConfigLoading } = useCmsConfig();
  const { data: news, isLoading: isNewsLoading, error: newsError } = useNews();

  if (isConfigLoading)
    return <div className="p-10">Loading config from Sanity...</div>;

  return (
    <div className="p-10 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">News Aggregator Logic Test</h1>

      {/* CMS Data (для перевірки) */}
      <div className="flex gap-4">
        <div className="border p-4 rounded shadow bg-white flex-1">
          <h2 className="text-xl font-bold mb-2">Allowed Sources (CMS):</h2>
          <ul className="list-disc pl-5">
            {config?.allowedSources.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </div>
        <div className="border p-4 rounded shadow bg-white flex-1">
          <h2 className="text-xl font-bold mb-2">Topics (CMS):</h2>
          {config?.topics.map((t) => (
            <div key={t.id}>
              <span className="font-bold">{t.name}:</span>{" "}
              {t.keywords.join(", ")}
            </div>
          ))}
        </div>
      </div>

      {/* News Data */}
      <div className="border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4">
          Filtered News ({news?.length || 0} articles found):
        </h2>

        {isNewsLoading && <p>Loading news from NewsAPI...</p>}
        {newsError && (
          <p className="text-red-500">Error: {newsError.message}</p>
        )}

        <div className="space-y-4">
          {news?.map((article, idx) => (
            <div key={idx} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-zinc-800 text-white text-xs px-2 py-1 rounded">
                  {article.source.name}
                </span>
                {article.matchedTopic && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">
                    Topic: {article.matchedTopic}
                  </span>
                )}
                <span className="text-gray-400 text-xs">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{article.title}</h3>
            </div>
          ))}

          {news?.length === 0 && !isNewsLoading && (
            <p className="text-gray-500">
              No news found matching your allowed CMS sources.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
