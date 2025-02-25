import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function ArticleAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();

    // if the user is not an admin, redirect to article page
    if (!session?.user.isAdmin) {
        redirect("/articles");
    }

    return children;
}