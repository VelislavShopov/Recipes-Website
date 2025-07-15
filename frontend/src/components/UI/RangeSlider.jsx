import React, { useImperativeHandle, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useLoaderData, useSearchParams } from "react-router-dom";
import classes from "./RangeSlider.module.css";

export default function RangeSlider({ handleRecipesFilter, ref }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let min_value = searchParams.get("min_range");
  let max_search_value = searchParams.get("max_range");

  const loaderData = useLoaderData();
  const max_value = loaderData.longestCookingTime.max_value;

  if (min_value === null) {
    min_value = 1;
  }

  if (max_search_value === null) {
    max_search_value = max_value;
  }

  const [range, setRange] = useState([min_value, max_search_value]);

  useImperativeHandle(ref, () => ({
    resetRange() {
      setRange([1, max_value]);
    },
  }));

  function handleSetRange(newValue) {
    setRange(newValue);
  }

  return (
    <div className={classes.slider_container}>
      <div className={classes.slider_range}>
        <span>Min: {range[0]}</span>
        <span>Max: {range[1]}</span>
      </div>
      <Slider
        min={1}
        max={max_value}
        defaultValue={range}
        value={range}
        range
        onChange={(newValue) => handleSetRange(newValue)}
        allowCross={false}
        onChangeComplete={() =>
          handleRecipesFilter({
            range: {
              min: range[0],
              max: range[1],
            },
          })
        }
        trackStyle={[{ backgroundColor: "#3b82f6", height: 6 }]} // blue track
        handleStyle={[
          {
            opacity: "100%",
            borderColor: "#3b82f6",
            height: 20,
            width: 20,
            marginTop: -7,

            backgroundColor: "rgb(255,255,255)",
          },
          {
            opacity: "100%",
            borderColor: "#3b82f6",
            height: 20,
            marginTop: -7,

            width: 20,
            backgroundColor: "#ffffff",
          },
        ]}
      />
    </div>
  );
}
