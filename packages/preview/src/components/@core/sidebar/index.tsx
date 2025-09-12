"use client";
import { ALL_ICONS } from "@utils/icon";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";

import ActiveLink from "../active-link";
import Heading from "../heading";
import { debounce } from "@utils/debounce";
import { useDarkTheme } from "@context/DarkThemeContext";

const searchPath = "/search";

export default function Sidebar() {
  const iconsList = useMemo(
    () => ALL_ICONS.sort((a, b) => (a.name > b.name ? 1 : -1)),
    [],
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { isDarkTheme } = useDarkTheme();

  // search input stays in sync with the url query
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setInputQuery(q);
  }, [searchParams]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnSearch = useCallback(
    debounce((query: string) => {
      const url = query
        ? `${searchPath}?q=${encodeURIComponent(query)}`
        : searchPath;
      router.push(url);
    }, 500),
    [],
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setInputQuery(query);
    debounceOnSearch(query);
  };

  useEffect(() => {
    const searchNode = searchRef.current;

    const onKeyPress = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;

      // To avoid switching focus when the user is typing in input fields
      const isInputElement =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement;

      if (!isInputElement && e.key === "/") {
        searchNode?.focus();
      }
    };

    document.addEventListener("keyup", onKeyPress);

    return () => {
      document.removeEventListener("keyup", onKeyPress);
    };
  }, []);

  return (
    <div className={`${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="sidebar pt3">
        <Heading isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="search p2">
          <input
            type="text"
            aria-label="search"
            className="px2 py1"
            placeholder="🔍 Search Icons (/)"
            onChange={onSearch}
            ref={searchRef}
            value={inputQuery}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        <ul className={`sidebar--links ${isOpen && "active"}`}>
          <li>
            <ActiveLink href="/">
              <a className="rounded px2 py1">Home</a>
            </ActiveLink>
          </li>
          {iconsList.map((icon) => (
            <li key={icon.id}>
              <ActiveLink
                href={{ pathname: "icons", query: { name: icon.id } }}
              >
                <a
                  className="rounded px2 py1"
                  onClick={() => setInputQuery("")}
                >
                  {icon.name}
                </a>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
