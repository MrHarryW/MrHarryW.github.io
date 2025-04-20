// Simple client-side router for a single-page application
// This script handles navigation between different pages of the website without reloading the entire page.
// It uses the hash part of the URL to determine which page to load and fetches the corresponding HTML file.
const routes = {
  '/': './pages/home.html',
  '/about': './pages/about.html',
  '/projects': './pages/projects.html',
  '/contact': './pages/contact.html',
};

function loadPage() {
  const path = location.hash.replace('#', '') || '/';
  const page = routes[path] || routes['/'];
  fetch(page)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
    });
}

window.addEventListener('hashchange', loadPage);
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      window.location.hash = href;
    });
  });

  loadPage();
});
