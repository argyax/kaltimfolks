import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const PostSchema = z.object({
  title: z.string().min(1),
  desc: z.string().min(1),
  img: z.string().min(1),
  newSlug: z.string().min(1),
  catSlug: z.string().min(1),
});

// GET EDITABLE POST
export const getPostBySlug = async (slug: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      select: {
        title: true,
        desc: true,
        img: true,
        slug: true,
        catSlug: true,
      },
    });
    return post;
  } catch (error) {
    throw new Error("Failed to fetch post data");
  }
};

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const formData = await request.json();

  const validatedFields = PostSchema.safeParse(formData);

  if (!validatedFields.success) {
    return NextResponse.json({
      error: "Invalid input",
      details: validatedFields.error.errors,
    }, { status: 400 });
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
    console.error(error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}


// UPDATE POST EDIT
export const updatePost = async (
  slug: string,
  prevState: any,
  formData: FormData
) => {
  const validatedFields = PostSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.post.update({
      data: {
        title: validatedFields.data.title,
        desc: validatedFields.data.desc,
        img: validatedFields.data.img,
        slug: validatedFields.data.newSlug,
        catSlug: validatedFields.data.catSlug,
      },
      where: { slug },
    });
  } catch (error) {
    return { message: "Failed to update post" };
  }

  revalidatePath("/posts");
  redirect("/posts");
};
