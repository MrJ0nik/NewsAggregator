import { useCmsConfig } from "./hooks/use-cms-config";

function App() {
  const { data, isLoading, error } = useCmsConfig();

  if (isLoading)
    return <div className="p-10">Loading config from Sanity...</div>;
  if (error)
    return <div className="p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-3xl font-bold">CMS Connection Test</h1>

      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Allowed Sources:</h2>
        <ul className="list-disc pl-5">
          {data?.allowedSources.map((source) => (
            <li key={source.id}>
              <span className="font-semibold">{source.name}</span> (ID:{" "}
              {source.id})
            </li>
          ))}
        </ul>
      </div>

      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Topics:</h2>
        {data?.topics.map((topic) => (
          <div key={topic.id} className="mb-2">
            <span className="font-bold text-blue-600">{topic.name}:</span>{" "}
            {topic.keywords.join(", ")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
