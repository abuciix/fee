import DesignLibrariesView from "@/components/tools/DesignLibrariesView";
import { getLibraryItems } from "@/lib/tools-queries";

export const metadata = { title: "Design Libraries" };

export default async function DesignLibrariesPage() {
  const libraryItems = await getLibraryItems();
  return <DesignLibrariesView libraryItems={libraryItems} />;
}
