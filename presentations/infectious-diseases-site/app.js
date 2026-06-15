// Infectious Diseases Study Dashboard - Application Logic

// State management
let currentCategory = 'all';
let currentMode = 'table';
let isTransposed = false;
let isClozeStudy = false;
let isCompact = true;
let searchQuery = '';
let currentLang = 'en'; // 'en' or 'zh'

// Flashcards state
let flashcardDeck = [];
let currentCardIndex = 0;
let hiddenFields = []; // Fields to show on the back (i.e. hidden on the front)
let cardStats = {
  known: new Set(),
  review: new Set()
};

// Display maps for abbreviations/translations to fit nicely in columns
const PATHOGEN_MAP = {
  en: {
    'bacteria': 'BACT',
    'virus': 'VIR',
    'syndrome': 'SYND'
  },
  zh: {
    'bacteria': '细菌',
    'virus': '病毒',
    'syndrome': '综合征'
  }
};

const TRANSMISSION_MAP = {
  en: {
    'respiratory': 'RESP',
    'gastrointestinal': 'GI',
    'zoonotic': 'ZOON',
    'blood-borne': 'BLOOD',
    'syndromic': 'SYND'
  },
  zh: {
    'respiratory': '呼吸道',
    'gastrointestinal': '消化道',
    'zoonotic': '媒介',
    'blood-borne': '血/性',
    'syndromic': '系统'
  }
};

// Category filter logic
function filterData(category) {
  if (!window.DISEASE_DATA) return [];
  
  switch (category) {
    case 'bacterial':
      return window.DISEASE_DATA.filter(d => d.pathogen === 'bacteria' || d.pathogen === 'syndrome');
    case 'viral':
      return window.DISEASE_DATA.filter(d => d.pathogen === 'virus');
    case 'respiratory':
      return window.DISEASE_DATA.filter(d => d.transmission.includes('respiratory'));
    case 'gastrointestinal':
      return window.DISEASE_DATA.filter(d => d.transmission.includes('gastrointestinal'));
    case 'zoonotic':
      return window.DISEASE_DATA.filter(d => d.transmission.includes('zoonotic'));
    case 'all':
    default:
      return window.DISEASE_DATA;
  }
}

// Field definitions with display names
const ATTRIBUTE_FIELDS = [
  { key: 'definition', label: 'Definition', label_zh: '定义' },
  { key: 'pathogen', label: 'Pathogen', label_zh: '病原体' },
  { key: 'transmission', label: 'Transmission', label_zh: '传播途径' },
  { key: 'pathogenesis', label: 'Pathogenesis', label_zh: '发病机制' },
  { key: 'clinical', label: 'Clinical manifestations', label_zh: '临床表现' },
  { key: 'diagnosis', label: 'Diagnosis', label_zh: '诊断' },
  { key: 'treatment', label: 'Treatment', label_zh: '治疗' },
  { key: 'prevention', label: 'Prevention', label_zh: '预防' },
  { key: 'remarks', label: 'Remarks / source notes', label_zh: '备注 / 来源' }
];

// Deck options mapping for flashcards
const DECK_OPTIONS = [
  { id: 'all', name: 'All Diseases Combined (20)', name_zh: '所有疾病组合 (20)' },
  { id: 'bacterial', name: 'Bacterial Infections', name_zh: '细菌性感染' },
  { id: 'viral', name: 'Viral Infections', name_zh: '病毒性感染' },
  { id: 'respiratory', name: 'Respiratory / Airborne', name_zh: '呼吸道 / 空气传播' },
  { id: 'gastrointestinal', name: 'Gastrointestinal', name_zh: '消化道' },
  { id: 'zoonotic', name: 'Zoonotic / Vector', name_zh: '动物源性 / 媒介传播' }
];

const UI_TRANSLATIONS = {
  en: {
    title: 'Infectious Diseases',
    subtitle: 'Complete Review & Memorization Study Board',
    modeTable: 'Table View',
    modeFlashcards: 'Flashcard Arena',
    catAll: 'All Diseases (20)',
    catBacterial: 'Bacterial Infections',
    catViral: 'Viral Infections',
    catRespiratory: 'Respiratory / Airborne',
    catGastrointestinal: 'Gastrointestinal',
    catZoonotic: 'Zoonotic / Vector',
    searchPlaceholder: 'Search diseases, symptoms, treatments...',
    btnTranspose: 'Transpose Table',
    btnCompactWide: 'Wide View',
    btnCompactCompact: 'Compact View',
    btnCloze: 'Cloze (Blur Cells)',
    clozeHide: 'Hide All',
    clozeReveal: 'Reveal All',
    labelDeckSelect: 'Study Deck',
    labelTestFocus: 'Test Focus (Hide on Front, Reveal on Back)',
    cardFrontCategory: 'PATHOGEN TYPE',
    cardFrontInstructions: 'Click card to reveal details (Space)',
    cardBackInstructions: 'Click card to hide details (Space)',
    btnNeedsReview: 'Needs Review (R)',
    btnIKnowThis: 'I Know This (K)',
    statKnown: 'Known: ',
    statReview: 'Review: ',
    statRemaining: 'Remaining: ',
    statTotal: 'Total: ',
    footerText: '© Infectious Diseases Study Companion. All content matches word-for-word from "Infectious_Diseases_Summary_Table_English.md".',
    deckCompleted: 'Deck Completed!',
    deckCompletedText: 'You went through all {total} cards in this deck.',
    deckScore: 'Score: {score}% ({known}/{total} known)',
    btnRestartStudy: 'Restart Study',
    langToggle: '中文',
    tableHeaders: ['Disease', 'Definition', 'Path.', 'Trans.', 'Pathogenesis', 'Clinical manifestations', 'Diagnosis', 'Treatment', 'Prevention', 'Remarks / source notes'],
    noRecords: 'No records found.',
    noCards: 'No cards in this deck'
  },
  zh: {
    title: '传染病',
    subtitle: '完整复习与背诵学习看板',
    modeTable: '表格视图',
    modeFlashcards: '卡片竞技场',
    catAll: '所有疾病 (20)',
    catBacterial: '细菌性感染',
    catViral: '病毒性感染',
    catRespiratory: '呼吸道 / 空气传播',
    catGastrointestinal: '消化道',
    catZoonotic: '动物源性 / 媒介传播',
    searchPlaceholder: '搜索疾病、症状、治疗方案...',
    btnTranspose: '转置表格',
    btnCompactWide: '宽屏视图',
    btnCompactCompact: '紧凑视图',
    btnCloze: '填空式复习 (模糊单元格)',
    clozeHide: '全部隐藏',
    clozeReveal: '全部显示',
    labelDeckSelect: '学习卡组',
    labelTestFocus: '测试焦点 (正面隐藏，反面显示)',
    cardFrontCategory: '病原体类型',
    cardFrontInstructions: '点击卡片显示详情 (空格键)',
    cardBackInstructions: '点击卡片隐藏详情 (空格键)',
    btnNeedsReview: '需要复习 (R)',
    btnIKnowThis: '我已经掌握 (K)',
    statKnown: '已掌握: ',
    statReview: '需复习: ',
    statRemaining: '剩余: ',
    statTotal: '总计: ',
    footerText: '© 传染病学习助手。所有内容与 "Infectious_Diseases_Summary_Table_English.md" 英文原表完全一致。',
    deckCompleted: '卡组已完成！',
    deckCompletedText: '你已学习了该卡组的所有 {total} 张卡片。',
    deckScore: '得分: {score}% ({known}/{total} 已掌握)',
    btnRestartStudy: '重新学习',
    langToggle: 'English',
    tableHeaders: ['疾病', '定义', '病原', '传播', '发病机制', '临床表现', '诊断', '治疗', '预防', '备注 / 来源'],
    noRecords: '未找到相关记录。',
    noCards: '该卡组中没有卡片'
  }
};

function updateUILanguage() {
  const trans = UI_TRANSLATIONS[currentLang];
  
  // Document HTML title
  document.title = currentLang === 'zh' ? '传染病背诵助手 - 学习看板' : 'Infectious Diseases Review Dashboard - Study Companion';
  
  // Header Title & Subtitle
  document.querySelector('.brand-section h1').innerHTML = `
    <i data-lucide="shield-alert" style="color: var(--accent-rose);"></i>
    ${trans.title}
  `;
  document.querySelector('.brand-section p').textContent = trans.subtitle;
  
  // Mode Buttons
  document.getElementById('label-mode-table').textContent = trans.modeTable;
  document.getElementById('label-mode-flashcards').textContent = trans.modeFlashcards;
  
  // Category tabs text
  document.getElementById('btn-cat-all').textContent = `${currentLang === 'zh' ? '所有疾病' : 'All Diseases'} (20)`;
  document.getElementById('btn-cat-bacterial').textContent = trans.catBacterial;
  document.getElementById('btn-cat-viral').textContent = trans.catViral;
  document.getElementById('btn-cat-respiratory').textContent = trans.catRespiratory;
  document.getElementById('btn-cat-gastrointestinal').textContent = trans.catGastrointestinal;
  document.getElementById('btn-cat-zoonotic').textContent = trans.catZoonotic;
  
  // Search input
  document.getElementById('table-search').placeholder = trans.searchPlaceholder;
  
  // Action Buttons in Table View
  updateButtonTextPreservingIcon('btn-transpose', 'repeat', trans.btnTranspose);
  const btnTranspose = document.getElementById('btn-transpose');
  if (btnTranspose) {
    btnTranspose.title = currentLang === 'zh' ? '交换行和列标题 (转置)' : 'Swap row and column headers';
  }
  
  const compactText = isCompact ? trans.btnCompactWide : trans.btnCompactCompact;
  const compactIcon = isCompact ? 'maximize-2' : 'minimize-2';
  updateButtonTextPreservingIcon('btn-compact', compactIcon, compactText);
  const btnCompact = document.getElementById('btn-compact');
  if (btnCompact) {
    btnCompact.title = currentLang === 'zh' ? '切换紧凑/宽屏布局' : 'Toggle compact or wide table layout';
  }
  
  updateButtonTextPreservingIcon('btn-study-cloze', 'eye-off', trans.btnCloze);
  const btnCloze = document.getElementById('btn-study-cloze');
  if (btnCloze) {
    btnCloze.title = currentLang === 'zh' ? '开启/关闭交互式填空测试' : 'Toggle interactive cloze test mode';
  }
  
  // Cloze Helpers
  const clozeHideBtn = document.querySelector('#cloze-controls button:first-child');
  if (clozeHideBtn) {
    clozeHideBtn.innerHTML = `<i data-lucide="lock"></i> ${trans.clozeHide}`;
    clozeHideBtn.title = currentLang === 'zh' ? '隐藏所有单元格内容' : 'Blur all cells';
  }
  const clozeRevealBtn = document.querySelector('#cloze-controls button:nth-child(2)');
  if (clozeRevealBtn) {
    clozeRevealBtn.innerHTML = `<i data-lucide="unlock"></i> ${trans.clozeReveal}`;
    clozeRevealBtn.title = currentLang === 'zh' ? '显示所有单元格内容' : 'Reveal all cells';
  }
  
  // Flashcard Settings labels
  const deckSelectLabel = document.querySelector('label[for="deck-select"]');
  if (deckSelectLabel) deckSelectLabel.textContent = trans.labelDeckSelect;
  
  const focusLabel = document.querySelector('.settings-group:nth-child(2) label');
  if (focusLabel) focusLabel.textContent = trans.labelTestFocus;
  
  // Language Toggle Label
  document.getElementById('lang-toggle-label').textContent = trans.langToggle;
  
  // Footer text
  document.querySelector('footer p').textContent = trans.footerText;
  
  // Recreate lucide icons
  lucide.createIcons();
}

function updateButtonTextPreservingIcon(btnId, iconName, text) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.innerHTML = `<i data-lucide="${iconName}"></i> ${text}`;
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  
  updateUILanguage();
  initDeckDropdown();
  
  if (currentMode === 'table') {
    renderCategory();
  } else {
    initFlashcards();
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  if (!window.DISEASE_DATA) {
    console.error('Disease data not found!');
    document.getElementById('table-view-container').innerHTML = 
      '<div style="color: var(--accent-red); text-align: center; padding: 3rem;">Error: data.js failed to load.</div>';
    return;
  }
  
  // Apply initial language UI translations
  updateUILanguage();
  
  // Render current category table
  renderCategory();
  
  // Initialize deck options in flashcard dropdown
  initDeckDropdown();
  
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Setup Keyboard listeners for flashcards
  setupKeyboardListeners();
});

// Switch view modes (Table vs Flashcard)
function setMode(mode) {
  currentMode = mode;
  
  document.getElementById('mode-table').classList.toggle('active', mode === 'table');
  document.getElementById('mode-flashcards').classList.toggle('active', mode === 'flashcards');
  
  document.getElementById('table-mode-section').classList.toggle('active', mode === 'table');
  document.getElementById('flashcards-mode-section').classList.toggle('active', mode === 'flashcards');
  
  if (mode === 'flashcards') {
    initFlashcards();
  }
}

// Switch categories
function setCategory(category) {
  currentCategory = category;
  
  // Update navigation buttons active state
  const buttons = document.querySelectorAll('#category-tabs .cat-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.getElementById(`btn-cat-${category}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  renderCategory();
}

// Render Table based on active category
function renderCategory() {
  const container = document.getElementById('table-view-container');
  container.innerHTML = '';
  
  const filteredList = filterData(currentCategory);
  if (filteredList.length === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No records found.</div>';
    return;
  }
  
  const wrapper = document.createElement('div');
  wrapper.className = 'table-wrapper';
  
  const table = document.createElement('table');
  if (isCompact) {
    table.classList.add('compact-table');
  }
  
  if (isTransposed) {
    table.classList.add('transposed-table');
    renderTransposedTable(table, filteredList);
  } else {
    renderNormalTable(table, filteredList);
  }
  
  wrapper.appendChild(table);
  container.appendChild(wrapper);
  
  // Refresh Lucide icons in table view
  lucide.createIcons();
}

// Helper to check if a row matches search query (bilingual support)
function rowMatchesSearch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  
  return (
    item.disease.toLowerCase().includes(q) ||
    (item.disease_zh && item.disease_zh.toLowerCase().includes(q)) ||
    item.definition.toLowerCase().includes(q) ||
    (item.definition_zh && item.definition_zh.toLowerCase().includes(q)) ||
    item.pathogen.toLowerCase().includes(q) ||
    (item.pathogen_zh && item.pathogen_zh.toLowerCase().includes(q)) ||
    item.transmission.some(t => t.toLowerCase().includes(q)) ||
    (item.transmission_zh && item.transmission_zh.some(t => t.toLowerCase().includes(q))) ||
    item.pathogenesis.toLowerCase().includes(q) ||
    (item.pathogenesis_zh && item.pathogenesis_zh.toLowerCase().includes(q)) ||
    item.clinical.toLowerCase().includes(q) ||
    (item.clinical_zh && item.clinical_zh.toLowerCase().includes(q)) ||
    item.diagnosis.toLowerCase().includes(q) ||
    (item.diagnosis_zh && item.diagnosis_zh.toLowerCase().includes(q)) ||
    item.treatment.toLowerCase().includes(q) ||
    (item.treatment_zh && item.treatment_zh.toLowerCase().includes(q)) ||
    item.prevention.toLowerCase().includes(q) ||
    (item.prevention_zh && item.prevention_zh.toLowerCase().includes(q)) ||
    item.remarks.toLowerCase().includes(q) ||
    (item.remarks_zh && item.remarks_zh.toLowerCase().includes(q))
  );
}

// Render Normal Table View
function renderNormalTable(table, dataList) {
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  
  // Header Columns
  const headers = UI_TRANSLATIONS[currentLang].tableHeaders;
  headers.forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);
  
  const tbody = document.createElement('tbody');
  
  dataList.forEach(item => {
    if (searchQuery && !rowMatchesSearch(item, searchQuery)) return;
    
    const tr = document.createElement('tr');
    
    // 1. Disease
    const tdDisease = document.createElement('td');
    const diseaseText = currentLang === 'zh' ? item.disease_zh : item.disease;
    tdDisease.innerHTML = formatCellContent(diseaseText, searchQuery);
    tr.appendChild(tdDisease);
    
    // 2. Definition
    const tdDef = document.createElement('td');
    const defText = currentLang === 'zh' ? item.definition_zh : item.definition;
    tdDef.appendChild(createTableCellInner(defText, true));
    tr.appendChild(tdDef);
    
    // 3. Pathogen
    const tdPathogen = document.createElement('td');
    const pathogenText = currentLang === 'zh' ? item.pathogen_zh : (PATHOGEN_MAP.en[item.pathogen] || item.pathogen);
    tdPathogen.appendChild(createTableCellInner(pathogenText, true, true, false, item.pathogen));
    tr.appendChild(tdPathogen);
    
    // 4. Transmission
    const tdTrans = document.createElement('td');
    const transmissionText = currentLang === 'zh' ? item.transmission_zh : item.transmission.map(t => TRANSMISSION_MAP.en[t] || t);
    tdTrans.appendChild(createTableCellInner(transmissionText, true, false, true));
    tr.appendChild(tdTrans);
    
    // 5. Pathogenesis
    const tdPatho = document.createElement('td');
    const pathogenesisText = currentLang === 'zh' ? item.pathogenesis_zh : item.pathogenesis;
    tdPatho.appendChild(createTableCellInner(pathogenesisText, true));
    tr.appendChild(tdPatho);
    
    // 6. Clinical
    const tdClin = document.createElement('td');
    const clinicalText = currentLang === 'zh' ? item.clinical_zh : item.clinical;
    tdClin.appendChild(createTableCellInner(clinicalText, true));
    tr.appendChild(tdClin);
    
    // 7. Diagnosis
    const tdDiag = document.createElement('td');
    const diagnosisText = currentLang === 'zh' ? item.diagnosis_zh : item.diagnosis;
    tdDiag.appendChild(createTableCellInner(diagnosisText, true));
    tr.appendChild(tdDiag);
    
    // 8. Treatment
    const tdTreat = document.createElement('td');
    const treatmentText = currentLang === 'zh' ? item.treatment_zh : item.treatment;
    tdTreat.appendChild(createTableCellInner(treatmentText, true));
    tr.appendChild(tdTreat);
    
    // 9. Prevention
    const tdPrev = document.createElement('td');
    const preventionText = currentLang === 'zh' ? item.prevention_zh : item.prevention;
    tdPrev.appendChild(createTableCellInner(preventionText, true));
    tr.appendChild(tdPrev);
    
    // 10. Remarks
    const tdRemarks = document.createElement('td');
    const remarksText = currentLang === 'zh' ? item.remarks_zh : item.remarks;
    tdRemarks.appendChild(createTableCellInner(remarksText, true));
    tr.appendChild(tdRemarks);
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
}

// Render Transposed Table View
function renderTransposedTable(table, dataList) {
  const tbody = document.createElement('tbody');
  
  // Filter list by search query first
  const activeList = searchQuery 
    ? dataList.filter(item => rowMatchesSearch(item, searchQuery))
    : dataList;
  
  if (activeList.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = currentLang === 'zh' ? '没有匹配的记录。' : 'No records match search.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    return;
  }
  
  // Rows: Attribute categories
  const rowsConfig = [
    { label: 'Disease', label_zh: '疾病', key: 'disease', isHeader: true },
    { label: 'Definition', label_zh: '定义', key: 'definition' },
    { label: 'Pathogen', label_zh: '病原体', key: 'pathogen', isBadge: true },
    { label: 'Transmission', label_zh: '传播途径', key: 'transmission', isMultiBadge: true },
    { label: 'Pathogenesis', label_zh: '发病机制', key: 'pathogenesis' },
    { label: 'Clinical manifestations', label_zh: '临床表现', key: 'clinical' },
    { label: 'Diagnosis', label_zh: '诊断', key: 'diagnosis' },
    { label: 'Treatment', label_zh: '治疗', key: 'treatment' },
    { label: 'Prevention', label_zh: '预防', key: 'prevention' },
    { label: 'Remarks / source notes', label_zh: '备注 / 来源', key: 'remarks' }
  ];
  
  rowsConfig.forEach(rowInfo => {
    const tr = document.createElement('tr');
    
    // First column: Row header
    const tdLabel = document.createElement('td');
    tdLabel.textContent = currentLang === 'zh' ? rowInfo.label_zh : rowInfo.label;
    tr.appendChild(tdLabel);
    
    // Value columns: diseases
    activeList.forEach(item => {
      const tdVal = document.createElement('td');
      
      const key = (currentLang === 'zh' && rowInfo.key !== 'pathogen' && rowInfo.key !== 'transmission')
        ? `${rowInfo.key}_zh`
        : rowInfo.key;
      const val = item[key];
      const isCloze = isClozeStudy && !rowInfo.isHeader;
      
      if (isCloze) {
        tdVal.className = 'cloze-cell';
        tdVal.onclick = () => tdVal.classList.toggle('cloze-revealed');
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'cloze-content';
        renderCellToElement(contentDiv, val, rowInfo, item);
        tdVal.appendChild(contentDiv);
      } else {
        renderCellToElement(tdVal, val, rowInfo, item);
      }
      
      tr.appendChild(tdVal);
    });
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
}

// Render cell value inside a parent element for Transposed table
function renderCellToElement(element, val, rowInfo, item) {
  if (rowInfo.isHeader) {
    element.innerHTML = formatCellContent(val, searchQuery);
  } else if (rowInfo.isBadge) {
    const span = document.createElement('span');
    span.className = `badge badge-${val}`;
    const dispVal = currentLang === 'zh' ? item.pathogen_zh : (PATHOGEN_MAP.en[val] || val);
    span.innerHTML = formatCellContent(dispVal, searchQuery);
    element.appendChild(span);
  } else if (rowInfo.isMultiBadge) {
    const transList = currentLang === 'zh' ? item.transmission_zh : item.transmission;
    transList.forEach((t, idx) => {
      const span = document.createElement('span');
      span.className = 'badge badge-transmission';
      const dispVal = currentLang === 'zh' ? t : (TRANSMISSION_MAP.en[item.transmission[idx]] || t);
      span.innerHTML = formatCellContent(dispVal, searchQuery);
      element.appendChild(span);
    });
  } else {
    element.innerHTML = formatCellContent(val, searchQuery);
  }
}

// Create cell inner element for normal table view (supporting Cloze)
function createTableCellInner(val, allowCloze, isPathogenBadge = false, isTransmissionBadge = false, pathogenType = '') {
  const outer = document.createElement('div');
  const isCloze = isClozeStudy && allowCloze;
  
  let targetNode = outer;
  if (isCloze) {
    outer.className = 'cloze-cell';
    outer.onclick = (e) => {
      e.stopPropagation();
      outer.classList.toggle('cloze-revealed');
    };
    
    const inner = document.createElement('div');
    inner.className = 'cloze-content';
    outer.appendChild(inner);
    targetNode = inner;
  }
  
  if (isPathogenBadge) {
    const span = document.createElement('span');
    span.className = `badge badge-${pathogenType || val}`;
    span.innerHTML = formatCellContent(val, searchQuery);
    targetNode.appendChild(span);
  } else if (isTransmissionBadge) {
    val.forEach(t => {
      const span = document.createElement('span');
      span.className = 'badge badge-transmission';
      span.innerHTML = formatCellContent(t, searchQuery);
      targetNode.appendChild(span);
    });
  } else {
    targetNode.innerHTML = formatCellContent(val, searchQuery);
  }
  
  return outer;
}

// Helper to escape HTML characters
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Format cell content: Escape, highlight matching queries, and handle backticks `code` format
function formatCellContent(text, search = '') {
  if (typeof text !== 'string') return text;
  
  let escaped = escapeHTML(text);
  
  // Format backticks like `2HRZE/4HR` to <code> tags
  escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Replace newlines with <br>
  escaped = escaped.replace(/\n/g, '<br>');
  
  if (!search) return escaped;
  
  // Highlight search matches
  // We must be careful not to highlight search matches inside tags (like <code> or <mark>).
  // A simple way to highlight matching text in text-nodes only:
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = escaped;
  
  highlightNodeText(tempDiv, search);
  
  return tempDiv.innerHTML;
}

// Recursively highlight text in text nodes
function highlightNodeText(node, search) {
  if (node.nodeType === 3) { // Text node
    const text = node.nodeValue;
    const regex = new RegExp(`(${escapeRegex(search)})`, 'gi');
    if (regex.test(text)) {
      const span = document.createElement('span');
      span.innerHTML = text.replace(regex, '<mark>$1</mark>');
      node.parentNode.replaceChild(span, node);
    }
  } else if (node.nodeType === 1 && node.nodeName !== 'MARK' && node.nodeName !== 'CODE') { // Element node (skip highlights and code tags themselves)
    const children = Array.from(node.childNodes);
    children.forEach(child => highlightNodeText(child, search));
  }
}

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// Handle search query updates
function handleSearch(val) {
  searchQuery = val.trim();
  renderCategory();
}

// Toggle Transpose Table mode
function toggleTranspose() {
  isTransposed = !isTransposed;
  document.getElementById('btn-transpose').classList.toggle('active', isTransposed);
  renderCategory();
}

// Toggle Cloze (Blur Cells) Study Mode
function toggleClozeStudy() {
  isClozeStudy = !isClozeStudy;
  
  document.getElementById('btn-study-cloze').classList.toggle('active', isClozeStudy);
  document.getElementById('cloze-controls').style.display = isClozeStudy ? 'flex' : 'none';
  
  renderCategory();
}

// Toggle Compact View mode
function toggleCompact() {
  isCompact = !isCompact;
  const btn = document.getElementById('btn-compact');
  if (isCompact) {
    btn.innerHTML = '<i data-lucide="maximize-2"></i> Wide View';
    btn.classList.remove('active');
  } else {
    btn.innerHTML = '<i data-lucide="minimize-2"></i> Compact View';
    btn.classList.add('active');
  }
  lucide.createIcons();
  renderCategory();
}

// Cloze actions: Blur All or Reveal All
function clozeAction(action) {
  const cells = document.querySelectorAll('.cloze-cell');
  cells.forEach(cell => {
    cell.classList.toggle('cloze-revealed', action === 'reveal');
  });
}


// ==========================================
// FLASHCARD ENGINE
// ==========================================

// Populate study decks in dropdown (bilingual support)
function initDeckDropdown() {
  const select = document.getElementById('deck-select');
  select.innerHTML = '';
  
  DECK_OPTIONS.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt.id;
    el.textContent = currentLang === 'zh' ? opt.name_zh : opt.name;
    select.appendChild(el);
  });
}

// Initialize flashcards deck
function initFlashcards() {
  const deckId = document.getElementById('deck-select').value;
  const rawCards = filterData(deckId);
  
  flashcardDeck = [];
  rawCards.forEach(item => {
    let card = {
      disease: currentLang === 'zh' ? item.disease_zh : item.disease,
      pathogenType: item.pathogen.toUpperCase(),
      attributes: [],
      rawItem: item
    };
    
    // Add all attributes in the requested order
    ATTRIBUTE_FIELDS.forEach(field => {
      let htmlVal = '';
      if (field.key === 'pathogen') {
        const dispVal = currentLang === 'zh' ? item.pathogen_zh : (PATHOGEN_MAP.en[item.pathogen] || item.pathogen);
        htmlVal = `<span class="badge badge-${item.pathogen}">${dispVal}</span>`;
      } else if (field.key === 'transmission') {
        const transList = currentLang === 'zh' ? item.transmission_zh : item.transmission;
        htmlVal = transList.map((t, idx) => {
          const dispVal = currentLang === 'zh' ? t : (TRANSMISSION_MAP.en[item.transmission[idx]] || t);
          return `<span class="badge badge-transmission">${dispVal}</span>`;
        }).join(' ');
      } else {
        const key = currentLang === 'zh' ? `${field.key}_zh` : field.key;
        htmlVal = formatCellContent(item[key]);
      }
      
      card.attributes.push({
        name: field.label,
        htmlValue: htmlVal
      });
    });
    
    flashcardDeck.push(card);
  });
  
  // Shuffle flashcard deck
  shuffleDeck(flashcardDeck);
  
  // Reset index & stats
  currentCardIndex = 0;
  cardStats.known = new Set();
  cardStats.review = new Set();
  
  // Populate checkbox list of attributes to allow custom testing
  populateFieldSelector();
  
  // Show first card
  showCard();
}

// Shuffle deck using Fisher-Yates
function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Populate checkbox list of attributes
function populateFieldSelector() {
  const container = document.getElementById('fields-to-hide-checkboxes');
  container.innerHTML = '';
  
  ATTRIBUTE_FIELDS.forEach(field => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = field.label;
    cb.checked = true; // default: test all attributes
    cb.onchange = updateHiddenFields;
    
    label.appendChild(cb);
    const labelText = currentLang === 'zh' ? field.label_zh : field.label;
    label.appendChild(document.createTextNode(' ' + labelText));
    container.appendChild(label);
  });
  
  updateHiddenFields();
}

// Update hidden fields list based on checkboxes
function updateHiddenFields() {
  const checkboxes = document.querySelectorAll('#fields-to-hide-checkboxes input');
  hiddenFields = [];
  checkboxes.forEach(cb => {
    if (cb.checked) {
      // Checked means we test it (show on back)
      hiddenFields.push(cb.value);
    }
  });
  
  // Refresh card view to apply settings
  if (flashcardDeck.length > 0 && currentCardIndex < flashcardDeck.length) {
    updateCardBack();
  }
}

// Show card at current index
function showCard() {
  const cardNode = document.getElementById('active-flashcard');
  if (cardNode) {
    cardNode.classList.remove('flipped');
  }
  
  if (flashcardDeck.length === 0) {
    renderEmptyDeck();
    return;
  }
  
  if (currentCardIndex >= flashcardDeck.length) {
    renderDeckFinished();
    return;
  }
  
  const card = flashcardDeck[currentCardIndex];
  const item = card.rawItem;
  
  const dispPathogenType = currentLang === 'zh'
    ? item.pathogen_zh
    : (PATHOGEN_MAP.en[item.pathogen] || card.pathogenType);
  
  // Set category label
  document.getElementById('card-front-category').textContent = dispPathogenType;
  document.getElementById('card-back-category').textContent = currentLang === 'zh' ? `${dispPathogenType} - 已显示` : `${dispPathogenType} - REVEALED`;
  
  // Set index indicator
  const idxStr = `${currentCardIndex + 1} / ${flashcardDeck.length}`;
  document.getElementById('card-front-index').textContent = idxStr;
  document.getElementById('card-back-index').textContent = idxStr;
  
  // Set term (Front title)
  document.getElementById('card-front-term').textContent = card.disease;
  
  // Set Front title prefix label
  const titlePrefix = document.querySelector('.card-front .card-title-prefix');
  if (titlePrefix) {
    titlePrefix.textContent = currentLang === 'zh' ? '疾病' : 'Disease';
  }
  
  // Instructions
  const trans = UI_TRANSLATIONS[currentLang];
  document.querySelector('.card-front .card-instructions').innerHTML = `
    <i data-lucide="help-circle" style="width: 1rem; height: 1rem;"></i>
    ${trans.cardFrontInstructions}
  `;
  document.querySelector('.card-back .card-instructions').innerHTML = `
    <i data-lucide="repeat" style="width: 1rem; height: 1rem;"></i>
    ${trans.cardBackInstructions}
  `;
  
  // Buttons
  const reviewBtn = document.querySelector('.btn-review');
  if (reviewBtn) {
    reviewBtn.innerHTML = `<i data-lucide="help-circle"></i> ${trans.btnNeedsReview}`;
  }
  const knowBtn = document.querySelector('.btn-know');
  if (knowBtn) {
    knowBtn.innerHTML = `<i data-lucide="check-circle2"></i> ${trans.btnIKnowThis}`;
  }
  
  // Populate back details
  updateCardBack();
  
  // Update progress bar & stats
  updateStats();
  
  // Recreate Lucide Icons
  lucide.createIcons();
}

// Populate back details of active card
function updateCardBack() {
  const card = flashcardDeck[currentCardIndex];
  const container = document.getElementById('card-back-attributes');
  container.innerHTML = '';
  
  card.attributes.forEach(attr => {
    if (!hiddenFields.includes(attr.name)) return;
    
    const item = document.createElement('div');
    item.className = 'attr-item';
    
    const name = document.createElement('span');
    name.className = 'attr-name';
    
    const field = ATTRIBUTE_FIELDS.find(f => f.label === attr.name);
    const displayName = (field && currentLang === 'zh') ? field.label_zh : attr.name;
    name.textContent = displayName;
    item.appendChild(name);
    
    const val = document.createElement('div');
    val.className = 'attr-value';
    val.innerHTML = attr.htmlValue;
    item.appendChild(val);
    
    container.appendChild(item);
  });
}

// Flip Card
function flipCard() {
  const cardNode = document.getElementById('active-flashcard');
  if (cardNode) {
    cardNode.classList.toggle('flipped');
  }
}

// Next Card
function nextCard() {
  if (currentCardIndex < flashcardDeck.length) {
    currentCardIndex++;
    showCard();
  }
}

// Prev Card
function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    showCard();
  }
}

// Mark card known
function markCardKnown() {
  if (currentCardIndex < flashcardDeck.length) {
    cardStats.known.add(currentCardIndex);
    cardStats.review.delete(currentCardIndex);
    nextCard();
  }
}

// Mark card for review
function markCardForReview() {
  if (currentCardIndex < flashcardDeck.length) {
    cardStats.review.add(currentCardIndex);
    cardStats.known.delete(currentCardIndex);
    nextCard();
  }
}

// Update stats panel
function updateStats() {
  const total = flashcardDeck.length;
  const known = cardStats.known.size;
  const review = cardStats.review.size;
  const remaining = total - currentCardIndex;
  const trans = UI_TRANSLATIONS[currentLang];
  
  document.querySelector('.known-stat').innerHTML = `${trans.statKnown}<span id="stats-known">${known}</span>`;
  document.querySelector('.review-stat').innerHTML = `${trans.statReview}<span id="stats-review">${review}</span>`;
  document.querySelector('.stats-panel div:nth-child(3)').innerHTML = `${trans.statRemaining}<span id="stats-remaining">${Math.max(0, remaining)}</span>`;
  document.querySelector('.stats-panel div:nth-child(4)').innerHTML = `${trans.statTotal}<span id="stats-total">${total}</span>`;
  
  const progressPercent = (currentCardIndex / total) * 100;
  document.getElementById('deck-progress').style.width = `${progressPercent}%`;
}

// Empty state
function renderEmptyDeck() {
  const trans = UI_TRANSLATIONS[currentLang];
  document.getElementById('card-front-term').textContent = trans.noCards;
  document.getElementById('card-back-attributes').innerHTML = '';
}

// Deck completed screen
function renderDeckFinished() {
  const stage = document.querySelector('.flashcard-stage');
  const known = cardStats.known.size;
  const total = flashcardDeck.length;
  const score = Math.round((known / total) * 100) || 0;
  const trans = UI_TRANSLATIONS[currentLang];
  
  stage.innerHTML = `
    <div class="deck-completed">
      <i data-lucide="trophy"></i>
      <h3>${trans.deckCompleted}</h3>
      <p>${trans.deckCompletedText.replace('{total}', total)}</p>
      <p style="font-size: 1.1rem; font-weight: 700; color: var(--accent-teal);">${trans.deckScore.replace('{score}', score).replace('{known}', known).replace('{total}', total)}</p>
      <button class="btn-action" style="margin-top: 1.5rem;" onclick="restartDeck()">
        <i data-lucide="refresh-cw"></i> ${trans.btnRestartStudy}
      </button>
    </div>
  `;
  
  lucide.createIcons();
}

function restartDeck() {
  const stage = document.querySelector('.flashcard-stage');
  const trans = UI_TRANSLATIONS[currentLang];
  stage.innerHTML = `
    <div class="flashcard" id="active-flashcard" onclick="flipCard()">
      <div class="card-face card-front">
        <div class="card-header">
          <span class="card-category" id="card-front-category">${trans.cardFrontCategory}</span>
          <span class="card-index" id="card-front-index">1 / 1</span>
        </div>
        <div class="card-body">
          <div class="card-title-prefix">${currentLang === 'zh' ? '疾病' : 'Disease'}</div>
          <div class="card-title" id="card-front-term">Term</div>
        </div>
        <div class="card-instructions">
          <i data-lucide="help-circle" style="width: 1rem; height: 1rem;"></i>
          ${trans.cardFrontInstructions}
        </div>
      </div>
      <div class="card-face card-back">
        <div class="card-header">
          <span class="card-category" id="card-back-category">REVEALED</span>
          <span class="card-index" id="card-back-index">1 / 1</span>
        </div>
        <div class="card-body" style="align-items: stretch; text-align: left;">
          <div class="attributes-grid" id="card-back-attributes"></div>
        </div>
        <div class="card-instructions" style="color: var(--text-secondary);">
          <i data-lucide="repeat" style="width: 1rem; height: 1rem;"></i>
          ${trans.cardBackInstructions}
        </div>
      </div>
    </div>
  `;
  
  lucide.createIcons();
  initFlashcards();
}

// Setup Keyboard shortcuts
function setupKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (currentMode !== 'flashcards') return;
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
    
    if (e.code === 'Space') {
      e.preventDefault();
      flipCard();
    } else if (e.code === 'ArrowLeft') {
      prevCard();
    } else if (e.code === 'ArrowRight') {
      nextCard();
    } else if (e.code === 'KeyK') {
      markCardKnown();
    } else if (e.code === 'KeyR') {
      markCardForReview();
    }
  });
}
