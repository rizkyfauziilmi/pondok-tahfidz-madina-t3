import { api } from "~/trpc/server";
import { Hero } from "./_components/hero";
import { Location } from "./_components/location";
import { PreviewArticle } from "./_components/preview-article";
import { Footer } from "./_components/footer";

export default async function Home() {
  const articles = await api.articleRouter.getArticles({
    limit: 3,
    orderBy: "publishedAt",
    orderDirection: "desc",
    bypassErrors: true,
  });

  return (
    <div>
      <Hero />
      <PreviewArticle articles={articles} />
      <Location />
      <Footer />
    </div>
  );
}
