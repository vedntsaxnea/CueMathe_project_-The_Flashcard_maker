"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Upload failed. Make sure the file is a valid PDF.");
      }

      const data = await res.json();
      if (data.deckId) {
        router.push(`/deck/${data.deckId}/study`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" style={{ position: 'absolute', top: '2rem', left: '2rem', color: 'var(--muted-foreground)' }}>
        &larr; Back to Home
      </Link>
      <div className={styles.card}>
        <h1 className={styles.title}>Upload Document</h1>
        <p className={styles.subtitle}>Upload your PDF and let our AI generate flashcards for you.</p>
        
        <form onSubmit={handleUpload}>
          <label className={styles.dropzone}>
            <div className={styles.uploadIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            {file ? (
              <span className={styles.fileName}>{file.name}</span>
            ) : (
              <span style={{ color: 'var(--muted-foreground)' }}>Click to select a PDF file</span>
            )}
            <input 
              type="file" 
              accept=".pdf" 
              className={styles.fileInput} 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
            />
          </label>
          <button 
            type="submit" 
            className={styles.button}
            disabled={!file || uploading}
          >
            {uploading ? "Generating Flashcards... (This may take a minute)" : "Upload & Generate"}
          </button>
          
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
}
