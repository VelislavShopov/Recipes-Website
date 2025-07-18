import { useContext, useEffect, useState } from "react";
import classes from "./PageSelection.module.css";

export function PageSelection({ recipes, handlePageChange }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let pageInitial = [];
    if (recipes.total_pages <= 3) {
      for (let i = 1; i <= recipes.total_pages; i++) {
        pageInitial.push(i);
      }
    } else {
      if (recipes.current_page <= 2) {
        pageInitial.push(1);
        pageInitial.push(2);
        if (recipes.current_page === 2) {
          pageInitial.push(3);
          if (recipes.total_pages >= 5) {
            pageInitial.push("...");
          }
        } else {
          pageInitial.push("...");
        }

        pageInitial.push(recipes.total_pages);
      } else if (recipes.current_page >= recipes.total_pages - 1) {
        pageInitial.push(1);
        pageInitial.push("...");
        if (recipes.current_page === recipes.total_pages - 1) {
          pageInitial.push(recipes.total_pages - 2);
        }
        pageInitial.push(recipes.total_pages - 1);
        pageInitial.push(recipes.total_pages);
      } else {
        pageInitial.push(1);

        if (recipes.current_page - 1 !== 2) {
          pageInitial.push("...");
        }

        pageInitial.push(recipes.current_page - 1);
        pageInitial.push(recipes.current_page);
        pageInitial.push(recipes.current_page + 1);

        if (recipes.current_page + 1 !== recipes.total_pages - 1) {
          pageInitial.push("...");
        }

        pageInitial.push(recipes.total_pages);
      }
    }
    setPages(pageInitial);
  }, [recipes]);

  return (
    <div className={classes.container}>
      {pages.map((page) => {
        if (Number.isInteger(page)) {
          const disabled = page === recipes.current_page;
          const className = disabled
            ? `${classes.button} ${classes.disabled}`
            : classes.button;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={className}
              disabled={disabled}
            >
              {page}
            </button>
          );
        } else {
          return <p>...</p>;
        }
      })}
    </div>
  );
}
