# ShellScout (شيل سكوت)

ShellScout is a modern, responsive single-page web application inspired by `explainshell.com`, tailored for first-year computer science students learning Linux. 

## Features
- **Clean Center Layout:** Monospace terminal-style header with a glowing terminal prompt icon.
- **Integrated Search Bar:** Center input bar with a prompt sign `$`.
- **Automated Parsing Engine:** Tokenizes Linux commands, extracts and decomposes composite options/flags, and isolates target arguments.
- **Strict Bilingual Toggle (ENG / ARA):** Switch between English and Arabic formats instantly. English mode is 100% English, and Arabic mode is 100% Arabic.
- **Vertical Connection Layout (Option A):** Explanation blocks stack vertically. Dynamic, glowing SVG Bezier curves connect the underlined tokens directly to the vertical cards' side edges.
- **Smooth-Scrolling UX:** Submission automatically scrolls the viewport smoothly down to focus on results.
- **Local Dictionary Database:** Pre-populated with rich translations for common commands (`cd`, `ls`, `mkdir`, `rm`, `pwd`).

## Local Development & Testing
To run local tests for the parsing engine, execute the following command with Node.js:
```bash
node tests.js
```

To view the website locally, you can open `index.html` directly in any web browser.

## Deployment
ShellScout is a pure static frontend project. It is fully ready to be deployed on Vercel:
1. Connect this repository to your Vercel account.
2. Select **Framework Preset: Other** (or let it auto-detect HTML).
3. Click **Deploy**. Vercel will clean the URLs and host the website statically with no environment variable configuration needed.
