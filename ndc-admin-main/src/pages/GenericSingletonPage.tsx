import { useParams } from "react-router-dom";
import { PageEditor } from "../components/PageEditor";

export function GenericSingletonPage() {
  const { title, route } = useParams<{ title: string; route: string }>();
  return <PageEditor title={(title || "Page").replace(/-/g, " ")} route={decodeURIComponent(route || "")} />;
}
