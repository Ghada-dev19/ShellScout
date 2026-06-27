# ShellScout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a modern, responsive terminal-themed Linux command explainer single-page application for students with strict English/Arabic translation toggle and dynamic SVG connecting lines.

**Architecture:** A client-side SPA where user inputs a Linux command. The parser tokenizes the input, decomposes composite flags, looks up descriptions in a local translations database, stacks explanation cards vertically, and draws dynamic SVG Bezier curves from each command token to its corresponding card. A simple Node.js script is used for automated testing of the parser engine.

**Tech Stack:** HTML5, Tailwind CSS (via official script CDN), Vanilla JS, Node.js (for testing), Vercel.

---

## File Structure

- `index.html`: The main user interface with Tailwind styling, the HTML layout, preset templates, and the SVG overlay canvas.
- `parser.js`: The parsing engine and complete bilingual command/translation database, packaged as a Universal Module.
- `app.js`: The main frontend controller that binds event listeners, updates the DOM with parsed explanations, manages the language toggle state, triggers smooth scrolling, and computes the coordinates to draw dynamic SVG curves.
- `tests.js`: A simple Node.js test script for automated validation of the parser engine (TDD).
- `.gitignore`: Standard git exclusion list.
- `README.md`: English documentation for Vercel deployment and local testing.

---

## Proposed Changes

### Task 1: Initialize Project & Setup Testing (TDD)

**Files:**
- Create: `parser.js`
- Create: `tests.js`
- Create: `.gitignore`

- [ ] **Step 1: Create `.gitignore` to exclude local server state and node modules.**
  Write content:
  ```
  .superpowers/
  node_modules/
  ```

- [ ] **Step 2: Write the automated test suite in `tests.js` with assertions for base commands, composite flags, target paths, and translations.**
  Code for `tests.js`:
  ```javascript
  const assert = require('assert');
  const { parseCommand, DATABASE, TRANSLATIONS } = require('./parser.js');

  console.log('Running ShellScout Parser Tests...');

  // Test 1: Base command parsing
  const res1 = parseCommand('cd /home/user', 'eng');
  assert.strictEqual(res1.tokens[0].text, 'cd');
  assert.strictEqual(res1.tokens[0].type, 'command');
  assert.strictEqual(res1.explanations[0].name, 'cd');
  assert.strictEqual(res1.explanations[0].desc, 'Change Directory: Used to navigate between system folders.');

  // Test 2: Target Path argument recognition
  assert.strictEqual(res1.tokens[1].text, '/home/user');
  assert.strictEqual(res1.tokens[1].type, 'argument');
  assert.strictEqual(res1.explanations[1].desc, 'Target Path: directory or file destination for this operation.');

  // Test 3: Composite flag decomposition
  const res2 = parseCommand('ls -la', 'eng');
  assert.strictEqual(res2.tokens[1].text, '-la');
  assert.strictEqual(res2.tokens[1].type, 'flag');
  // Should map to -la description directly if defined, or split
  assert.ok(res2.explanations[1].desc.includes('Combines long listing'));

  // Test 4: Dynamic Arabic translations
  const res3 = parseCommand('pwd', 'ara');
  assert.strictEqual(res3.explanations[0].desc, 'طباعة دليل العمل الحالي: يظهر المسار الكامل للمجلد الذي تقف فيه الآن.');

  console.log('All tests passed successfully!');
  ```

- [ ] **Step 3: Create `parser.js` stub (intentionally failing/empty) to verify the test fails.**
  Code for `parser.js`:
  ```javascript
  function parseCommand() { return {}; }
  module.exports = { parseCommand };
  ```

- [ ] **Step 4: Run the test suite and verify failure.**
  Run: `node tests.js`
  Expected: Failure (`TypeError: Cannot read properties of undefined (reading 'text')`)

- [ ] **Step 5: Write the full implementation of the parser engine and dictionary database in `parser.js`.**
  Code for `parser.js`:
  ```javascript
  const TRANSLATIONS = {
    eng: {
      cmdBadge: 'Command',
      flagBadge: 'Flag',
      argBadge: 'Argument',
      fallbackCmd: 'Custom or user-defined command. Please check the official man page.',
      fallbackFlag: 'Custom or command-specific option flag.',
      fallbackArg: 'Argument: value or option target passed to the command.',
      targetPath: 'Target Path: directory or file destination for this operation.',
      archiveFile: 'Archive File: filename of the archive to be created or extracted.',
      multiFlagHeader: 'Option breakdown:'
    },
    ara: {
      cmdBadge: 'أمر',
      flagBadge: 'خيار',
      argBadge: 'وسيط',
      fallbackCmd: 'أمر مخصص أو غير معروف - يرجى التحقق من الدليل الرسمي (man page).',
      fallbackFlag: 'خيار مخصص أو غير معروف للأمر المحدد.',
      fallbackArg: 'وسيط: قيمة أو ملف مستهدف ممرر للأمر.',
      targetPath: 'المسار المستهدف: المجلد أو الملف الهدف لهذه العملية.',
      archiveFile: 'ملف الأرشيف: اسم ملف الأرشيف المراد التعامل معه.',
      multiFlagHeader: 'تفصيل الخيارات:'
    }
  };

  const DATABASE = {
    'cd': {
      desc: {
        eng: 'Change Directory: Used to navigate between system folders.',
        ara: 'تغيير الدليل: يُسْتَخدم للانتقال بين مجلدات النظام.'
      },
      flags: {}
    },
    'ls': {
      desc: {
        eng: 'List: Lists directory contents (files and folders).',
        ara: 'عرض المحتويات: يسرد الملفات والمجلدات داخل الدليل الحالي.'
      },
      flags: {
        '-l': {
          eng: 'Long listing format: shows file permissions, ownership, size, and modification date.',
          ara: 'تنسيق القائمة الطويلة: يعرض صلاحيات الملفات، والمالك، والحجم، وتاريخ التعديل.'
        },
        '-a': {
          eng: 'Show all: includes hidden files (those starting with a dot ".").',
          ara: 'عرض الكل: يشمل الملفات المخفية (التي تبدأ أسماؤها بنقطة ".").'
        },
        '-la': {
          eng: 'Combines long listing (-l) and showing hidden files (-a).',
          ara: 'يجمع بين عرض القائمة الطويلة (-l) وإظهار الملفات المخفية (-a).'
        },
        '-h': {
          eng: 'Human-readable: prints sizes in easy-to-read formats (e.g., 1K, 234M, 2G).',
          ara: 'صيغة سهلة القراءة: يعرض الأحجام بوحدات مفهومة (مثل: كيلوبايت، ميجابايت، جيجابايت).'
        }
      }
    },
    'mkdir': {
      desc: {
        eng: 'Make Directory: Creates a new folder.',
        ara: 'إنشاء مجلد: يُنشئ دليلاً جديداً في المسار المحدد.'
      },
      flags: {
        '-p': {
          eng: 'Parents: makes parent directories as needed, no error if existing.',
          ara: 'المجلد الأبوي: ينشئ المجلدات الفرعية والأبوية تلقائياً دون إظهار خطأ إذا كانت موجودة.'
        }
      }
    },
    'rm': {
      desc: {
        eng: 'Remove: Used to delete files or directories.',
        ara: 'حذف: يُستخدم لحذف الملفات أو المجلدات.'
      },
      flags: {
        '-r': {
          eng: 'Recursive: remove directories and their contents recursively.',
          ara: 'حذف متكرر: حذف المجلدات ومحتوياتها بالكامل بشكل متكرر.'
        },
        '-f': {
          eng: 'Force: ignore nonexistent files and arguments, never prompt.',
          ara: 'فرض الحذف: يتجاهل الملفات غير الموجودة ولا يطلب تأكيداً أبداً.'
        },
        '-rf': {
          eng: 'Force recursive deletion: deletes directories and all contents immediately without prompting.',
          ara: 'حذف متكرر وقسري: يحذف المجلد وجميع محتوياته فوراً دون طلب تأكيد.'
        }
      }
    },
    'pwd': {
      desc: {
        eng: 'Print Working Directory: Shows the full path of the current folder.',
        ara: 'طباعة دليل العمل الحالي: يظهر المسار الكامل للمجلد الذي تقف فيه الآن.'
      },
      flags: {}
    }
  };

  function parseCommand(commandStr, lang = 'eng') {
    const cleanCmd = commandStr.trim().replace(/\s+/g, ' ');
    const parts = cleanCmd.split(' ');
    if (parts.length === 0 || parts[0] === '') return { tokens: [], explanations: [] };

    const baseCmd = parts[0];
    const tokens = [];
    const explanations = [];

    // 1. Base command token
    tokens.push({ text: baseCmd, type: 'command', colorClass: 'color-cmd' });

    const cmdEntry = DATABASE[baseCmd];
    const cmdDesc = cmdEntry ? cmdEntry.desc[lang] : TRANSLATIONS[lang].fallbackCmd;
    explanations.push({ name: baseCmd, type: 'command', desc: cmdDesc, colorClass: 'color-cmd' });

    // 2. Process arguments and options
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('-')) {
        // Flag token
        tokens.push({ text: part, type: 'flag', colorClass: 'color-flag' });

        let flagDesc = '';
        if (cmdEntry) {
          if (cmdEntry.flags[part]) {
            flagDesc = cmdEntry.flags[part][lang];
          } else {
            // Decompose composite flags (e.g. -la, -rf)
            const cleanFlag = part.startsWith('--') ? [part] : part.slice(1).split('').map(c => `-${c}`);
            let items = [];
            cleanFlag.forEach(f => {
              if (cmdEntry.flags[f]) {
                items.push(`<code>${f}</code>: ${cmdEntry.flags[f][lang]}`);
              } else {
                items.push(`<code>${f}</code>: ${lang === 'ara' ? 'خيار مخصص أو غير معروف.' : 'Custom or composite option flag.'}`);
              }
            });
            flagDesc = `${TRANSLATIONS[lang].multiFlagHeader}<ul class="${lang === 'ara' ? 'mr-5' : 'ml-5'} mt-1 list-disc"><li>${items.join('</li><li>')}</li></ul>`;
          }
        } else {
          flagDesc = TRANSLATIONS[lang].fallbackFlag;
        }

        explanations.push({ name: part, type: 'flag', desc: flagDesc, colorClass: 'color-flag' });
      } else {
        // Argument token
        tokens.push({ text: part, type: 'argument', colorClass: 'color-arg' });

        let argDesc = TRANSLATIONS[lang].fallbackArg;
        if (baseCmd === 'tar' && part.includes('.tar')) {
          argDesc = TRANSLATIONS[lang].archiveFile;
        } else if (part.startsWith('/') || part.includes('/') || part === 'project/src' || part === '/home/user' || part === '/tmp/scratch') {
          argDesc = TRANSLATIONS[lang].targetPath;
        }

        explanations.push({ name: part, type: 'argument', desc: argDesc, colorClass: 'color-arg' });
      }
    }

    return { tokens, explanations };
  }

  // Export module for Node.js tests or assign global for browser use
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { parseCommand, DATABASE, TRANSLATIONS };
  } else if (typeof window !== 'undefined') {
    window.ShellScoutParser = { parseCommand, DATABASE, TRANSLATIONS };
  }
  ```

- [ ] **Step 6: Run tests to verify they all pass.**
  Run: `node tests.js`
  Expected: "All tests passed successfully!"

- [ ] **Step 7: Commit initial parser and test setup.**
  Command:
  ```bash
  git add .gitignore parser.js tests.js
  git commit -m "feat: setup parser database and automated test suite"
  ```

---

### Task 2: Implement UI & CSS Style Layout

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write structure of `index.html` using Tailwind CSS.**
  Code specifications for `index.html`:
  - Enforce viewport meta, import `JetBrains Mono` and `Plus Jakarta Sans` Google fonts.
  - Structure elements: Language toggle, title header with Terminal Icon (SVG), search bar, preset button list, parsed output area, and explanation cards.
  - Setup absolute background glow elements.
  - Include script tag pointing to Tailwind Play CDN (`<script src="https://cdn.tailwindcss.com"></script>`) and scripts configuration:
    ```html
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              brandDark: '#0b0f19',
              brandCard: '#0d1527',
              brandBorder: '#1e293b',
              accentBlue: '#3b82f6',
              accentGreen: '#10b981',
              accentOrange: '#f59e0b'
            }
          }
        }
      }
    </script>
    ```

- [ ] **Step 2: Add inline SVG assets and layout elements.**
  - Add terminal screen SVG prompt for logo header:
    `<svg class="w-10 h-10 text-accentBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">...</svg>`
  - Create the SVG Canvas overlays for Bezier connecting lines:
    `<svg id="bezierCanvas" class="absolute top-0 left-0 w-100 h-100 pointer-events-none z-1"></svg>`
  - Style explanation cards with matching variables.

- [ ] **Step 3: Commit the initial UI layout.**
  Command:
  ```bash
  git add index.html
  git commit -m "feat: add main single-page html layout with tailwind styling"
  ```

---

### Task 3: Write UI Controller & SVG Line Drawing Engine

**Files:**
- Create: `app.js`
- Modify: `index.html` (include `app.js` & `parser.js`)

- [ ] **Step 1: Create `app.js` with DOM bindings, language toggling state, and render loops.**
  Code for `app.js`:
  ```javascript
  let currentLanguage = 'eng';

  const UI_LABELS = {
    eng: {
      subtitle: 'Your gateway to understanding Linux commands simply',
      placeholder: 'Enter Linux command (e.g. ls -la)',
      explainBtn: 'Explain',
      presetsLabel: 'Common commands:',
      parsedHeader: 'Parsed Structure',
      cmdBadge: 'Command',
      flagBadge: 'Flag',
      argBadge: 'Argument'
    },
    ara: {
      subtitle: 'بوابتك لفهم أوامر لينوكس ببساطة',
      placeholder: 'أدخل أمر لينوكس (مثال: ls -la)',
      explainBtn: 'اشرح الأمر',
      presetsLabel: 'أوامر شائعة:',
      parsedHeader: 'بنية الأمر المكتوب',
      cmdBadge: 'أمر',
      flagBadge: 'خيار',
      argBadge: 'وسيط'
    }
  };

  // Bind UI elements
  const elSubtitle = document.getElementById('scSubtitle');
  const elInput = document.getElementById('commandInput');
  const elExplainText = document.getElementById('txtBtnExplain');
  const elPresetsLabel = document.getElementById('txtPresetsLabel');
  const elParsedHeader = document.getElementById('txtParsedHeader');
  const elOutputArea = document.getElementById('outputArea');
  const elParsedContainer = document.getElementById('parsedCommandContainer');
  const elCardsContainer = document.getElementById('cardsContainer');
  const elBtnEng = document.getElementById('langBtnEng');
  const elBtnAra = document.getElementById('langBtnAra');

  function setLanguage(lang) {
    currentLanguage = lang;
    
    // Toggle active state
    elBtnEng.classList.toggle('bg-accentBlue', lang === 'eng');
    elBtnEng.classList.toggle('text-white', lang === 'eng');
    elBtnEng.classList.toggle('text-slate-400', lang !== 'eng');

    elBtnAra.classList.toggle('bg-accentBlue', lang === 'ara');
    elBtnAra.classList.toggle('text-white', lang === 'ara');
    elBtnAra.classList.toggle('text-slate-400', lang !== 'ara');

    // Update text
    elSubtitle.innerText = UI_LABELS[lang].subtitle;
    elInput.placeholder = UI_LABELS[lang].placeholder;
    elExplainText.innerText = UI_LABELS[lang].explainBtn;
    elPresetsLabel.innerText = UI_LABELS[lang].presetsLabel;
    elParsedHeader.innerText = UI_LABELS[lang].parsedHeader;

    // Set text alignment direction
    elSubtitle.style.direction = lang === 'ara' ? 'rtl' : 'ltr';
    elInput.style.direction = lang === 'ara' ? 'rtl' : 'ltr';
    
    // Refresh output display if active
    if (elOutputArea.style.display === 'block') {
      runExplanation(false);
    }
  }

  function applyPreset(cmd) {
    elInput.value = cmd;
    runExplanation(true);
  }

  function runExplanation(shouldScroll = false) {
    const inputVal = elInput.value;
    const { tokens, explanations } = window.ShellScoutParser.parseCommand(inputVal, currentLanguage);
    if (tokens.length === 0) return;

    elParsedContainer.innerHTML = '';
    elCardsContainer.innerHTML = '';

    const isRtl = currentLanguage === 'ara';

    // 1. Render underlined tokens
    tokens.forEach((tok, idx) => {
      const span = document.createElement('span');
      span.className = `px-1.5 py-0.5 rounded cursor-pointer transition-colors hover:bg-slate-800 ${
        tok.colorClass === 'color-cmd' ? 'text-accentGreen border-b-4 border-accentGreen' :
        tok.colorClass === 'color-flag' ? 'text-accentBlue border-b-4 border-accentBlue' :
        'text-accentOrange border-b-4 border-accentOrange'
      }`;
      span.id = `tok-node-${idx}`;
      span.innerText = tok.text;
      elParsedContainer.appendChild(span);
    });

    // 2. Render vertically stacked explanation cards
    explanations.forEach((expl, idx) => {
      const card = document.createElement('div');
      const badgeText = expl.type === 'command' ? UI_LABELS[currentLanguage].cmdBadge :
                        expl.type === 'flag' ? UI_LABELS[currentLanguage].flagBadge :
                        UI_LABELS[currentLanguage].argBadge;

      const borderClass = expl.colorClass === 'color-cmd' ? 'border-accentGreen shadow-[0_4px_20px_rgba(16,185,129,0.15)]' :
                          expl.colorClass === 'color-flag' ? 'border-accentBlue shadow-[0_4px_20px_rgba(59,130,246,0.15)]' :
                          'border-accentOrange shadow-[0_4px_20px_rgba(245,158,11,0.15)]';

      const textClass = expl.colorClass === 'color-cmd' ? 'text-accentGreen' :
                        expl.colorClass === 'color-flag' ? 'text-accentBlue' :
                        'text-accentOrange';

      const bgBadge = expl.colorClass === 'color-cmd' ? 'bg-accentGreen/15 text-accentGreen' :
                      expl.colorClass === 'color-flag' ? 'bg-accentBlue/15 text-accentBlue' :
                      'bg-accentOrange/15 text-accentOrange';

      card.className = `bg-[#0d1527] rounded-xl p-5 border-2 ${borderClass} flex flex-col relative w-full`;
      card.id = `card-node-${idx}`;

      card.innerHTML = `
        <div class="flex justify-between items-center mb-2 font-mono" style="direction: ${isRtl ? 'rtl' : 'ltr'};">
          <span class="font-bold text-lg ${textClass}">${expl.name}</span>
          <span class="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${bgBadge}">${badgeText}</span>
        </div>
        <div class="text-sm leading-relaxed text-slate-300" style="direction: ${isRtl ? 'rtl' : 'ltr'}; text-align: ${isRtl ? 'right' : 'left'};">
          ${expl.desc}
        </div>
      `;
      elCardsContainer.appendChild(card);
    });

    elOutputArea.style.display = 'block';

    // Draw curves after DOM reflow
    setTimeout(drawConnectingCurves, 100);

    if (shouldScroll) {
      setTimeout(() => {
        const anchor = document.getElementById('outputAnchor');
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }

  function drawConnectingCurves() {
    const container = document.getElementById('appContainer');
    const svg = document.getElementById('bezierCanvas');
    if (!container || !svg || elOutputArea.style.display !== 'block') return;

    svg.innerHTML = '';
    const containerRect = container.getBoundingClientRect();
    const isRtl = currentLanguage === 'ara';
    const tokens = document.querySelectorAll('#parsedCommandContainer > span');

    tokens.forEach((tok, idx) => {
      const card = document.getElementById(`card-node-${idx}`);
      if (!tok || !card) return;

      const tokRect = tok.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const startX = (tokRect.left + tokRect.right) / 2 - containerRect.left;
      const startY = tokRect.bottom - containerRect.top;

      // S-curve ends on left edge (LTR) or right edge (RTL) of explanation card
      const endX = isRtl 
        ? cardRect.right - containerRect.left 
        : cardRect.left - containerRect.left;
      const endY = (cardRect.top + cardRect.bottom) / 2 - containerRect.top;

      // Determine stroke color
      let strokeColor = '#94a3b8';
      if (tok.classList.contains('text-accentGreen')) strokeColor = '#10b981';
      else if (tok.classList.contains('text-accentBlue')) strokeColor = '#3b82f6';
      else if (tok.classList.contains('text-accentOrange')) strokeColor = '#f59e0b';

      const cpY1 = startY + (endY - startY) * 0.35;
      const cpX2 = startX + (endX - startX) * 0.5;

      const d = `M ${startX} ${startY} C ${startX} ${cpY1}, ${cpX2} ${endY}, ${endX} ${endY}`;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', strokeColor);
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0.7');
      path.style.transition = 'stroke-dasharray 0.3s ease';

      svg.appendChild(path);
    });
  }

  // Bind initial triggers
  window.addEventListener('resize', drawConnectingCurves);
  
  // Expose triggers globally for HTML bindings
  window.setLanguage = setLanguage;
  window.applyPreset = applyPreset;
  window.runExplanation = runExplanation;
  
  // Set defaults
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage('eng');
  });
  ```

- [ ] **Step 2: Include scripts inside `index.html`.**
  Ensure `<script src="parser.js"></script>` and `<script src="app.js"></script>` are loaded at the bottom of the body.

- [ ] **Step 3: Commit UI controller & script integration.**
  Command:
  ```bash
  git add app.js index.html
  git commit -m "feat: implement frontend controller app.js and draw dynamic S-curves"
  ```

---

### Task 4: Polish Documentation & Vercel Config

**Files:**
- Create: `README.md`
- Create: `vercel.json`

- [ ] **Step 1: Write `vercel.json` to configure deployment.**
  Code for `vercel.json`:
  ```json
  {
    "version": 2,
    "cleanUrls": true
  }
  ```

- [ ] **Step 2: Create `README.md` in English explaining how to run and deploy.**
  Write content:
  ```markdown
  # ShellScout (شيل سكوت)

  ShellScout is an interactive, responsive Linux command explainer tailored for first-year CS students.

  ## Features
  - **Dynamic Parsing Engine:** Decomposes base commands, composite options, and arguments.
  - **Dynamic Connecting Lines:** SVG Bezier curves connect tokens directly to their vertical explanation boxes.
  - **Bilingual Interface:** Strict language selector for Arabic and English.
  - **Automatic Smooth Scrolling:** Automatically focuses the viewport on explanations upon entry.

  ## Development & Testing
  Run local tests using Node.js:
  ```bash
  node tests.js
  ```

  ## Deployment
  ShellScout is a pure static app. Simply link this repository to Vercel and it will deploy instantly.
  ```

- [ ] **Step 3: Commit documentation & deployment configs.**
  Command:
  ```bash
  git add README.md vercel.json
  git commit -m "docs: finalize readme instructions and vercel routing"
  ```

---

## Verification Plan

### Automated Tests
- Test execution script: `node tests.js`
- Expected: Displays `All tests passed successfully!`

### Manual Verification
- Deploy to Vercel or open `index.html` locally.
- Confirm language toggle switches all text (English/Arabic).
- Confirm typing composite commands (e.g. `rm -rf /var/log`) correctly parses and maps S-curves.
- Verify smooth scrolling is triggered upon command submission.
