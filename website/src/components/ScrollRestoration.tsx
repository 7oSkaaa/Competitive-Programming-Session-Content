import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map<string, number>();

function scrollTo(y: number) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  html.style.scrollBehavior = previous;
}

export default function ScrollRestoration() {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();
  const scrollKey = useRef(key);

  useLayoutEffect(() => {
    if (navigationType === "POP") {
      scrollTo(scrollPositions.get(key) ?? 0);
    } else {
      scrollTo(0);
    }
    scrollKey.current = key;
  }, [pathname, key, navigationType]);

  useEffect(() => {
    const savedKey = scrollKey.current;

    return () => {
      scrollPositions.set(savedKey, window.scrollY);
    };
  }, [pathname, key]);

  return null;
}
