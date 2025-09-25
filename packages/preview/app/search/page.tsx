"use client";
import React, { Suspense } from "react";
import Container from "@components/@core/container";
import SearchPageComponent from "@components/pages/search";

export default function SearchPage() {
  return (
    <Container title="🔍 Search">
      <Suspense>
        <SearchPageComponent />
      </Suspense>
    </Container>
  );
}
