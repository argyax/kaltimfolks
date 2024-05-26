import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    const count = await prisma.user.count({
      where: { name: { contains: q } },
    });
    const users = await prisma.user.findMany({
      where: { name: { contains: q } },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
      orderBy: {
        createdAt: "desc", // Sort by createdAt field in descending order
      },
      include: {
        posts: true,
      },
    });
    const usersWithPostCount = users.map((user) => ({
      ...user,
      postCount: user.posts.length,
    }));
    return { count, users: usersWithPostCount };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchPosts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    const count = await prisma.post.count({
      where: {
        title: { contains: q },
      },
    });
    const posts = await prisma.post.findMany({
      where: { title: { contains: q, mode: "insensitive" } },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });
    return { count, posts };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const fetchDatas = async () => {
  try {
    const data = await prisma.post.findMany();
    return data;
  } catch (error) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const fetchPost = async (id) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};
