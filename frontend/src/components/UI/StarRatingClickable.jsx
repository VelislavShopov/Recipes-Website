import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import {
  createRatingForRecipe,
  fetchRecipeBySlug,
} from "../../http requests/recipes";

export default function StarRatingClickable({ recipe, setIsRated, setRecipe }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  async function handleClick(index) {
    const response = await createRatingForRecipe(index, recipe.slug);
    setIsRated(response);
    setRecipe(await fetchRecipeBySlug(recipe.slug));
  }

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, i) => (
        <FontAwesomeIcon
          key={i}
          icon={hoveredIndex >= star ? solidStar : regularStar}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
          style={{ cursor: "pointer", color: "#f4c542" }} // adjust colour if needed
        />
      ))}
    </div>
  );
}
