// Layout lock:
// Always start at "Overview" on load/reload and never restore scrolled position.
// This protects the fixed top boundary alignment of the first content row.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const RELEASE_DOWNLOAD_CONFIG = Object.freeze({
  // Keep false until public release assets are available.
  published: false,
  releasesPage: "https://github.com/earbash3-byte/ReSync-Releases/releases/latest",
  assets: Object.freeze({
    arm64: "",
    x86_64: ""
  })
});

let siteMeta = {
  version: "v1.0.0",
  updated: "2026-02-18",
  webVersion: "v3"
};

function forceOverviewStart() {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousBehavior;

  if (window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}

function downloadUrlForArch(arch) {
  const raw = (RELEASE_DOWNLOAD_CONFIG.assets[arch] || "").trim();
  if (RELEASE_DOWNLOAD_CONFIG.published && raw) {
    return raw;
  }
  return RELEASE_DOWNLOAD_CONFIG.releasesPage;
}

function applyDownloadLinks() {
  document.querySelectorAll("[data-download-option]").forEach((el) => {
    const arch = el.dataset.downloadOption;
    el.setAttribute("href", downloadUrlForArch(arch));
  });
}

function applySiteMeta() {
  document.querySelectorAll("[data-site-meta]").forEach((el) => {
    const key = el.dataset.siteMeta;
    if (Object.prototype.hasOwnProperty.call(siteMeta, key)) {
      el.textContent = siteMeta[key];
    }
  });
}

async function loadSiteMeta() {
  try {
    const response = await fetch("./version.json", { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload || typeof payload !== "object") return;

    if (typeof payload.appVersion === "string" && payload.appVersion.trim()) {
      siteMeta.version = payload.appVersion.trim();
    }
    if (typeof payload.updatedAt === "string" && payload.updatedAt.trim()) {
      siteMeta.updated = payload.updatedAt.trim();
    }
    if (typeof payload.webVersion === "string" && payload.webVersion.trim()) {
      siteMeta.webVersion = payload.webVersion.trim();
    }
    applySiteMeta();
  } catch (_) {
    // Keep fallback metadata if version.json cannot be loaded.
  }
}

function applyAdaptiveDownloadLabels() {
  document.querySelectorAll(".download-item[data-i18n-short]").forEach((el) => {
    const longLabel = (el.dataset.labelLong || el.textContent || "").trim();
    const shortLabel = (el.dataset.labelShort || longLabel).trim();
    if (!longLabel) return;

    el.textContent = longLabel;
    el.setAttribute("aria-label", longLabel);
    if (el.scrollWidth > el.clientWidth) {
      el.textContent = shortLabel;
      el.setAttribute("aria-label", shortLabel);
    }
  });
}

function initDownloadMenu() {
  const downloadSwitch = document.querySelector(".download-switch");
  const downloadToggle = document.getElementById("download-toggle");
  const downloadMenu = document.getElementById("download-menu");
  if (!downloadSwitch || !downloadToggle || !downloadMenu) return;

  const downloadItems = Array.from(downloadMenu.querySelectorAll("[data-download-option]"));

  const setDownloadMenuOpen = (open) => {
    downloadSwitch.classList.toggle("is-open", open);
    downloadToggle.setAttribute("aria-expanded", open ? "true" : "false");
    downloadMenu.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const closeDownloadMenu = () => {
    setDownloadMenuOpen(false);
  };

  const focusDownloadItemByOffset = (offset) => {
    if (downloadItems.length === 0) return;
    const active = document.activeElement;
    const idx = downloadItems.findIndex((item) => item === active);
    const start = idx >= 0 ? idx : 0;
    const nextIdx = (start + offset + downloadItems.length) % downloadItems.length;
    downloadItems[nextIdx]?.focus();
  };

  downloadToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = downloadSwitch.classList.contains("is-open");
    setDownloadMenuOpen(!isOpen);
    if (!isOpen) {
      downloadItems[0]?.focus();
    }
  });

  downloadToggle.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setDownloadMenuOpen(true);
      downloadItems[0]?.focus();
    }
  });

  downloadItems.forEach((item) => {
    item.addEventListener("click", () => {
      closeDownloadMenu();
      downloadToggle.focus();
    });

    item.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusDownloadItemByOffset(1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusDownloadItemByOffset(-1);
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeDownloadMenu();
        downloadToggle.focus();
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        item.click();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!downloadSwitch.contains(event.target)) {
      closeDownloadMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && downloadSwitch.classList.contains("is-open")) {
      closeDownloadMenu();
      downloadToggle.focus();
    }
  });

  setDownloadMenuOpen(false);
}

window.addEventListener("DOMContentLoaded", () => {
  forceOverviewStart();
  requestAnimationFrame(forceOverviewStart);
  applySiteMeta();
  loadSiteMeta();
  applyDownloadLinks();
  initDownloadMenu();
  applyAdaptiveDownloadLabels();
});

window.addEventListener("resize", applyAdaptiveDownloadLabels);
window.addEventListener("resync-layout", applyAdaptiveDownloadLabels);

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

for (const el of reveals) {
  observer.observe(el);
}
