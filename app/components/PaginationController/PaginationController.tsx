"use client";

import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";

import styles from "./PaginationController.module.css";

interface PaginationControllerProps {
  totalPages: number;
  currentPage: number;
}

const generatePageNumbers = (totalPages: number, currentPage: number) => {
  const pageNumbers = [];

  // Add the first 3 pages
  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    pageNumbers.push(i);
  }

  // Add the last 3 pages
  for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Add the previous page from the current page
  for (let i = Math.max(1, currentPage - 2); i < currentPage; i++) {
    pageNumbers.push(i);
  }

  // Add the next page from the current page
  for (
    let i = currentPage + 1;
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Add the current page
  pageNumbers.push(currentPage);

  // Remove duplicates and sort the page numbers
  const finalPageNumbers = [...Array.from(new Set(pageNumbers))].sort(
    (a, b) => a - b
  );

  // Add placeholder pages where needed
  let previousPageValue = 0;
  for (let i = 0; i < finalPageNumbers.length; i++) {
    if (finalPageNumbers[i] - 1 !== previousPageValue) {
      finalPageNumbers.splice(i, 0, -1);

      i++;
    }

    previousPageValue = finalPageNumbers[i];
  }

  return finalPageNumbers;
};

const PaginationController = ({
  totalPages,
  currentPage,
}: PaginationControllerProps) => {
  const router = useRouter();

  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  return (
    <div className={styles.paginationControllerWrapper}>
      <div className={styles.paginationButtons}>
        <Button
          disabled={currentPage === 1}
          onClick={() => router.push(`?page=${1}`)}
          Icon={RiArrowLeftDoubleLine}
          iconFirst
          shape="original"
        />
        <Button
          disabled={currentPage === 1}
          onClick={() => router.push(`?page=${currentPage - 1}`)}
          Icon={IoIosArrowBack}
          iconFirst
          shape="original"
        />
      </div>
      <ul className={styles.paginationPages}>
        {pageNumbers.map((page, index) => {
          if (page === -1) {
            return (
              <li key={index} className={styles.pageItem}>
                ...
              </li>
            );
          } else {
            return (
              <li
                key={index}
                className={`${styles.pageItem} ${
                  page === currentPage ? styles.currentPage : ""
                }`}
                onClick={() => router.push(`?page=${page}`)}
              >
                {page}
              </li>
            );
          }
        })}
      </ul>
      <div className={styles.paginationButtons}>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => router.push(`?page=${currentPage + 1}`)}
          Icon={IoIosArrowForward}
          shape="original"
        />
        <Button
          disabled={currentPage === totalPages}
          onClick={() => router.push(`?page=${totalPages}`)}
          Icon={RiArrowRightDoubleLine}
          shape="original"
        />
      </div>
    </div>
  );
};

export default PaginationController;
