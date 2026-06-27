# ShellScout UI/UX Design Specification

**Project Name:** ShellScout (شيل سكوت)  
**Target Audience:** First-year Computer Science students learning Linux  
**Date:** June 27, 2026  

---

## 1. Overview & Goal

ShellScout is a modern, responsive single-page web application inspired by `explainshell.com` but tailored specifically for beginners. It parses standard Linux commands and decomposes them into commands, options/flags, and arguments, illustrating the relationship with visual connecting lines and providing detailed explanations.

The app supports a strict bilingual toggle (English / Arabic) to allow students to learn in their preferred language without mixing interfaces.

---

## 2. Tech Stack

- **Frontend Core:** Semantic HTML5 and Vanilla JavaScript (ES6+).
- **Styling:** CSS3, custom variables, and Tailwind CSS.
- **Icons:** Inline responsive SVGs for UI components (Terminal icon, arrows, language toggle).
- **Deployment:** Vercel-ready structure requiring no environment variables or build configurations.

---

## 3. UI/UX Specifications

### 3.1 Color Theme & Aesthetics
- **Background:** Deep dark terminal background (`#0b0f19` / slate-950).
- **Secondary Surfaces:** Dark slate panels (`#0d1527` / `#111827`) with thin borders (`#1e293b`).
- **Accent Highlight:** Glowing blue (`#3b82f6` / blue-500) and emerald green (`#10b981` / emerald-500).
- **Fonts:** Custom clean Sans-serif (`Plus Jakarta Sans`) for UI elements, paired with a distinct monospace font (`JetBrains Mono`) for commands and inputs.

### 3.2 Layout Structure
1. **Header (Centered):** Features a terminal prompt icon beside the bold English text **ShellScout**, with a toggleable subtitle underneath (Arabic/English).
2. **Language Toggle (Top Right):** A pill button containing `ARA` and `ENG`. Switching sets a strict language constraint across the entire page (no cross-language text).
3. **Search & Command Bar (Centered):**
   - A long pill input bar with a prefix `$` prompt.
   - Nested "Explain" button inside/next to the input.
4. **Preset / Common Commands (Centered):** Clean chips representing quick-start commands for students.
5. **Output Section (Dynamic):**
   - Appears below a dashed divider when the user submits a command.
   - **Command Line Breakdown:** The command rewritten and split into highlighted chips with colored underlines:
     - **Command:** Green underline (`#10b981`)
     - **Flags/Options:** Blue underline (`#3b82f6`)
     - **Arguments/Paths:** Yellow underline (`#f59e0b`)
   - **Vertical Stack Cards:** Descriptions stacked vertically, color-matched to their respective token.
   - **Dynamic Bezier Curves:** SVG curves linking token bottoms to the left edge (LTR) or right edge (RTL) of corresponding explanation cards.
   - **Smooth Scroll:** Automatically scroll view port to results when "Explain" is clicked.

---

## 4. The Engine (Parsing & Dictionary)

### 4.1 Parser Algorithm
1. Split the raw input string by whitespace, ignoring duplicate spaces.
2. The first word is marked as the **Command**.
3. For subsequent tokens:
   - If token starts with `-` (e.g., `-la`, `--help`), mark as **Flag**.
   - Otherwise, mark as **Argument**.
4. Match Command and Flags against the local JS Dictionary:
   - Check if command is in the dictionary. If not, trigger a custom command fallback.
   - Check if flag exists directly in the command's flag list.
   - If flag is composite (e.g., `-rf`, `-la`) and doesn't match directly, decompose it into individual characters (e.g., `-r`, `-f`) and query descriptions for each, merging them.
5. Identify special arguments:
   - Path strings containing `/` or common words like `project/src` are identified as **Target Path / المسار المستهدف**.
   - Tar-related strings containing `.tar` are identified as **Archive File / ملف الأرشيف**.
   - Fallback arguments get the general argument description.

### 4.2 Database Commands
The engine holds translation maps for both `eng` and `ara` languages for the following commands:
- `cd` (Change Directory)
- `ls` (List contents; flags: `-l`, `-a`, `-la`, `-h`)
- `mkdir` (Make directory; flags: `-p`)
- `rm` (Remove; flags: `-r`, `-f`, `-rf`)
- `pwd` (Print Working Directory)

---

## 5. Verification Plan

### Manual Verification Steps
1. Verify that clicking presets or typing commands and hitting "Explain" runs the parser.
2. Verify S-curve drawing alignment when browser window is resized.
3. Verify strict language isolation (switching languages shows 100% Arabic or 100% English).
4. Verify smooth scrolling behavior upon clicking "Explain".
