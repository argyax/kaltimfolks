"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Import useSession from next-auth/react
import { Alert, Button, FileInput, Select } from 'flowbite-react';
import { RiAddLine, RiImageAddLine, RiUpload2Fill } from 'react-icons/ri';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import 'react-quill/dist/quill.snow.css';
import styles from "./writePage.module.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from "next/image";

const WritePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Use useSession hook
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [localMedia, setLocalMedia] = useState(""); // Store local media URL
  const [media, setMedia] = useState(""); // Store Firebase media URL
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");


  useEffect(() => {
    const storage = getStorage(app);

    if (status === "loading") return; // Wait until session is loaded

    if (!session) {
      // If user is not authenticated, redirect to login page
      router.push("/auth/login");
    }
  }, [session, status, router]);

  const upload = async () => {
    try {
      if (!file) {
        setFileUploadError('Please select a file');
        return;
      }

      const name = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, name);
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

  const handleSubmit = async () => {
    // Check if media is uploaded to Firebase
    if (!media) {
      console.log("Please upload the image first.");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "culture", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  const handleUploadFile = async (e) => {
    const uploadedFile = e.target.files[0];

    try {
      const localMediaUrl = URL.createObjectURL(uploadedFile); // Get local media URL
      setLocalMedia(localMediaUrl); // Store local media URL

      const name = new Date().getTime() + '-' + uploadedFile.name;
      const storageRef = ref(getStorage(app), name);
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

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
        }
      );
    } catch (error) {
      setFileUploadError('File upload failed');
      setFileUploadProgress(null);
      console.log(error);
    }
  };

  const [editorValue, setEditorValue] = useState('');

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
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
      <div>
        {/* <Button className={styles.button} onClick={() => setOpen(!open)}>
          <RiAddLine size={16} />
        </Button>
        {open && ( */}
        <div className={styles.add}>
          {/* This is headline image */}
          <p>Header image: </p>
          <FileInput
            type='file'
            accept='image/*, video/*'
            onChange={handleUploadFile}
          />
          <Button
            type='button'
            className={styles.addButton}
            size='sm'
            outline
            disabled={fileUploadProgress}
          >
            {fileUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={fileUploadProgress}
                  text={`${fileUploadProgress || 0}%`}
                />
              </div>
            ) : (
              <RiUpload2Fill size={16} onClick={handleUploadFile} />
            )}
          </Button>
        </div>
        {/* )} */}
      </div>
      {fileUploadError && <Alert color='failure'>{fileUploadError}</Alert>}
      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
          modules={{
            toolbar: [
              [{ header: '2' }], ,
              ['bold', 'italic', 'underline'],
              ['link'],
              ['image'],
              ['video'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['clean']
            ]
          }}
        />
        {/* Display uploaded file */}
        {media && <Image src={media} width={500} height={500} alt="Uploaded File" />}
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
