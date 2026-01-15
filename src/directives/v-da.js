/* 
пример использования
импортируем его в нужный компонент
v-da="'.products-e-shop__shop-header, 1024, first'"
*/

export default {
  mounted(el, binding) {
    const value = binding.value;
    if (!value) return;

    const [selector, breakpoint, place = "last"] = value
      .split(",")
      .map((v) => v.trim());

    const parent = el.parentNode;
    const anchor = document.createComment("v-da-anchor");
    parent.insertBefore(anchor, el);

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const getDestination = () => document.querySelector(selector);

    const moveTo = () => {
      const destination = getDestination();
      if (!destination) return;

      if (place === "first") {
        destination.prepend(el);
      } else if (place === "last" || isNaN(place)) {
        destination.append(el);
      } else {
        const pos = Number(place);
        destination.children[pos]?.before(el) || destination.append(el);
      }
    };

    const moveBack = () => {
      anchor.before(el);
    };

    const handler = (e) => {
      e.matches ? moveTo() : moveBack();
    };

    // старт
    handler(mediaQuery);

    mediaQuery.addEventListener("change", handler);

    el.__vDaCleanup__ = () => {
      mediaQuery.removeEventListener("change", handler);
      anchor.remove();
    };
  },

  unmounted(el) {
    el.__vDaCleanup__?.();
  },
};
