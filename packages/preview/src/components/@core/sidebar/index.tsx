"use client";
import { ALL_ICONS } from "@utils/icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useMemo, useEffect, useRef } from "react";

import ActiveLink from "../active-link";
import Heading from "../heading";
import { debounce } from "@utils/debounce";

const searchPath = "/search";
const iconsList = [...ALL_ICONS].sort((a, b) => (a.name > b.name ? 1 : -1));

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const queryFromUrl = searchParams.get("q") ?? "";
  const currentRoute = `${pathname}${search ? `?${search}` : ""}`;
  const [isOpen, setIsOpen] = useState(false);
  const [queryState, setQueryState] = useState({
    route: currentRoute,
    value: queryFromUrl,
    pendingRoutes: [] as string[],
    fromHistory: false,
  });
  const searchRef = useRef<HTMLInputElement>(null);

  if (queryState.fromHistory || queryState.route !== currentRoute) {
    const isPendingRoute =
      !queryState.fromHistory &&
      queryState.pendingRoutes.includes(currentRoute);
    setQueryState({
      route: currentRoute,
      value: isPendingRoute ? queryState.value : queryFromUrl,
      pendingRoutes: isPendingRoute
        ? queryState.pendingRoutes.filter((route) => route !== currentRoute)
        : [],
      fromHistory: false,
    });
  }

  const debounceOnSearch = useMemo(
    () =>
      debounce((query: string) => {
        const url = query
          ? `${searchPath}?${new URLSearchParams({ q: query }).toString()}`
          : searchPath;
        if (url !== currentRoute) {
          setQueryState((state) => ({
            ...state,
            pendingRoutes: state.pendingRoutes.includes(url)
              ? state.pendingRoutes
              : [...state.pendingRoutes, url],
          }));
        }
        router.push(url);
      }, 500),
    [currentRoute, router],
  );

  useEffect(() => {
    return () => debounceOnSearch.cancel();
  }, [debounceOnSearch]);

  useEffect(() => {
    const onPopState = () => {
      debounceOnSearch.cancel();
      setQueryState((state) => ({ ...state, fromHistory: true }));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [debounceOnSearch]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setQueryState((state) => ({
      ...state,
      route: currentRoute,
      value: query,
    }));
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
    <div className="sidebar-container">
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
            value={queryState.value}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        <ul className={`sidebar--links ${isOpen && "active"}`}>
          <li>
            <ActiveLink href="/">
              <span className="rounded px2 py1">Home</span>
            </ActiveLink>
          </li>
          {iconsList.map((icon) => (
            <li key={icon.id}>
              <ActiveLink href={`/icons?name=${encodeURIComponent(icon.id)}`}>
                <span
                  className="rounded px2 py1"
                  onClick={() => {
                    debounceOnSearch.cancel();
                    setQueryState({
                      route: currentRoute,
                      value: "",
                      pendingRoutes: [],
                      fromHistory: false,
                    });
                  }}
                >
                  {icon.name}
                </span>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
