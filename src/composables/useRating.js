// src/composables/useRating.js
import { ref, onMounted } from "vue";

export function useRating(selector = ".rating") {
  const ratings = ref([]);

  onMounted(() => {
    ratings.value = Array.from(document.querySelectorAll(selector));
    if (ratings.value.length) initRatings();
  });

  let ratingActive, ratingValue;

  function initRatings() {
    ratings.value.forEach((rating) => initRating(rating));
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();
    if (rating.classList.contains("rating_set")) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = (index / 5) * 100; // 5 звезд
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(".rating__item");
    ratingItems.forEach((item, i) => {
      item.addEventListener("mouseenter", () => {
        initRatingVars(rating);
        setRatingActiveWidth(item.value);
      });

      item.addEventListener("mouseleave", () => {
        setRatingActiveWidth();
      });

      item.addEventListener("click", () => {
        initRatingVars(rating);
        if (rating.dataset.ajax) {
          setRatingValue(item.value, rating);
        } else {
          ratingValue.innerHTML = i + 1;
          setRatingActiveWidth();
        }
      });
    });
  }

  async function setRatingValue(value, rating) {
    if (!rating.classList.contains("rating_sending")) {
      rating.classList.add("rating_sending");
      try {
        const response = await fetch("rating.json"); // или свой API
        if (response.ok) {
          const result = await response.json();
          const newRating = result.newRating;
          ratingValue.innerHTML = newRating;
          setRatingActiveWidth();
        } else {
          alert("Error sending rating");
        }
      } catch (err) {
        alert("Error sending rating");
      } finally {
        rating.classList.remove("rating_sending");
      }
    }
  }
}
