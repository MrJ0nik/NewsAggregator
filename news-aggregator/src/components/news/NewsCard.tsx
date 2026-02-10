import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnrichedArticle } from "@/types";

export function NewsCard({ article }: { article: EnrichedArticle }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start mb-2 gap-2">
          <Badge variant="secondary" className="bg-zinc-100 text-zinc-800">
            {article.source.name}
          </Badge>
          {article.matchedTopic && (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
              {article.matchedTopic}
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-xl">{article.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow text-zinc-600">
        <p className="line-clamp-3">
          {article.description || "No description available for this article."}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center text-sm text-zinc-400 border-t pt-4">
        <span>{formattedDate}</span>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          Read full &rarr;
        </a>
      </CardFooter>
    </Card>
  );
}
