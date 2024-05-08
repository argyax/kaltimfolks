"use server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { contains } from "validator";

const prisma = new PrismaClient();

export const addUser = async (formData) => {
  const { name, email, password, phone, address, isAdmin, isActive } = formData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        isAdmin,
        isActive,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, name, email, password, phone, address, isAdmin, isActive } =
    formData;

  try {
    const updateFields = {
      name,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await prisma.user.update({
      where: { id },
      data: updateFields,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addPost = async (formData) => {
  const {
    id,
    title,
    desc,
    catSlug,
    cat,
    user,
    userEmail,
    views,
    createdAt,
    size,
  } = formData;

  try {
    await prisma.post.create({
      data: {
        id,
        title,
        desc,
        catSlug,
        cat,
        user,
        userEmail,
        views,
        createdAt,
        size,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
};

export const updatePost = async (formData) => {
  const {
    id,
    title,
    desc,
    catSlug,
    cat,
    user,
    userEmail,
    views,
    createdAt,
    size,
  } = formData;

  try {
    const updateFields = {
      title,
      desc,
      catSlug,
      cat,
      user,
      userEmail,
      views,
      createdAt,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await prisma.post.update({
      where: { id },
      data: updateFields,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
};

export const deleteUser = async (id) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deletePost = async (postId) => {
  try {
    await prisma.post.delete({
      where: { id: true }, // Provide the postId to specify the post to delete
    });
    // Optionally perform any additional actions after successful deletion
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post: " + err.message);
  }
};
