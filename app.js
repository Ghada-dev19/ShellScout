let currentLanguage = 'eng';

function formatExplanationText(html) {
  const parts = html.split(/(<[^>]+>)/g);
  const formattedParts = parts.map(part => {
    if (part.startsWith('<')) {
      return part;
    }
    
    let workingText = part;
    let prefixSymbol = '';
    if (workingText.startsWith(':')) {
      prefixSymbol = ':';
      workingText = workingText.slice(1);
    } else if (workingText.startsWith(' :')) {
      prefixSymbol = ' :';
      workingText = workingText.slice(2);
    }
    
    const colonIndex = workingText.indexOf(':');
    if (colonIndex === -1) return part;
    
    const title = workingText.slice(0, colonIndex + 1);
    const details = workingText.slice(colonIndex + 1);
    if (title.trim() === '' || title.trim() === ':') return part;
    
    return `${prefixSymbol}<strong class="font-bold">${title}</strong>${details}`;
  });
  return formattedParts.join('');
}

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
  },
  fra: {
    subtitle: 'Votre guide pour comprendre simplement les commandes Linux',
    placeholder: 'Saisissez une commande Linux (ex: ls -la)',
    explainBtn: 'Expliquer',
    presetsLabel: 'Commandes courantes :',
    parsedHeader: 'Structure Analysée',
    cmdBadge: 'Commande',
    flagBadge: 'Option',
    argBadge: 'Argument'
  }
};

// Bind DOM elements
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
const elBtnFra = document.getElementById('langBtnFra');

function setLanguage(lang) {
  currentLanguage = lang;
  
  // Toggle button styling classes
  elBtnEng.classList.toggle('bg-accentBlue', lang === 'eng');
  elBtnEng.classList.toggle('text-white', lang === 'eng');
  elBtnEng.classList.toggle('text-slate-400', lang !== 'eng');

  elBtnAra.classList.toggle('bg-accentBlue', lang === 'ara');
  elBtnAra.classList.toggle('text-white', lang === 'ara');
  elBtnAra.classList.toggle('text-slate-400', lang !== 'ara');

  elBtnFra.classList.toggle('bg-accentBlue', lang === 'fra');
  elBtnFra.classList.toggle('text-white', lang === 'fra');
  elBtnFra.classList.toggle('text-slate-400', lang !== 'fra');

  // Update text elements
  elSubtitle.innerText = UI_LABELS[lang].subtitle;
  elInput.placeholder = UI_LABELS[lang].placeholder;
  elExplainText.innerText = UI_LABELS[lang].explainBtn;
  elPresetsLabel.innerText = UI_LABELS[lang].presetsLabel;
  elParsedHeader.innerText = UI_LABELS[lang].parsedHeader;

  // Set RTL/LTR properties
  elSubtitle.style.direction = lang === 'ara' ? 'rtl' : 'ltr';
  elInput.style.direction = lang === 'ara' ? 'rtl' : 'ltr';
  
  // Re-run parsing if output area is open to dynamically swap explanation content
  if (elOutputArea && elOutputArea.style.display === 'block') {
    runExplanation(false);
  }
}

function applyPreset(cmd) {
  elInput.value = cmd;
  runExplanation(true);
}

function runExplanation(shouldScroll = false) {
  const inputVal = elInput.value;
  if (!window.ShellScoutParser) return;

  const { tokens, explanations } = window.ShellScoutParser.parseCommand(inputVal, currentLanguage);
  if (tokens.length === 0) return;

  // Clear previous rendering
  elParsedContainer.innerHTML = '';
  elCardsContainer.innerHTML = '';

  const isRtl = currentLanguage === 'ara';

  // 1. Render highlighted & underlined command tokens
  tokens.forEach((tok, idx) => {
    const span = document.createElement('span');
    span.id = `tok-node-${idx}`;
    span.innerText = tok.text;
    
    // Set appropriate styling classes based on token type
    let colorClasses = '';
    if (tok.colorClass === 'color-cmd') {
      colorClasses = 'text-accentGreen border-accentGreen';
    } else if (tok.colorClass === 'color-flag') {
      colorClasses = 'text-accentBlue border-accentBlue';
    } else {
      colorClasses = 'text-accentOrange border-accentOrange';
    }
    
    span.className = `px-1.5 py-0.5 rounded cursor-pointer transition-colors duration-150 hover:bg-slate-800 border-b-[3px] ${colorClasses}`;
    elParsedContainer.appendChild(span);
  });

  // 2. Render vertically stacked explanation cards
  explanations.forEach((expl, idx) => {
    const card = document.createElement('div');
    card.id = `card-node-${idx}`;

    const pTranslations = window.ShellScoutParser.TRANSLATIONS[currentLanguage];
    const badgeText = expl.type === 'command' ? pTranslations.cmdBadge :
                      expl.type === 'flag' ? pTranslations.flagBadge :
                      expl.type === 'source' ? pTranslations.sourceBadge :
                      expl.type === 'destination' ? pTranslations.destBadge :
                      pTranslations.argBadge;

    let borderShadowClass = '';
    let textAccentClass = '';
    let badgeClass = '';

    if (expl.colorClass === 'color-cmd') {
      borderShadowClass = 'border-accentGreen shadow-[0_4px_20px_rgba(16,185,129,0.1)]';
      textAccentClass = 'text-accentGreen';
      badgeClass = 'bg-accentGreen/15 text-accentGreen';
    } else if (expl.colorClass === 'color-flag') {
      borderShadowClass = 'border-accentBlue shadow-[0_4px_20px_rgba(59,130,246,0.1)]';
      textAccentClass = 'text-accentBlue';
      badgeClass = 'bg-accentBlue/15 text-accentBlue';
    } else {
      borderShadowClass = 'border-accentOrange shadow-[0_4px_20px_rgba(245,158,11,0.1)]';
      textAccentClass = 'text-accentOrange';
      badgeClass = 'bg-accentOrange/15 text-accentOrange';
    }

    card.className = `bg-brandCard rounded-xl p-5 border-2 ${borderShadowClass} flex flex-col relative w-full`;
    
    card.innerHTML = `
      <div class="flex justify-between items-center mb-3 font-mono" style="direction: ${isRtl ? 'rtl' : 'ltr'};">
        <span class="font-bold text-lg ${textAccentClass}">${badgeText} ${expl.name}</span>
      </div>
      <div class="text-sm leading-relaxed text-slate-300" style="direction: ${isRtl ? 'rtl' : 'ltr'}; text-align: ${isRtl ? 'right' : 'left'};">
        ${formatExplanationText(expl.desc)}
      </div>
    `;
    elCardsContainer.appendChild(card);
  });

  // Reveal results section
  elOutputArea.style.display = 'block';

  // Draw connecting Bezier lines
  setTimeout(drawConnectingCurves, 100);

  // Smooth-scroll down to results area if triggered
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

    // Start coordinate is center bottom of token underline
    const startX = (tokRect.left + tokRect.right) / 2 - containerRect.left;
    const startY = tokRect.bottom - containerRect.top;

    // End coordinate is left edge (LTR) or right edge (RTL) of explanation card
    const endX = isRtl 
      ? cardRect.right - containerRect.left 
      : cardRect.left - containerRect.left;
    const endY = (cardRect.top + cardRect.bottom) / 2 - containerRect.top;

    // Determine stroke color matching the element type
    let strokeColor = '#94a3b8';
    if (tok.classList.contains('text-accentGreen')) strokeColor = '#10b981';
    else if (tok.classList.contains('text-accentBlue')) strokeColor = '#3b82f6';
    else if (tok.classList.contains('text-accentOrange')) strokeColor = '#f59e0b';

    // Cubic Bezier curve control points
    const cpY1 = startY + (endY - startY) * 0.35;
    const cpX2 = startX + (endX - startX) * 0.5;

    const d = `M ${startX} ${startY} C ${startX} ${cpY1}, ${cpX2} ${endY}, ${endX} ${endY}`;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', strokeColor);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('opacity', '0.7');
    
    svg.appendChild(path);
  });
}

// Bind handlers
window.addEventListener('resize', drawConnectingCurves);

// Expose functions to HTML bindings
window.setLanguage = setLanguage;
window.applyPreset = applyPreset;
window.runExplanation = runExplanation;

// Set initial interface state on document load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage('eng');
});
