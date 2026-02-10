import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnrichedArticle } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronRight } from "lucide-react";

export function NewsCard({ article }: { article: EnrichedArticle }) {
  const navigate = useNavigate();

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const handleReadMore = () => {
    navigate("/article", { state: { article } });
  };

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

      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <div className="w-full text-sm text-zinc-400 text-left">
          {formattedDate}
        </div>
        <div className="flex w-full justify-between gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              View source <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
          <Button size="sm" onClick={handleReadMore} className="flex-1">
            View more <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
