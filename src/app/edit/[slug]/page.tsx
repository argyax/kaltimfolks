import EditForm from "@/app/components/EditForm/page";
import { notFound } from "next/navigation";

const getPost = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
};

const EditPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return <EditForm post={post} />;
};

export default EditPage;