import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET POSTS
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat");
  const includeFollowerInsight = searchParams.get("includeFollowerInsight") === "true";

  const POST_PER_PAGE = 9;

  try {
    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(cat && { catSlug: cat }),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        editorial: true,
      },
    });

    const filtered = includeFollowerInsight
      ? posts
      : posts.filter((p) => p.catSlug !== "follower's insight");

    const count = await prisma.post.count({
      where: {
        ...(cat && { catSlug: cat }),
      },
    });

    return new NextResponse(
      JSON.stringify({ posts: filtered, count }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: err.message }),
      { status: 500 }
    );
  }
};

// CREATE POST
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const {
      title,
      desc,
      img,
      slug,
      catSlug,
      director,
      chief,
      reporters,
      editors,
      phone,
      email,
    } = body;

    const post = await prisma.post.create({
      data: {
        title,
        desc,
        img,
        slug,
        catSlug,
        userEmail: session.user.email,
        editorial: {
          create: {
            director,
            chief,
            reporters,
            editors,
            phone,
            email,
          },
        },
      },
      include: {
        editorial: true,
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: err.message }),
      { status: 500 }
    );
  }
};

// DELETE POST (simple)
export const DELETE = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    await prisma.post.delete({
      where: { id: postId },
    });

    return new NextResponse(
      JSON.stringify({ message: "Deleted" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: err.message }),
      { status: 500 }
    );
  }
};