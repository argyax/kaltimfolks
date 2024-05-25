"use client";
import styles from "../../../ui/dashboard/posts/posts.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const DeleteUserButton = ({ value }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const router = useRouter();

  const handleDeleteUser = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    // params.set("page", 1);
    if (e.target.value) {
      params.set("id", e.target.value);
      // fetch(`http://localhost:3000/api/users/${e.target.value}`, {
      //   method: "DELETE",
      // });
      alert(e.target.value);
    } else {
      params.delete("id");
    }
    replace(`${pathname}?${params}`);
    // router.refresh();
  }, 300);

  return (
    <button
      key={value.id}
      value={value}
      onClick={handleDeleteUser}
      className={`${styles.button} ${styles.delete}`}
    >
      Delete
    </button>
  );
};

export default DeleteUserButton;
