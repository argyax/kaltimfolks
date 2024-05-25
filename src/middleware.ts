import withAuth from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/dashboard"))
        return token?.role === "admin";
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/profile", "/admin/:path*"],
};
