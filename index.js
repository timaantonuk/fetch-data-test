const API_URL = 'https://jsonplaceholder.typicode.com/posts/';
const API_COMMENTS_URL =
  'https://jsonplaceholder.typicode.com/comments?postId=';

const postLayout = (postData) => {
  const commentsLayout = (author, content) => `<div class="post-comment">
<span class="post-comment__author">${author}</span>
<span class="post-comment__text">
${content}
</span>
</div>`;

  const commentsString = postData.comments
    .map((el) => commentsLayout(el.email, el.body))
    .join(',');

  return `<div id="post" class="post">
<h1 class="post__title">${postData.postTitle}</h1>
<p class="post__text">${postData.postText}</p>
<b class="post__comments-text">Comments:</b>
<div class="post__comments">
 ${commentsString}
</div>
</div>`;
};

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

async function renderPost(postId) {
  try {
    const selectedPost = await fetchData(API_URL + postId);

    const comments = await fetchData(API_COMMENTS_URL + postId);

    const post = postLayout({
      postTitle: selectedPost.title,
      postText: selectedPost.body,
      comments,
    });

    document.body.innerHTML = post;
  } catch (error) {
    console.error('failed to fetch data ' + error);
  }
}

renderPost(2);
