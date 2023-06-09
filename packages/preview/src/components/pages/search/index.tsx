import { ALL_ICONS } from "@utils/icon";
import React from "react";

import SearchIconSet from "./search-iconset";
import { useRouter } from "next/router";
import escapeRegExp from "lodash/escapeRegExp";

export default function SearchPageComponent() {
  const allIcons = ALL_ICONS;
  const router = useRouter();
  const { q: query } = router.query;
  const sanitizedQuery = escapeRegExp(query);

  if (query?.length >= 2) {
    const highlightPattern = new RegExp(`(${sanitizedQuery})`, "i");
    return (
      <>
        <h2>
          Results for: <i>{query}</i>
        </h2>
        <div className="icons">
          {allIcons.map((icon) => (
            <SearchIconSet
              key={icon.id}
              icon={icon}
              query={query}
              highlightPattern={highlightPattern}
            />
          ))}
        </div>
        <h3 className="no-results" />
      </>
    );
  }
  return <h2>Please enter at least 2 characters to search...</h2>;
}
