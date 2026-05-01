'use client'
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FileInput, Select } from 'flowbite-react';
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
      alert('File size exceeds 800 KB');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = function () {
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

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [data, setData] = useState([]);

  // 🔥 EDITORIAL STATE
  const [editorial, setEditorial] = useState({
    director: "",
    chief: "",
    reporters: "",
    editors: "",
    phone: "",
    email: "",
  });

  const textareaRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/categories", { cache: "no-store" });
      const json = await res.json();
      const filtered = json.filter(i => i.slug !== "follower's insight");
      setData(filtered);
    };
    fetchData();
  }, []);

  // Auth check
  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/auth/login");
  }, [session, status]);

  // Auto resize title
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  // Handle file
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (f.size > 5000 * 1024) {
      alert('Max 5MB');
      return;
    }

    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  // Upload file
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  // Upload base64 image
  const uploadBase64Image = async (base64) => {
    const res = await fetch(base64);
    const blob = await res.blob();
    return await uploadFile(blob);
  };

  // Submit
  const handleSubmit = async () => {
    try {
      if (!file) {
        alert("Header image required");
        return;
      }

      const headerImageUrl = await uploadFile(file);

      const quillImages = document.querySelectorAll('.ql-editor img');

      for (const img of quillImages) {
        if (img.src.startsWith('data:')) {
          const url = await uploadBase64Image(img.src);
          img.src = url;
        }
      }

      const updatedContent = document.querySelector('.ql-editor').innerHTML;

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          desc: updatedContent,
          img: headerImageUrl,
          slug: slugify(title),
          catSlug: catSlug || "follower's insight",

          // 🔥 EDITORIAL SEND
          ...editorial,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const slugify = (str) =>
    str.toLowerCase().trim()
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
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
      ],
      handlers: { image: imageHandler }
    }
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.headerContainer}>
        <textarea
          ref={textareaRef}
          placeholder="Title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={styles.publish} onClick={handleSubmit}>
          Publish
        </button>
      </div>

      {/* IMAGE */}
      <div className={styles.add}>
        {preview && <Image src={preview} width={200} height={100} alt="preview" />}
        <p>Header image:</p>
        <FileInput onChange={handleFileChange} />
      </div>

      {/* CATEGORY */}
      <div className={styles["category-wrapper"]}>
        <p>Category:</p>
        <Select value={catSlug} onChange={(e) => setCatSlug(e.target.value)}>
          <option value="follower's insight">Follower's Insight</option>
          {data.map(item => (
            <option key={item.id} value={item.slug.toLowerCase()}>
              {item.title}
            </option>
          ))}
        </Select>
      </div>

      {/* EDITORIAL FORM */}
      <div className={styles.editorialBox}>
       <h3>Susunan Redaksi</h3>

       <div className={styles.editorialGrid}>
          <input placeholder="Direktur"
                  onChange={(e) => setEditorial({ ...editorial, director: e.target.value })}
                />

                <input placeholder="Pimpinan Redaksi"
                  onChange={(e) => setEditorial({ ...editorial, chief: e.target.value })}
                />



                <input placeholder="Telepon"
                  onChange={(e) => setEditorial({ ...editorial, phone: e.target.value })}
                />

                <input placeholder="Email"
                  onChange={(e) => setEditorial({ ...editorial, email: e.target.value })}
                />
        </div>
          <textarea placeholder="Wartawan"
                  onChange={(e) => setEditorial({ ...editorial, reporters: e.target.value })}
                />

          <textarea placeholder="Editor"
            onChange={(e) => setEditorial({ ...editorial, editors: e.target.value })}
          />
      </div>

      {/* CONTENT EDITOR */}
      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default WritePage;