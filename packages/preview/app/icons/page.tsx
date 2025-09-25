"use client";
import IconsPageComponent from "@components/pages/icons";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function IconsPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return <>{name && <IconsPageComponent iconId={name} />}</>;
}
