import classes from "./AddItemButton.module.css";

export default function AddItemButton({ ...props }) {
  return (
    <button type="button" class={classes.button} {...props}>
      <span class={classes.button_text}>Add Item</span>
      <span class={classes.button_icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke="currentColor"
          height="24"
          className={classes.svg}
        >
          <line y2="19" y1="5" x2="12" x1="12"></line>
          <line y2="12" y1="12" x2="19" x1="5"></line>
        </svg>
      </span>
    </button>
  );
}
