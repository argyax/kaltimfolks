// pages/api/posts/[slug].js

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
    const { slug } = params;

    try {
        const post = await prisma.post.findUnique({
            where: { slug },
        });

        if (!post) {
            return new NextResponse(
                JSON.stringify({ message: "Post not found" }),
                { status: 404 }
            );
        }

        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        console.error("Error fetching post:", err);
        return new NextResponse(
            JSON.stringify({ message: "Failed to fetch post" }),
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
