import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//GET POST API
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat");
  const includeFollowerInsight = searchParams.get("includeFollowerInsight") === 'true';

  const POST_PER_PAGE = 9;
  const FETCH_EXTRA = 7;

  try {
    let posts = [];
    let totalPosts = 0;
    let hasMorePosts = true;
    let currentPage = page;

    const excludedIds = new Set();

    while (posts.length < POST_PER_PAGE && hasMorePosts) {
      const query = {
        take: POST_PER_PAGE + FETCH_EXTRA,
        skip: POST_PER_PAGE * (currentPage - 1),
        where: {
          ...(cat && { catSlug: cat }),
          id: {
            notIn: Array.from(excludedIds)
          }
        },
        orderBy: {
          createdAt: "desc"
        },
      };

      const [fetchedPosts, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where }),
      ]);

      const filteredPosts = includeFollowerInsight ? fetchedPosts : fetchedPosts.filter(post => post.catSlug !== "follower's insight");

      filteredPosts.forEach(post => excludedIds.add(post.id));
      posts = posts.concat(filteredPosts);
      totalPosts = count;
      hasMorePosts = fetchedPosts.length === (POST_PER_PAGE + FETCH_EXTRA);
      currentPage++;
    }

    posts = posts.slice(0, POST_PER_PAGE);

    return new NextResponse(
      JSON.stringify({ posts, count: totalPosts }, { status: 200 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};



// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// DELETE A POST
export const DELETE = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const postId = req.query.postId; // Assuming postId is passed as a query parameter
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
