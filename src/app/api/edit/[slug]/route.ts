import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const PostSchema = z.object({
  title: z.string().min(1),
  desc: z.string().min(1),
  img: z.string().min(1),
  newSlug: z.string().min(1),
  catSlug: z.string().min(1),
});

// ✅ GET (VALID ROUTE)
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      select: {
        title: true,
        desc: true,
        img: true,
        slug: true,
        catSlug: true,
        editorial: true, // 🔥 biar gak kosong lagi
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post data" },
      { status: 500 }
    );
  }
}

// ✅ PATCH (VALID ROUTE)
export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const formData = await request.json();

  const validatedFields = PostSchema.safeParse(formData);

  if (!validatedFields.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        details: validatedFields.error.errors,
      },
      { status: 400 }
    );
  }

  const { title, desc, img, newSlug, catSlug } = validatedFields.data;

  try {
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

    revalidatePath(`/posts/${newSlug}`);

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}