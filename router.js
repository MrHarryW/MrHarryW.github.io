const routes = {
  '/': '/index.html',
  '/projects': '/main/projects.html',
  '/protected/dashboard': '/protected/dashboard/index.html',
  '/protected/manage': '/protected/manage/index.html',
};

const app = document.getElementById('app');

async function loadPage(path) {
  const route = routes[path];
  if (!route) {
    app.innerHTML = '<h1>404 - Page Not Found</h1>';
    return;
  }

  const res = await fetch(route);
  const html = await res.text();
  app.innerHTML = html;
}

function handleNavigation(e) {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  history.pushState({}, '', href);
  loadPage(href);
}

function initRouter() {
  document.body.addEventListener('click', e => {
    if (e.target.matches('a[data-link]')) {
      handleNavigation(e);
    }
  });

  window.addEventListener('popstate', () => {
    loadPage(location.pathname);
  });

  // Initial load
  loadPage(location.pathname);
}

document.addEventListener('DOMContentLoaded', initRouter);
