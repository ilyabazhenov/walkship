// Points the download buttons at the latest release's files. Without JS (or if GitHub's API
// doesn't answer) they lead to the release page, which lists the same files.
(async () => {
  try {
    const res = await fetch("https://api.github.com/repos/ilyabazhenov/walkship/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return;
    const release = await res.json();
    for (const link of document.querySelectorAll("[data-asset]")) {
      const ext = "." + link.dataset.asset;
      const asset = release.assets.find((a) => a.name.endsWith(ext));
      if (asset) link.href = asset.browser_download_url;
    }
    const version = release.tag_name.replace(/^v/, "");
    for (const el of document.querySelectorAll("[data-version]")) el.textContent = version;
  } catch {}
})();
