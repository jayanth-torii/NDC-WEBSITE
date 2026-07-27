import { useParams } from "react-router-dom";
import { JsonPageEditor } from "../components/JsonPageEditor";

export function GenericSingletonPage() {
  const { title, route } = useParams<{ title: string; route: string }>();
  return <JsonPageEditor title={(title || "Page").replace(/-/g, " ")} route={decodeURIComponent(route || "")} />;
}
