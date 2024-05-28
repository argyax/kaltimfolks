'use client'
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Alert, FileInput, Select } from 'flowbite-react';
import { getStorage, ref, uploadBytesResumable, uploadString, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import styles from "./writePage.module.css";
import Image from "next/image";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function imageHandler() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    if (!input.files) return;
    const file = input.files[0];

    if (file.size > 800 * 1024) {
      alert('File size exceeds 800 KB, please compress the image');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      const cursorPosition = this.quill.getSelection().index;
      this.quill.insertEmbed(cursorPosition, 'image', base64Image);
      this.quill.setSelection(cursorPosition + 1);
    };

    reader.readAsDataURL(file);
  };
}

const WritePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile.size > 800 * 1024) {
      alert('File size exceeds 800 KB, please compress the image');
      setFile(null);
      setPreview(null);
      return;
    } else {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleHeaderImageUpload = async () => {
    if (!file) return null;

    return new Promise((resolve, reject) => {
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
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFileUploadProgress(null);
          setFileUploadError(null);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async () => {
    try {
      const headerImageUrl = await handleHeaderImageUpload();

      const quillImages = document.querySelectorAll('.ql-editor img');
      for (const img of quillImages) {
        if (img.src.startsWith('data:')) {
          const name = new Date().getTime() + '-' + Math.random().toString(36).substr(2, 9);
          const storageRef = ref(getStorage(), name);
          await uploadString(storageRef, img.src, 'data_url');
          const downloadURL = await getDownloadURL(storageRef);
          img.src = downloadURL;
        }
      }

      const updatedContent = document.querySelector('.ql-editor').innerHTML;

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          desc: updatedContent,
          img: headerImageUrl,
          slug: slugify(title),
          catSlug: catSlug || "follower's insight",
        }),
      });

      if (headerImageUrl === null) {
        alert('Please add the header image');
        return;
      }

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      }
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
      handlers: {
        image: imageHandler
      }
    }
  };

  return (
    <div className={styles.container}>
      {fileUploadProgress && (
        <progress value={fileUploadProgress} className={styles.progress} max="100" />
      )}
      <div className={styles.headerContainer}>
        <textarea
          ref={textareaRef}
          placeholder="Title"
          maxLength="120"
          rows="1"
          wrap="soft"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ overflow: 'hidden', resize: 'none' }}
        />
        <button className={styles.publish} onClick={handleSubmit}>
          Publish
        </button>
      </div>
      <div className={styles.add}>
        {preview && <Image src={preview} className={styles.preview} width={200} height={100} alt="Preview" />}
        <p>Header image: </p>
        <FileInput
          type='file'
          accept='image/*, video/*'
          onChange={handleFileChange}
        />
      </div>
      <div className={styles["category-wrapper"]}>
        <p>Category: </p>
        <Select className={styles.select} value={catSlug} onChange={(e) => setCatSlug(e.target.value)}>
          <option value="follower's insight">Follower&apos;s Insight</option>
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
    </div>
  );
};

export default WritePage;
