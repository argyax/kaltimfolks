"use client";
import { deletePost } from "@/lib/dashboard";
// import styles from "../../components/ui/dashboard/posts/posts.module.css";
import styles from "../../../ui/dashboard/posts/posts.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
// import { RemovePost } from "../../../../../app/dashboard/fshy/func.jsx";

const DeleteButton = ({ value }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    // params.set("page", 1);
    if (e.target.value) {
      // params.set("id", e.target.value);
      // fetch(`http://localhost:3000/api/posts/${e.target.value}`, {
      //   method: "DELETE",
      // });
      alert(`Data berhasil dihapus`);
    } else {
      params.delete("id");
    }
    // replace("/");
    router.refresh();
  }, 300);

  return (
    <button
      key={value.id}
      value={value}
      onClick={handleDelete}
      className={`${styles.button} ${styles.delete}`}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
