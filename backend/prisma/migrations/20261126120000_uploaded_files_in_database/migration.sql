-- Admin-uploaded images move from the server disk into the database so they
-- persist across redeploys on managed hosting. Additive only.
CREATE TABLE "UploadedFile" (
    "path" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("path")
);
