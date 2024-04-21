"use client";

import { updateSearchParams } from "@/lib/updateSearchParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";

import styles from "./Search.module.css";
import useDebounce from "@/app/hooks/useDebounce";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get("search_query") || ""
  );
  const [prevSearchText, setPrevSearchText] = useState(searchText);
  const clearRef = useRef<HTMLButtonElement>(null);

  const handleSearch = () => {
    // skip search if searchText haven't changed
    if (searchText !== prevSearchText) {
      setPrevSearchText(searchText);

      const newParams = updateSearchParams(searchParams, [
        { key: "search_query", value: searchText },
        { key: "page", value: "1" },
      ]);
      router.push(newParams);
    }
  };

  useDebounce(handleSearch, 500, [searchText]);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInputField}
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        {!searchText && (
          <div className={styles.searchIcon}>
            <IoSearch />
            <span>Search</span>
          </div>
        )}

        <button type="button" className={styles.searchDelete} ref={clearRef}>
          <CgCloseO
            onClick={() => {
              setSearchText("");
              clearRef.current?.blur();
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Search;
