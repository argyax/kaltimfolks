import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET posts with keyword-based search
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat");
  const query = searchParams.get("q"); // Get the search query parameter

  const POST_PER_PAGE = 6;

  const searchQuery = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
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
    orderBy: {
      createdAt: "desc" // Sort by createdAt field in descending order
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(searchQuery),
      prisma.post.count({ where: searchQuery.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};
