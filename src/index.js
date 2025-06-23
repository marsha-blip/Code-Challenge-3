// src/index.js

const baseURL = 'http://localhost:3000/posts';
let postsCache = [];

// Cache DOM nodes for reuse
const DOM = {
  postList: document.querySelector('#post-list'),
  detailTitle: document.querySelector('#detail-title'),
  detailContent: document.querySelector('#detail-content'),
  detailAuthor: document.querySelector('#detail-author'),
  detailImage: document.querySelector('#detail-image'),
  editBtn: document.querySelector('#edit-btn'),
  editForm: document.querySelector('#edit-form'),
  newForm: document.querySelector('#new-post-form')
};

// Initialize app
function main() {
  displayPosts();
  DOM.newForm.addEventListener('submit', handleNewPost);
}

document.addEventListener('DOMContentLoaded', main);

// Fetch and show all posts
async function displayPosts() {
  try {
    const res = await fetch(baseURL);
    postsCache = await res.json();
    renderPostList();
    if (postsCache[0]) loadPost(postsCache[0].id);
  } catch (err) {
    console.error(err);
  }
}

// Render post list with event delegation
function renderPostList() {
  DOM.postList.innerHTML = ''; 
  const frag = document.createDocumentFragment(); // batch insertion :contentReference[oaicite:1]{index=1}

  postsCache.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post-item';
    div.dataset.id = post.id;

    if (post.image) {
      const img = document.createElement('img');
      img.src = post.image;
      img.alt = post.title;
      img.className = 'thumbnail';
      img.onerror = () => img.remove();
      div.appendChild(img);
    }

    div.append(post.title);
    frag.appendChild(div);
  });

  DOM.postList.appendChild(frag);

  DOM.postList.onclick = e => {
    const parent = e.target.closest('.post-item');
    if (parent) loadPost(parent.dataset.id);
  };
}

// Load and display a single post
async function loadPost(id) {
  try {
    const res = await fetch(`${baseURL}/${id}`);
    const post = await res.json();
    showPostDetail(post);
  } catch (err) {
    console.error(err);
  }
}

// Populate detail view and wire up edit button
function showPostDetail(post) {
  DOM.detailTitle.textContent = post.title;
  DOM.detailContent.textContent = post.content;
  DOM.detailAuthor.textContent = post.author;

  if (post.image) {
    DOM.detailImage.src = post.image;
    DOM.detailImage.style.display = '';
  } else DOM.detailImage.style.display = 'none';

  DOM.editBtn.style.display = '';
  DOM.editBtn.onclick = () => openEditForm(post);
}

// Handle new-post form submission
function handleNewPost(e) {
  e.preventDefault();
  const form = e.target;
  const newPost = {
    id: Date.now(),
    title: form['new-title'].value,
    content: form['new-content'].value,
    author: form['new-author'].value,
    image: form['new-image'].value
  };
  postsCache.push(newPost);
  renderPostList();
  form.reset();
}

// Open inline edit form within detail pane
function openEditForm(post) {
  DOM.editForm.style.display = '';
  DOM.editForm['edit-title'].value = post.title;
  DOM.editForm['edit-content'].value = post.content;

  DOM.editForm.onsubmit = e => {
    e.preventDefault();
    post.title = DOM.editForm['edit-title'].value;
    post.content = DOM.editForm['edit-content'].value;
    renderPostList();
    showPostDetail(post);
    DOM.editForm.style.display = 'none';
  };
}
