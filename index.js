const BASE_URL = 'http://localhost:3000/posts';
const postListEl = document.getElementById('post-list');
const postDetailEl = document.getElementById('post-detail');
const newForm = document.getElementById('new-post-form');

async function main() {
  await displayPosts();
  addNewPostListener();
}

async function displayPosts() {
  const res = await fetch(BASE_URL);
  const posts = await res.json();  // GET /posts 
  postListEl.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.innerHTML = `
      ${post.image ? `<img src="${post.image}">` : ''} ${post.title}
    `;
    div.onclick = () => showPost(post.id);
    postListEl.appendChild(div);
  });
  if (posts[0]) showPost(posts[0].id);
}

async function showPost(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const post = await res.json();  // GET /posts/:id 
  postDetailEl.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <em>— ${post.author}</em><br><br>
    <button id="edit-btn">Edit</button>
    <button id="delete-btn">Delete</button>
    <form id="edit-form" style="display:none;">
      <input id="edit-title" required><br><br>
      <textarea id="edit-content" required></textarea><br><br>
      <button type="submit">Save Changes</button>
    </form>
  `;

  document.getElementById('edit-btn').onclick = () => startEdit(post);
  document.getElementById('delete-btn').onclick = () => deletePost(post.id);
}

function startEdit(post) {
  const form = document.getElementById('edit-form');
  form.style.display = 'block';
  form['edit-title'].value = post.title;
  form['edit-content'].value = post.content;
  form.onsubmit = async e => {
    e.preventDefault();
    const updated = {
      title: form['edit-title'].value,
      content: form['edit-content'].value
    };
    // PATCH /posts/:id 
    await fetch(`${BASE_URL}/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    await displayPosts();
    await showPost(post.id);
  };
}

function addNewPostListener() {
  newForm.onsubmit = async e => {
    e.preventDefault();
    const newPost = {
      title: e.target['new-title'].value,
      content: e.target['new-content'].value,
      author: e.target['new-author'].value,
    };
    // POST /posts 
    await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });
    newForm.reset();
    await displayPosts();
  };
}

async function deletePost(id) {
  // DELETE /posts/:id 
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  postDetailEl.innerHTML = '<h2>Select a post</h2>';
  await displayPosts();
}

document.addEventListener('DOMContentLoaded', main);