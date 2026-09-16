(() => {
  "use strict";
  const header = document.querySelector(".site-header");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const yearEl = document.getElementById("year");
  const progress = document.getElementById("progress");
  const backTop = document.getElementById("backTop");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (backTop) backTop.classList.toggle("show", y > 700);
    if (progress) {
      const h = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (backTop) backTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  // Mobile menu
  const closeMenu = () => {
    if (!nav || !menuBtn) return;
    nav.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  };
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(e.target) || menuBtn.contains(e.target)) return;
      closeMenu();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  // Typing
  const words = ["Android Apps", "Play Store Releases", "On-device AI", "Bangla Apps", "Clean Architecture"];
  const el = document.getElementById("typing");
  if (el && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let w = 0, c = 0, del = false;
    const tick = () => {
      const word = words[w];
      el.textContent = word.slice(0, c);
      if (!del && c < word.length) { c++; setTimeout(tick, 68); }
      else if (!del) { del = true; setTimeout(tick, 1300); }
      else if (c > 0) { c--; setTimeout(tick, 36); }
      else { del = false; w = (w + 1) % words.length; setTimeout(tick, 280); }
    };
    tick();
  } else if (el) el.textContent = words[0];

  // Scrollspy
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const secs = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && secs.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    secs.forEach((s) => obs.observe(s));
  }

  // Staggered reveal
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const sibs = [...e.target.parentElement.children].filter((x) => x.classList.contains("reveal"));
        e.target.style.transitionDelay = Math.min(sibs.indexOf(e.target) * 70, 280) + "ms";
        e.target.classList.add("in");
        ro.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    items.forEach((i) => ro.observe(i));
  } else {
    items.forEach((i) => i.classList.add("in"));
  }

  // Filter + count
  const btns = document.querySelectorAll(".f-btn");
  const cards = document.querySelectorAll(".proj");
  btns.forEach((b) => b.addEventListener("click", () => {
    btns.forEach((x) => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
    b.classList.add("active");
    b.setAttribute("aria-pressed", "true");
    const f = b.dataset.filter;
    let n = 0;
    cards.forEach((c) => {
      const show = f === "all" || c.dataset.cat === f;
      c.classList.toggle("hide", !show);
      if (show) { n++; requestAnimationFrame(() => c.classList.add("in")); }
    });
    const head = document.querySelector("#apps h2");
    if (head) head.textContent = f === "all" ? "Selected Apps" : `Selected Apps — ${n}`;
  }));
})();
