import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { EnrichedArticle } from "@/types";

export function ArticlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article as EnrichedArticle | undefined;

  if (!article) {
    return <Navigate to="/" replace />;
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border p-8">
        <Button
          variant="ghost"
          className="mb-6 -ml-4 text-zinc-500"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to feed
        </Button>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge
            variant="secondary"
            className="bg-zinc-100 text-zinc-800 text-sm px-3 py-1"
          >
            {article.source.name}
          </Badge>
          {article.matchedTopic && (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none text-sm px-3 py-1">
              {article.matchedTopic}
            </Badge>
          )}
          <span className="text-sm text-zinc-400">{formattedDate}</span>
        </div>

        <h1 className="text-3xl font-extrabold text-zinc-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-auto rounded-lg mb-8 object-cover max-h-[400px]"
          />
        )}

        {article.author && (
          <p className="font-medium text-zinc-700 mb-6">By {article.author}</p>
        )}

        <div className="prose prose-zinc max-w-none mb-10 text-lg text-zinc-700 leading-relaxed">
          <p>{article.description}</p>
          <p className="mt-4">
            {article.content?.replace(/\[\+\d+ chars\]$/, "")}
          </p>
        </div>

        <div className="border-t pt-8 flex justify-between items-center">
          <p className="text-sm text-zinc-500">
            NewsAPI provides limited content. Read the full article on the
            original site.
          </p>
          <Button asChild>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read Original <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
