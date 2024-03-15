import { Post, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") {
        throw new Error("Invalid request");
      }

      /**
       * Search posts
       */
      const posts: Array<Post & { user: User }> = await prisma.post.findMany({
        where: {
          OR: [
            {
             title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              desc: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              user: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        include: {
          user: true, // Include the user relationship
        },
      });

      /**
       * Save search
       */
      await prisma.searchQuery.create({
        data: {
          query,
        },
      });

      res.status(200).json({ posts });
    } catch (error: any) {
      console.error(error);
      res.status(500).end();
    }
  }
}
