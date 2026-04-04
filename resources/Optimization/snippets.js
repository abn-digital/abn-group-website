/**
 * 30 Seconds of Code - Sniper Snippets for Logic & Performance
 */

// --- ARRAY MANIPULATION ---

/**
 * Chunk an array into smaller arrays of a specified size.
 */
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

/**
 * Count the occurrences of a value in an array.
 */
export const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

/**
 * Deep flatten an array.
 */
export const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

// --- BROWSER & DOM ---

/**
 * Determine if the current runtime environment is a browser.
 */
export const isBrowser = () => ![typeof window, typeof document].includes('undefined');

/**
 * Get the current scroll position of the page.
 */
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

/**
 * Smooth scroll to the top of the page.
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

// --- PERFORMANCE & OPTIMIZATION ---

/**
 * Simple debounce function to limit the rate at which a function can fire.
 */
export const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * Lazy loading helper for images using Intersection Observer.
 */
export const lazyLoad = (selector) => {
  const images = document.querySelectorAll(selector);
  const options = { root: null, rootMargin: '0px', threshold: 0.1 };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, options);

  images.forEach(img => observer.observe(img));
};
