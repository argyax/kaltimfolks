import { updatePost } from "../../../../lib/dashboard";
import { fetchPost } from "../../../../lib/dashboardData";
import styles from "../../../components/ui/dashboard/posts/singlePosts/singlePosts.module.css";
import Image from "next/image";

const SinglepostPage = async ({ params }) => {
  const { id } = params;
  const post = await fetchPost(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {post?.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updatePost} className={styles.form}>
          <input type="hidden" name="id" value={post?.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={post?.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={post?.desc} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={post?.cat} />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder={post?.color || "color"}
          />
          <label>Size</label>
          <textarea
            type="text"
            name="size"
            placeholder={post?.size || "size"}
          />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            placeholder={post?.desc}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SinglepostPage;
