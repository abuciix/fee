import KnowledgeLibraryView from "@/components/operations/KnowledgeLibraryView";
import { getKnowledgeArticles } from "@/lib/operations-queries";

export const metadata = { title: "Knowledge Library" };

export default async function KnowledgeLibraryPage() {
  const articles = await getKnowledgeArticles();
  return <KnowledgeLibraryView articles={articles} />;
}
