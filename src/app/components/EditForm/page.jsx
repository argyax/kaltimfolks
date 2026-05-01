'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FileInput, Select } from 'flowbite-react';
import Image from 'next/image';
import styles from './editPage.module.css';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

/* ================= HELPERS ================= */

const uploadToBlob = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');

  const data = await res.json();
  return data.url;
};

function imageHandler() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    if (!input.files) return;
    const file = input.files[0];

    if (file.size > 800 * 1024) {
      alert('Max 800KB');
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    const range = this.quill.getSelection();
    this.quill.insertEmbed(range.index, 'image', blobUrl);
  };
}

const slugify = (str) =>
  str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* ================= COMPONENT ================= */

const EditForm = ({ post }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  /* 🔥 PREFILL DATA */
  const [title, setTitle] = useState(post?.title || "");
  const [value, setValue] = useState(post?.desc || "");
  const [catSlug, setCatSlug] = useState(post?.catSlug || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(post?.img || null);
  const [categories, setCategories] = useState([]);

  const [editorial, setEditorial] = useState({
    director: post?.editorial?.director || "",
    chief: post?.editorial?.chief || "",
    reporters: post?.editorial?.reporters || "",
    editors: post?.editorial?.editors || "",
    phone: post?.editorial?.phone || "",
    email: post?.editorial?.email || "",
  });

  const textareaRef = useRef(null);

  /* FETCH CATEGORY */
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/categories', { cache: 'no-store' });
      const json = await res.json();
      const filtered = json.filter(i => i.slug !== "follower's insight");
      setCategories(filtered);
    };
    fetchData();
  }, []);

  /* AUTH */
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/auth/login');
  }, [session, status, router]);

  /* AUTO RESIZE */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  /* FILE CHANGE */
  const handleFileChange = (e) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    if (uploaded.size > 800 * 1024) {
      alert('Max 800KB');
      return;
    }

    setFile(uploaded);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(uploaded);
  };

  /* HEADER IMAGE */
  const handleHeaderUpload = async () => {
    if (!file) return preview; // 🔥 pakai existing kalau tidak upload baru
    return await uploadToBlob(file);
  };

  /* SUBMIT */
  const handleSubmit = async () => {
    try {
      const headerUrl = await handleHeaderUpload();

      const parser = new DOMParser();
      const doc = parser.parseFromString(value, 'text/html');
      const images = doc.querySelectorAll('img');

      for (const img of images) {
        if (img.src.startsWith('blob:') || img.src.startsWith('data:')) {
          const blob = await fetch(img.src).then(r => r.blob());
          const file = new File([blob], `image-${Date.now()}.png`, { type: blob.type });

          const url = await uploadToBlob(file);
          img.src = url;
        }
      }

      const updatedContent = doc.body.innerHTML;

      const res = await fetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          desc: updatedContent,
          img: headerUrl,
          slug: slugify(title),
          catSlug,

          // 🔥 editorial ikut update
          ...editorial,
        }),
      });

      if (res.ok) {
        router.push(`/posts/${slugify(title)}`);
      } else {
        alert("Update gagal");
      }
    } catch (err) {
      console.error(err);
      alert('Error saat update');
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: '2' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        ['image'],
        ['video'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ],
      handlers: { image: imageHandler },
    },
  };

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.headerContainer}>
        <textarea
          ref={textareaRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <button onClick={handleSubmit} className={styles.publish}>
          Update
        </button>
      </div>

      {/* IMAGE */}
      <div className={styles.add}>
        {preview && (
          <Image src={preview} width={200} height={100} alt="preview" />
        )}
        <FileInput type="file" onChange={handleFileChange} />
      </div>

      {/* CATEGORY */}
      <Select value={catSlug} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="follower's insight">Follower's Insight</option>
        {categories.map(item => (
          <option key={item.id} value={item.slug}>
            {item.title}
          </option>
        ))}
      </Select>

      {/* 🔥 EDITORIAL */}
      <div className={styles.editorialBox}>
        <h3>Susunan Redaksi</h3>

        <div className={styles.editorialGrid}>
          <input
            placeholder="Direktur"
            value={editorial.director}
            onChange={(e) => setEditorial({ ...editorial, director: e.target.value })}
          />

          <input
            placeholder="Pimpinan Redaksi"
            value={editorial.chief}
            onChange={(e) => setEditorial({ ...editorial, chief: e.target.value })}
          />

          <input
            placeholder="Telepon"
            value={editorial.phone}
            onChange={(e) => setEditorial({ ...editorial, phone: e.target.value })}
          />

          <input
            placeholder="Email"
            value={editorial.email}
            onChange={(e) => setEditorial({ ...editorial, email: e.target.value })}
          />
        </div>

        <textarea
          placeholder="Wartawan"
          value={editorial.reporters}
          onChange={(e) => setEditorial({ ...editorial, reporters: e.target.value })}
        />

        <textarea
          placeholder="Editor"
          value={editorial.editors}
          onChange={(e) => setEditorial({ ...editorial, editors: e.target.value })}
        />
      </div>

      {/* CONTENT */}
      <div className={styles.editor}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />
      </div>

    </div>
  );
};

export default EditForm;