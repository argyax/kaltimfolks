import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        user: true,
        editorial: true,
      },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found" }),
        { status: 404 }
      );
    }

    // increment views (safe)
    await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error("GET POST ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: err.message }),
      { status: 500 }
    );
  }
};

// UPDATE POST
export const PUT = async (req, { params }) => {
  const { slug } = params;

  try {
    const body = await req.json();

    const {
      title,
      desc,
      img,
      slug: newSlug,
      catSlug,
      director,
      chief,
      reporters,
      editors,
      phone,
      email,
    } = body;

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title,
        desc,
        img,
        slug: newSlug,
        catSlug,
        editorial: {
          upsert: {
            create: {
              director,
              chief,
              reporters,
              editors,
              phone,
              email,
            },
            update: {
              director,
              chief,
              reporters,
              editors,
              phone,
              email,
            },
          },
        },
      },
      include: {
        editorial: true,
      },
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: err.message }),
      { status: 500 }
    );
  }
};

// DELETE POST
export const DELETE = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { editorial: true },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found" }),
        { status: 404 }
      );
    }

    if (post.editorial) {
      await prisma.editorial.delete({
        where: { postId: post.id },
      });
    }

    await prisma.post.delete({
      where: { slug },
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