import { type Prisma } from "@prisma/client";

export type ArticleWithUser = Prisma.ArticleGetPayload<{
  include: {
    author: {
      select: {
        image: true;
        name: true;
      };
    };
  };
}>;
