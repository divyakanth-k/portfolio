# Divyakanth Koppolu — Terminal Portfolio

A responsive, terminal-themed personal portfolio and blog designed for a DevOps & Security Engineer. It leverages pure HTML, CSS, and vanilla JS to maintain speed, security, and a strict developer-first aesthetic.

## 🚀 Features

- **Terminal Aesthetic**: Monospace typography, glowing cyan/emerald command prompts, and a boot sequence animation mimicking a linux startup.
- **Dark Mode First**: Glassmorphism cards with a toggleable Light/Dark theme.
- **Command Palette (`⌘K`)**: A quick jump menu to navigate the site, open socials, copy email, or toggle themes.
- **Built-in Blog System**: A dedicated notes/logs system with live search and chronological sorting.
- **Zero Heavy Frameworks**: Vanilla JS, no React, no Tailwind dependencies to manage or update. Simple static files.

---

## 📂 File Structure

```text
portfolio/
├── index.html            # Main single-page portfolio
├── blog.html             # Blog listing and search page
├── blogs/                # Folder for individual blog post pages
│   └── blog-template.html # Template file to copy for new posts
├── css/
│   ├── base.css          # Typography & layout
│   ├── blog.css          # Blog-specific styles
│   ├── components.css    # Buttons, cards, tags
│   ├── features.css      # Cmd+K palette, back-to-top, progress bar
│   ├── reset.css         # CSS Reset
│   └── variables.css     # Design tokens and themes
├── js/
│   ├── blog.js           # Search, tag filtering, post counts
│   ├── features.js       # Cmd+K, theme toggle, copy email
│   ├── form.js           # Contact form handling
│   └── main.js           # Typing effects, animations, particles
└── img/                  # Logos and assets
     └── profile.jpg
```

---

## 📝 How to Add New Blog Posts

Adding a new post is very simple since the site consists of static files. Follow these two main steps:

### 1. Create the New Post Page
1. Go into the `blogs/` folder.
2. Duplicate the `blog-template.html` file and rename it to your desired slug (e.g., `setting-up-aws-eks.html`).
3. Open your newly created file and update:
   - `<title>` and `<meta name="description">` inside the `<head>` for SEO.
   - The `<h1 class="post-title">` to your article name.
   - The `.post-meta` section with the correct date, tag, and read time.
4. Replace the sample content inside the `<article>` tag with your own HTML content. *Hint: Use `<pre><code class="language-xyz">` for code blocks!*

### 2. Link It on the Blog Page
1. Open up `blog.html` in the root folder.
2. Locate the correct `<div class="blog-year-group">` for the current year (e.g., `data-year="2026"`).
3. Inside the `<ul class="blog-post-list">`, duplicate an existing `<li>` item or add a new one at the top:
   ```html
   <li class="blog-post-item">
     <span class="blog-post-date">May 01</span>
     <a href="blogs/setting-up-aws-eks.html" class="blog-post-link">My Awesome Post Title</a>
     <span class="blog-post-tag">AWS</span>
   </li>
   ```
4. Save the file. The search bar functionality and post counters will automatically pick it up!

---

## ✅ Code Quality & Pre-Commit Hooks

This project uses `pre-commit` to automatically format code (via Prettier, maintaining your clean HTML/CSS/JS) and check for leaked secrets before every commit. A GitHub Actions workflow also enforces these checks on all Pull Requests to the `main` branch.

**To set up pre-commit locally:**
1. Install pre-commit (requires Python):
   ```bash
   pip install pre-commit
   ```
2. Install the git hooks:
   ```bash
   pre-commit install
   ```
3. (Optional) Run checks manually across the whole repository:
   ```bash
   pre-commit run --all-files
   ```

---

## 🛠️ How to Run Locally

You can preview the site easily in any browser:
1. Open your terminal in the `portfolio` folder.
2. Start a simple python web server:
   ```bash
   python3 -m http.server 8080
   ```
3. Navigate to [http://localhost:8080](http://localhost:8080) in your browser.

## 🎨 Modifying Themes

Colors are configured globally via CSS Variables in `/css/variables.css`. To change the primary accent colors (currently Cyan, Emerald, and Amber), look for the `:root` and `[data-theme="dark"]` sections and update the hex/rgb values.
