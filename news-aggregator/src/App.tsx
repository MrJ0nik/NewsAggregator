import { useState } from "react";
import { useCmsConfig } from "@/hooks/use-cms-config";
import { useNews } from "@/hooks/use-news";
import { NewsCard } from "@/components/news/NewsCard";
import { FilterBar } from "@/components/news/FilterBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";

function App() {
  const [keyword, setKeyword] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

  const debouncedKeyword = useDebounce(keyword, 300);

  const { data: config, isLoading: isConfigLoading } = useCmsConfig();

  const { data: news, isLoading: isNewsLoading } = useNews();

  if (isConfigLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 p-8 flex flex-col gap-8">
        <Skeleton className="h-12 w-[300px]" />
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[250px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  const displayNews = news?.filter((article) => {
    if (selectedSource !== "all") {
      const sourceObj = config?.allowedSources.find(
        (s) => s.id === selectedSource,
      );
      if (
        sourceObj &&
        article.source.name.toLowerCase() !== sourceObj.name.toLowerCase()
      ) {
        return false;
      }
    }

    if (debouncedKeyword.trim() !== "") {
      if (
        !article.title?.toLowerCase().includes(debouncedKeyword.toLowerCase())
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">
            News Aggregator
          </h1>
          <p className="text-zinc-500 mt-2">
            Curated feed controlled by Sanity CMS
          </p>
        </header>

        <FilterBar
          sources={config?.allowedSources || []}
          keyword={keyword}
          setKeyword={setKeyword}
          source={selectedSource}
          setSource={setSelectedSource}
        />

        <main>
          {isNewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[250px] w-full" />
              ))}
            </div>
          ) : displayNews?.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <p className="text-xl">No news found.</p>
              <p className="text-sm mt-2">
                Try adjusting your filters or adding sources in CMS.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayNews?.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
