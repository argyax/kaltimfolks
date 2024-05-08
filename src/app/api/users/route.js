import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// // GET USERS
// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);

//   const page = parseInt(searchParams.get("page")) || 1; // Parse page to integer, default to 1

//   const USER_PER_PAGE = 6;

//   const query = {
//     take: USER_PER_PAGE,
//     skip: USER_PER_PAGE * (page - 1),
//     orderBy: {
//       createdAt: "desc", // Sort by createdAt field in descending order
//     },
//   };

//   try {
//     const [users, count] = await prisma.$transaction([
//       prisma.user.findMany({
//         ...query,
//         include: {
//           posts: true,
//         },
//       }),
//       prisma.user.count(),
//     ]);

//     // Calculate post count for each user
//     const usersWithPostCount = users.map((user) => ({
//       ...user,
//       postCount: user.posts.length,
//     }));

//     return new NextResponse(
//       JSON.stringify({ users: usersWithPostCount, count }, { status: 200 })
//     );
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

// // DELETE USER
// export const DELETE = async (req) => {
//   try {
//     const { id } = req.body; // Extract user id from request body

//     // Delete user from the database
//     await prisma.user.delete({
//       where: {
//         id: id, // Ensure id is parsed to integer
//       },
//     });

//     return new NextResponse(
//       JSON.stringify({ message: "User deleted successfully" }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return new NextResponse(
//       JSON.stringify({ message: "Failed to delete user" }),
//       { status: 500 }
//     );
//   }
// };

export const GET = async (req) => {
  try {
    // const post = await prisma.user.findMany();
    const [users, count] = await prisma.$transaction([
      prisma.user.findMany(),
      prisma.user.count(),
    ]);
    return new NextResponse(JSON.stringify({ users, count }, { status: 200 }));
  } catch (error) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Kesalahan terjadi" }, { status: 500 })
    );
  }
};

export const DELETE = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse({ message: "Not Authenticated!" }, { status: 401 });
  }
  try {
    const userId = req.query.id;
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Ada masalah nih geys" }, { status: 500 })
    );
  }
};
