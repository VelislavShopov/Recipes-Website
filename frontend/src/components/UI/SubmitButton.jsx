import classes from "./EditButton.module.css";

export default function SubmitButton({ ...props }) {
  return (
    <button
      className={classes.Btn}
      {...props}
      style={{ backgroundColor: "#B0DB9C", width: "7rem", justifySelf: "end" }}
    >
      Submit
      <svg
        className={classes.svg}
        viewBox="0 0 24 24"
        style={{ width: "20px" }}
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />{" "}
        {/* Checkmark icon */}
      </svg>
    </button>
  );
}
