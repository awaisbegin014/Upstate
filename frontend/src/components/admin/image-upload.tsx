"use client";

import { ImagePlus, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

/** Uploads one or more images to the API and reports their public URLs. */
export function ImageUploadButton({
  onUploaded,
  multiple = true,
  label = "Upload images",
}: {
  onUploaded: (url: string) => void;
  multiple?: boolean;
  label?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const { url } = await api<{ url: string }>("/admin/uploads", { method: "POST", body });
        onUploaded(url);
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple={multiple}
        className="hidden"
        onChange={(e) => upload(e.target.files)}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => input.current?.click()}
        className="inline-flex items-center gap-2 rounded-md border border-dashed bg-card px-4 py-3 text-sm font-semibold hover:border-primary disabled:opacity-60"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
        {busy ? "Uploading…" : label}
      </button>
    </>
  );
}
