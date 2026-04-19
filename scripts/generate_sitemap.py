import os
import glob
from datetime import datetime

BASE_URL = "https://divyakanth-k.github.io/portfolio"
SITEMAP_FILE = "sitemap.xml"

def generate_sitemap():
    # Use today's date for lastmod representing the commit context
    today = datetime.today().strftime('%Y-%m-%d')
    output = []
    output.append('<?xml version="1.0" encoding="UTF-8"?>')
    output.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    # Core static paths
    static_routes = [
        {"path": "/index.html", "priority": "1.0", "changefreq": "monthly"},
        {"path": "/blog.html", "priority": "0.8", "changefreq": "weekly"},
    ]

    for route in static_routes:
        output.append('  <url>')
        output.append(f'    <loc>{BASE_URL}{route["path"]}</loc>')
        output.append(f'    <lastmod>{today}</lastmod>')
        output.append(f'    <changefreq>{route["changefreq"]}</changefreq>')
        output.append(f'    <priority>{route["priority"]}</priority>')
        output.append('  </url>')

    # Dynamically scan blogs directory
    blog_files = glob.glob('blogs/*.html')
    # Optional sorting to keep sitemap.xml deterministic and avoid git diff noise
    blog_files.sort()

    for filepath in blog_files:
        # Ignore template if desired, but we'll leave it out of index by skipping it
        if 'blog-template.html' in filepath:
            continue

        url_path = filepath.replace('\\', '/') # Normalize backslashes for Windows
        output.append('  <url>')
        output.append(f'    <loc>{BASE_URL}/{url_path}</loc>')
        output.append(f'    <lastmod>{today}</lastmod>')
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
