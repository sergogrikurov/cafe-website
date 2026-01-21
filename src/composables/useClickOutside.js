import { onMounted, onBeforeUnmount } from "vue";

/**
 * useClickOutside - закрывает элемент при клике вне него
 * @param {Ref<HTMLElement>} refElement - ref на элемент
 * @param {Function} callback - функция, вызываемая при клике вне
 * @param {Ref<HTMLElement>} [refExclude] - ref на элемент, который исключается (например, кнопка открытия dropdown)
 */
export function useClickOutside(refElement, callback, refExclude = null) {
  const handleClick = (e) => {
    if (!refElement.value) return;
    if (refExclude && refExclude.value && refExclude.value.contains(e.target))
      return;
    if (!refElement.value.contains(e.target)) {
      callback();
    }
  };

  onMounted(() => document.addEventListener("click", handleClick));
  onBeforeUnmount(() => document.removeEventListener("click", handleClick));
}
