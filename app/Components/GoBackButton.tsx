"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex items-center text-[#6b4f2b] hover:text-[#3e2f1c] transition-colors"
    >
      <ArrowLeft size={20} className="mr-2" />
      <span>Go Back</span>
    </button>
  );
}