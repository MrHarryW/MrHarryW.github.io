// Updated routes
const routes = {
    '/': './main/home.html',
    '/projects': 'main/projects.html',
    
    // Protected routes
    '/dashboard': './protected/dashboard/index.html',
    '/dashboard/results': './protected/dashboard/results.html',
    '/dashboard/manage': './protected/dashboard/manage/index.html'
};

// List of protected paths (anything starting with /dashboard requires login)
const protectedPaths = ['/dashboard'];

let users = JSON.parse(localStorage.getItem('users')) || [{ username: 'admin', password: 'password' }];
let isLoggedIn = sessionStorage.getItem('loggedIn') === 'true'; // survives page reloads in same tab

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

async function loadPage(path) {
    const contentDiv = document.getElementById('content');
    
    // Check if path is protected
    const isProtected = protectedPaths.some(p => path.startsWith(p));
    if (isProtected && !isLoggedIn) {
        showLoginForm(path);
        return;
    }

    try {
        const response = await fetch(routes[path] || routes['/']);
        if (response.ok) {
            contentDiv.innerHTML = await response.text();
            if (path === '/dashboard/manage') initManagePage();
        } else {
            contentDiv.innerHTML = '<h2>404 - Page Not Found</h2>';
        }
    } catch (err) {
        contentDiv.innerHTML = '<h2>Error loading page</h2>';
    }
}

function showLoginForm(redirectPath) {
    document.getElementById('content').innerHTML = `
        <div style="text-align:center; max-width: 400px; margin: 50px auto;">
            <h2>Login Required</h2>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Username" required><br><br>
                <input type="password" id="password" placeholder="Password" required><br><br>
                <button type="submit">Login</button>
            </form>
        </div>
    `;

    document.getElementById('loginForm').onsubmit = (e) => {
        e.preventDefault();
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;
        const valid = users.some(user => user.username === u && user.password === p);
        if (valid) {
            isLoggedIn = true;
            sessionStorage.setItem('loggedIn', 'true');
            window.location.hash = redirectPath;
        } else {
            alert('Wrong username or password!');
        }
    };
}

// Rest of the manage page functions stay the same (editUser, deleteUser, initManagePage)
// ... (copy them from the previous version – they are unchanged)

function initManagePage() { /* same as before */ }
window.editUser = function(i) { /* same */ }
window.deleteUser = function(i) { /* same */ }

// Router logic
function router() {
    let path = window.location.hash.slice(1) || '/';
    // Default to dashboard if trying to access a protected subpage directly
    if (!routes[path] && path.startsWith('/dashboard')) path = '/dashboard';
    loadPage(path);
}

window.addEventListener('hashchange', router);
document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        window.location.hash = link.getAttribute('data-route');
    });
});
router();
