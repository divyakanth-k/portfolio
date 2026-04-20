# scripts/generate_sitemap.py
import os
import glob
import subprocess
from datetime import datetime

BASE_URL = "https://divyakanth-k.github.io/portfolio"
SITEMAP_FILE = "sitemap.xml"

def get_git_lastmod(filepath):
    """Get the last git commit date for a specific file."""
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%cI", "--", filepath],
            capture_output=True,
            text=True
        )
        date_str = result.stdout.strip()
        if date_str:
            # Parse ISO 8601 and return YYYY-MM-DD
            return datetime.fromisoformat(date_str).strftime("%Y-%m-%d")
    except Exception:
        pass
    # Fallback to today only if file has never been committed
    return datetime.today().strftime("%Y-%m-%d")

def generate_sitemap():
    output = []
    output.append('<?xml version="1.0" encoding="UTF-8"?>')
    output.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    static_routes = [
        {"path": "/index.html", "priority": "1.0", "changefreq": "monthly", "file": "index.html"},
        {"path": "/blog.html",  "priority": "0.8", "changefreq": "weekly",  "file": "blog.html"},
    ]

    for route in static_routes:
        lastmod = get_git_lastmod(route["file"])
        output.append('  <url>')
        output.append(f'    <loc>{BASE_URL}{route["path"]}</loc>')
        output.append(f'    <lastmod>{lastmod}</lastmod>')
        output.append(f'    <changefreq>{route["changefreq"]}</changefreq>')
        output.append(f'    <priority>{route["priority"]}</priority>')
        output.append('  </url>')

    blog_files = sorted(glob.glob('blogs/*.html'))

    for filepath in blog_files:
        if 'blog-template.html' in filepath:
            continue

        url_path = filepath.replace('\\', '/')
        lastmod = get_git_lastmod(filepath)
        output.append('  <url>')
        output.append(f'    <loc>{BASE_URL}/{url_path}</loc>')
        output.append(f'    <lastmod>{lastmod}</lastmod>')
        output.append('    <changefreq>monthly</changefreq>')
        output.append('    <priority>0.6</priority>')
        output.append('  </url>')

    output.append('</urlset>')

    with open(SITEMAP_FILE, 'w') as f:
        f.write('\n'.join(output))
        f.write('\n')

if __name__ == "__main__":
    generate_sitemap()
    print(f"Successfully generated {SITEMAP_FILE} with discovered routes.")
