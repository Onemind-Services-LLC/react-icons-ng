"use client";
import { ALL_ICONS } from "@utils/icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

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
    pendingRoute: null as string | null,
    fromHistory: false,
  });
  const searchRef = useRef<HTMLInputElement>(null);
  const routerRef = useRef(router);
  const currentRouteRef = useRef(currentRoute);
  const debounceOnSearch = useRef<ReturnType<
    typeof debounce<(query: string) => void>
  > | null>(null);

  useEffect(() => {
    routerRef.current = router;
    currentRouteRef.current = currentRoute;
  });

  if (queryState.fromHistory || queryState.route !== currentRoute) {
    const isPendingRoute =
      !queryState.fromHistory && queryState.pendingRoute === currentRoute;
    setQueryState({
      route: currentRoute,
      value: isPendingRoute ? queryState.value : queryFromUrl,
      pendingRoute: null,
      fromHistory: false,
    });
  }

  // Created once; reads changing values through refs so a navigation never
  // cancels a pending search.
  useEffect(() => {
    debounceOnSearch.current = debounce((query: string) => {
      const url = query
        ? `${searchPath}?${new URLSearchParams({ q: query }).toString()}`
        : searchPath;
      if (url !== currentRouteRef.current) {
        setQueryState((state) => ({
          ...state,
          pendingRoute: url,
        }));
      }
      routerRef.current.push(url);
    }, 500);

    return () => debounceOnSearch.current?.cancel();
  }, []);

  // Back/Forward: drop pending work and resync the input from the URL.
  useEffect(() => {
    const onPopState = () => {
      debounceOnSearch.current?.cancel();
      setQueryState((state) => ({ ...state, fromHistory: true }));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setQueryState((state) => ({
      ...state,
      route: currentRoute,
      value: query,
    }));
    debounceOnSearch.current?.(query);
  };

  // Used by Home and icon links: cancel any pending search and clear the input.
  const resetSearch = () => {
    debounceOnSearch.current?.cancel();
    setQueryState({
      route: currentRoute,
      value: "",
      pendingRoute: null,
      fromHistory: false,
    });
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

        <ul className={`sidebar--links ${isOpen ? "active" : ""}`}>
          <li>
            <ActiveLink href="/">
              <span className="rounded px2 py1" onClick={resetSearch}>
                Home
              </span>
            </ActiveLink>
          </li>
          {iconsList.map((icon) => (
            <li key={icon.id}>
              <ActiveLink href={`/icons?name=${encodeURIComponent(icon.id)}`}>
                <span className="rounded px2 py1" onClick={resetSearch}>
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
