import { notFound } from "next/navigation";
import { findNavItemByHref, type NavSection } from "@/lib/navigation";
import StubPage from "@/components/StubPage";
import FeeCalculatorPage from "@/components/tools/FeeCalculatorPage";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const item = findNavItemByHref(`/${slug.join("/")}`);
  return { title: item?.label ?? "Not Found" };
}

const CUSTOM_PAGES: Record<string, () => React.ReactNode> = {
  "/tools/calculators": () => <FeeCalculatorPage />,
};

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const href = `/${slug.join("/")}`;

  const item = findNavItemByHref(href);
  if (!item) notFound();

  const custom = CUSTOM_PAGES[href];
  if (custom) return <>{custom()}</>;

  const icon = "icon" in item ? item.icon : (item.parent as NavSection).icon;
  return <StubPage item={item} icon={icon} />;
}
