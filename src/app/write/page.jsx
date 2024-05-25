"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Alert, Button, FileInput, Select } from 'flowbite-react';
import { RiAddLine, RiImageAddLine, RiUpload2Fill } from 'react-icons/ri';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import "react-quill/dist/quill.bubble.css";
import 'react-quill/dist/quill.snow.css';
import styles from "./writePage.module.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from "next/image";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const WritePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [preview, setPreview] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile.size > 800 * 1024) {
      setFileUploadError('File size exceeds 800 KB');
      setFile(null);
      setPreview(null);
      return;
    } else {
      setFileUploadError(null);
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      console.log("Please upload the image first.");
      return;
    }

    try {
      const name = new Date().getTime() + '-' + file.name;
      const storageRef = ref(getStorage(), name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setFileUploadError('File upload failed');
          setFileUploadProgress(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFileUploadProgress(null);
          setFileUploadError(null);
          setMedia(downloadURL);

          const res = await fetch("/api/posts", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              desc: value,
              img: downloadURL,
              slug: slugify(title),
              catSlug: catSlug || "culture",
            }),
          });

          if (res.status === 200) {
            const data = await res.json();
            router.push(`/posts/${data.slug}`);
          }
        }
      );
    } catch (error) {
      setFileUploadError('File upload failed');
      setFileUploadProgress(null);
      console.log(error);
    }
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const modules = {
    toolbar: {
      container: [
        [{ header: '2' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        ['image'],
        ['video'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
      ],
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        placeholder="Title"
        maxLength="90"
        rows="1"
        wrap="soft"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.add}>
        {preview && <Image src={preview} className={styles.preview} width={200} height={1000} alt="Preview" />}
        <p>Header image: </p>
        <FileInput
          type='file'
          accept='image/*, video/*'
          onChange={handleFileChange}
        />
        {fileUploadProgress && (
          <div>
            <CircularProgressbar
              value={fileUploadProgress}
              text={`${fileUploadProgress || 0}%`}
            />
          </div>
        )}
      </div>
      {fileUploadError && <Alert color='failure'>{fileUploadError}</Alert>}
      <div className={styles["category-wrapper"]}>
        <p>Category: </p>
        <Select className={styles.select} value={catSlug} onChange={(e) => setCatSlug(e.target.value)}>
          <option value="culture">Culture</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="movies">Movies</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="music">Music</option>
          <option value="ikn">IKN</option>
          <option value="politics">Politics</option>
        </Select>
      </div>
      <div className={styles.editor}>
        {typeof window !== 'undefined' && (
          <ReactQuill
            className={styles.textArea}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
            modules={modules}
          />
        )}
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
