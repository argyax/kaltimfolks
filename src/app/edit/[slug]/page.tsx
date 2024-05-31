import styles from "@/app/posts/[slug]/singlePage.module.css";
import EditForm from "@/app/components/EditForm/page";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/api/edit/[slug]/route";

const EditPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <EditForm post={post} />
  );
};

export default EditPage;
