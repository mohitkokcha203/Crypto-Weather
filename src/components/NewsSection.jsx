import { useSelector } from "react-redux";
import { ExternalLink } from "lucide-react";

const NewsSection = () => {
  const { articles, loading, error } = useSelector((state) => state.news);

  if (loading) {
    return (
      <div className="card">
        <h2 className="section-title">Crypto News</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="section-title">Crypto News</h2>
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          Error loading news data: {error}
        </div>
      </div>
    );
  }

  const displayArticles = articles?.length > 0 ? articles : [];

  return (
    <div className="card">
      <h2 className="section-title">Crypto News</h2>
      <div className="space-y-4">
        {displayArticles.map((article) => (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            key={article.source_id}
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          >
            <div className="flex justify-between">
              <h3 className="font-medium line-clamp-2">{article.title}</h3>
              <ExternalLink size={16} className="flex-shrink-0 ml-2 text-gray-500 dark:text-gray-400" />
            </div>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{article.description}</p>

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              {new Date(article.published_at).toLocaleDateString()}
              
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
