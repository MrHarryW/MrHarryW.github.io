document.addEventListener("DOMContentLoaded", () => {
  const themeSwitcher = document.getElementById("theme-switcher");
  const currentTheme = localStorage.getItem("theme") || "theme-light";

  document.body.className = currentTheme;
  themeSwitcher.value = currentTheme;

  themeSwitcher.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;
    document.body.className = selectedTheme;
    localStorage.setItem("theme", selectedTheme);
  });
});