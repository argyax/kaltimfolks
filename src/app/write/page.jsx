"use client";
import { useEffect, useState } from "react";
import { Alert, Button, FileInput, Select } from 'flowbite-react';
import { RiAddLine, RiImageAddLine, RiUpload2Fill } from 'react-icons/ri';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import styles from "./writePage.module.css";
import { useRouter } from "next/navigation";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from "next/image";

const WritePage = () => {
  const router = useRouter();
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    const storage = getStorage(app);

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

    upload();
  }, [file]);

  const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
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

  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
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
      <div className={styles.editor}>
        <Button className={styles.button} onClick={() => setOpen(!open)}>
          <RiAddLine size={16} />
        </Button>
        {open && (
          <div className={styles.add}>
            <Button className={styles.addButton}>
              <label htmlFor="image">
                <RiImageAddLine size={16} />
              </label>
            </Button>
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
        )}
        {fileUploadError && <Alert color='failure'>{fileUploadError}</Alert>}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
        {media && <Image src={media} alt="Uploaded File" />} {/* Display uploaded file */}
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
