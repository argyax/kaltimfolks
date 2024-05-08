import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Next } from "react-bootstrap/esm/PageItem";

// export const GET = async (req, { params }) => {
//   const { email } = params;

//   try {
//     const users = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     return new NextResponse(JSON.stringify(users, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went user!" }, { status: 500 })
//     );
//   }
// };

// export const DELETE = async (req, { params }) => {
//   const { email } = params;

//   try {
//     const deletedUser = await prisma.user.delete({
//       where: { email },
//     });
//     return new NextResponse(JSON.stringify(deletedUser), { status: 200 });
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     return new NextResponse(
//       JSON.stringify({ message: "Failed to delete user" }),
//       { status: 500 }
//     );
//   }
// };

// export const GET = async (req, { params }) => {
// const { email } = params;

// try {
//   const user = await prisma.post.findUnique({
//     where: { email },
//     // data: { views: { increment: 1 } },
//     // include: { user: false },
//   });
//   return new NextResponse(JSON.stringify({ user }, { status: 200 }));
// } catch (err) {
//   console.log(err);
//   return new NextResponse(
//     JSON.stringify({ message: "Something went wrong!" }),
//     { status: 500 }
//   );
// }
// };

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const post = await prisma.user.findUnique({
      where: { id },
      // data: { views: { increment: 1 } },
      // include: { user: true },
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

export const DELETE = async (req, { params }) => {
  const { id } = { params };

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    return new NextResponse(JSON.stringify(deletedUser), { status: 200 });
  } catch (err) {
    console.error("Error deleting post:", err);
    return new NextResponse(JSON.stringify({ message: "Failed to delete X" }), {
      status: 500,
    });
  }
};
