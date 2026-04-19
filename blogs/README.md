# 📝 How to Add New Blog Posts

Adding a new post is very simple since the site consists of pure static files. Follow these two main steps:

### 1. Create the New Post Page
1. Duplicate the `blog-template.html` file in this directory and rename it to your desired slug (e.g., `setting-up-aws-eks.html`).
2. Open your newly created file and update:
   - `<title>` and `<meta name="description">` inside the `<head>` for SEO.
   - The `<h1 class="post-title">` to your article name.
   - The `.post-meta` section with the correct date, tag, and read time.
3. Replace the sample content inside the `<article>` tag with your own HTML content. *Hint: Use `<pre><code class="language-xyz">` for code blocks!*

### 2. Link It on the Blog Page
1. Open up `blog.html` in the root folder of the project.
2. Locate the correct `<div class="blog-year-group">` for the current year (e.g., `data-year="2026"`).
3. Inside the `<ul class="blog-post-list">`, duplicate an existing `<li>` item or add a new one at the top:
   ```html
   <li class="blog-post-item">
     <span class="blog-post-date">May 01</span>
     <a href="blogs/setting-up-aws-eks.html" class="blog-post-link">My Awesome Post Title</a>
     <span class="blog-post-tag">AWS</span>
   </li>
   ```
4. Save the file. The search filter, animations, and post counters will automatically recognize your new post!
