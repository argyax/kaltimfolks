import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// UPDATE POST
export const PUT = async (req, { params }) => {
  const { slug } = params;

  try {
    const { title, desc, img, slug: newSlug, catSlug } = await req.json();

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title,
        desc,
        img,
        slug: newSlug,
        catSlug,
      },
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error("Error updating post:", err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update post" }),
      { status: 500 }
    );
  }
};

// DELETE POST
export const DELETE = async (req, { params }) => {
  const { slug } = params;

  try {
    const deletedPost = await prisma.post.delete({
      where: { slug },
    });
    return new NextResponse(JSON.stringify(deletedPost), { status: 200 });
  } catch (err) {
    console.error("Error deleting post:", err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete post" }),
      { status: 500 }
    );
  }
};
