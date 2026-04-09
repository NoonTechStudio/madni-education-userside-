"use client";

import { useEffect } from "react";

// Global scroll animation controller — fades in elements with `.fade-in` class
export default function ScrollAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));

    // Smooth anchor scroll with sticky nav offset
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const anchor = target.closest("a[href^='#']");
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const section = document.querySelector(id);
      if (!section) return;
      e.preventDefault();
      const offset = 80;
      const top =
        section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    document.addEventListener("click", handleClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
