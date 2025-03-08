const postTemplateDiv =
  '<div class="post"><a class="post-url">' +
  '<h2 class="post-title"></h2>' +
  '<p class="post-content"></p>' +
  '<p class="post-date"></p>' +
  "</a></div>";

function createPost(title, content, date, url) {
  const postDiv = document.createElement("div");
  postDiv.innerHTML = postTemplateDiv;
  const postTitle = postDiv.querySelector(".post-title");
  postTitle.textContent = title;
  const postContent = postDiv.querySelector(".post-content");
  postContent.textContent = content;
  const postDate = postDiv.querySelector(".post-date");
  postDate.textContent = date;
  const postUrl = postDiv.querySelector(".post-url");
  postUrl.href = url;
  return postDiv.querySelector(".post");
}

// Generation logic

const posts = [
    {
        title: "Post 1",
        content: "This is the content of the first post.",
        date: "2023-07-21",
        url: "post1.html"
    },
    {
        title: "Post 2",
        content: "This is the content of the second post.",
        date: "2023-07-22",
        url: "post2.html"
    },
    {
        title: "Post 3",
        content: "This is the content of the third post.",
        date: "2023-07-23",
        url: "post3.html"
    }
];

// ON page load (event listen)
document.addEventListener("DOMContentLoaded", () => {
    const postList = document.getElementById("post-list");
    posts.forEach(post => {
        const postDiv = createPost(post.title, post.content, post.date, post.url);
        postList.appendChild(postDiv);
    });
})