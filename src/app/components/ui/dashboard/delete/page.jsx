"use client";

import styles from "../../../ui/dashboard/posts/posts.module.css";
import { useRouter } from "next/navigation";

const DeleteButton = ({ value }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const confirmDelete = confirm("Yakin mau hapus post ini?");
      if (!confirmDelete) return;

      const res = await fetch(`/api/posts/${value.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Gagal delete");
      }

      alert("Data berhasil dihapus");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`${styles.button} ${styles.delete}`}
    >
      Delete
    </button>
  );
};

export default DeleteButton;