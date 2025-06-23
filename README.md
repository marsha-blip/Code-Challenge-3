## Blog Post Manager
A simple frontend app to view, add, edit, and delete blog posts using a mock REST API via json‑server.

## Learning Goals
GET posts from an API and render them in the DOM

Handle user interactions (clicks, form submissions)

(Advanced) Send POST, PATCH, and DELETE requests

Apply DOM updates responsively and manage app state


## Key Features & Endpoints
Feature	Core Behavior (Client-only)	Advanced Behavior (API-backed)	Endpoint
Display all posts	GET /posts → render list	Same	GET /posts
Click & view post detail	GET /posts/:id → show detail	Same  GET /posts/:id
Add new post	Form → add to DOM	POST /posts → refresh list	 POST /posts
Edit existing post	Inline form → update DOM	PATCH /posts/:id → refresh list	 PATCH /posts/:id
Delete post	Button → remove from DOM	DELETE /posts/:id → refresh list	 DELETE /posts/:id


## Viewing posts
On load, displayPosts() fetches all posts and displays them in #post-list.

## Selecting a post
Clicking a post title triggers handlePostClick(id), loading data into the detail pane.

## Adding a post
The #new-post-form is handled by addNewPostListener(), which creates a new post client‑side or sends a POST when advanced behavior is enabled.

## Editing a post
Clicking Edit reveals the #edit-post-form. Upon submission, the post is updated in the DOM or via PATCH for persistence.

## Deleting a post
The Delete button removes the post from view or calls DELETE and refreshes the list when API-backed

## Contributing
Fork the repo and branch off main

Implement new features (e.g., error handling, pagination)

Submit a pull request with details in the description 

## License
MIT License. Feel free to modify, reuse, and share!
## Author
  ## Mary Itumo
