// Infectious Diseases Study Dashboard - Application Logic

// State management
let currentCategory = 'all';
let currentMode = 'table';
let isTransposed = false;
let isClozeStudy = false;
let isCompact = true;
let searchQuery = '';

// Flashcards state
let flashcardDeck = [];
let currentCardIndex = 0;
let hiddenFields = []; // Fields to show on the back (i.e. hidden on the front)
let cardStats = {
  known: new Set(),
  review: new Set()
};

// Display maps for abbreviations to fit nicely in columns
const PATHOGEN_MAP = {
  'bacteria': 'BACT',
  'virus': 'VIR',
  'syndrome': 'SYND'
};

const TRANSMISSION_MAP = {
  'respiratory': 'RESP',
  'gastrointestinal': 'GI',
  'zoonotic': 'ZOON',
  'blood-borne': 'BLOOD',
  'syndromic': 'SYND'
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
  { key: 'definition', label: 'Definition' },
  { key: 'pathogen', label: 'Pathogen' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'pathogenesis', label: 'Pathogenesis' },
  { key: 'clinical', label: 'Clinical manifestations' },
  { key: 'diagnosis', label: 'Diagnosis' },
  { key: 'treatment', label: 'Treatment' },
  { key: 'prevention', label: 'Prevention' },
  { key: 'remarks', label: 'Remarks / source notes' }
];

// Deck options mapping for flashcards
const DECK_OPTIONS = [
  { id: 'all', name: 'All Diseases Combined (20)' },
  { id: 'bacterial', name: 'Bacterial Infections' },
  { id: 'viral', name: 'Viral Infections' },
  { id: 'respiratory', name: 'Respiratory / Airborne' },
  { id: 'gastrointestinal', name: 'Gastrointestinal' },
  { id: 'zoonotic', name: 'Zoonotic / Vector' }
];

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  if (!window.DISEASE_DATA) {
    console.error('Disease data not found!');
    document.getElementById('table-view-container').innerHTML = 
      '<div style="color: var(--accent-red); text-align: center; padding: 3rem;">Error: data.js failed to load.</div>';
    return;
  }
  
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

// Helper to check if a row matches search query
function rowMatchesSearch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  
  return (
    item.disease.toLowerCase().includes(q) ||
    item.definition.toLowerCase().includes(q) ||
    item.pathogen.toLowerCase().includes(q) ||
    item.transmission.some(t => t.toLowerCase().includes(q)) ||
    item.pathogenesis.toLowerCase().includes(q) ||
    item.clinical.toLowerCase().includes(q) ||
    item.diagnosis.toLowerCase().includes(q) ||
    item.treatment.toLowerCase().includes(q) ||
    item.prevention.toLowerCase().includes(q) ||
    item.remarks.toLowerCase().includes(q)
  );
}

// Render Normal Table View
function renderNormalTable(table, dataList) {
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  
  // Header Columns
  const headers = ['Disease', 'Definition', 'Path.', 'Trans.', 'Pathogenesis', 'Clinical manifestations', 'Diagnosis', 'Treatment', 'Prevention', 'Remarks / source notes'];
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
    tdDisease.innerHTML = formatCellContent(item.disease, searchQuery);
    tr.appendChild(tdDisease);
    
    // 2. Definition
    const tdDef = document.createElement('td');
    tdDef.appendChild(createTableCellInner(item.definition, true));
    tr.appendChild(tdDef);
    
    // 3. Pathogen
    const tdPathogen = document.createElement('td');
    tdPathogen.appendChild(createTableCellInner(item.pathogen, true, true));
    tr.appendChild(tdPathogen);
    
    // 4. Transmission
    const tdTrans = document.createElement('td');
    tdTrans.appendChild(createTableCellInner(item.transmission, true, false, true));
    tr.appendChild(tdTrans);
    
    // 5. Pathogenesis
    const tdPatho = document.createElement('td');
    tdPatho.appendChild(createTableCellInner(item.pathogenesis, true));
    tr.appendChild(tdPatho);
    
    // 6. Clinical
    const tdClin = document.createElement('td');
    tdClin.appendChild(createTableCellInner(item.clinical, true));
    tr.appendChild(tdClin);
    
    // 7. Diagnosis
    const tdDiag = document.createElement('td');
    tdDiag.appendChild(createTableCellInner(item.diagnosis, true));
    tr.appendChild(tdDiag);
    
    // 8. Treatment
    const tdTreat = document.createElement('td');
    tdTreat.appendChild(createTableCellInner(item.treatment, true));
    tr.appendChild(tdTreat);
    
    // 9. Prevention
    const tdPrev = document.createElement('td');
    tdPrev.appendChild(createTableCellInner(item.prevention, true));
    tr.appendChild(tdPrev);
    
    // 10. Remarks
    const tdRemarks = document.createElement('td');
    tdRemarks.appendChild(createTableCellInner(item.remarks, true));
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
    td.textContent = 'No records match search.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    return;
  }
  
  // Rows: Attribute categories
  const rowsConfig = [
    { label: 'Disease', key: 'disease', isHeader: true },
    { label: 'Definition', key: 'definition' },
    { label: 'Pathogen', key: 'pathogen', isBadge: true },
    { label: 'Transmission', key: 'transmission', isMultiBadge: true },
    { label: 'Pathogenesis', key: 'pathogenesis' },
    { label: 'Clinical manifestations', key: 'clinical' },
    { label: 'Diagnosis', key: 'diagnosis' },
    { label: 'Treatment', key: 'treatment' },
    { label: 'Prevention', key: 'prevention' },
    { label: 'Remarks / source notes', key: 'remarks' }
  ];
  
  rowsConfig.forEach(rowInfo => {
    const tr = document.createElement('tr');
    
    // First column: Row header
    const tdLabel = document.createElement('td');
    tdLabel.textContent = rowInfo.label;
    tr.appendChild(tdLabel);
    
    // Value columns: diseases
    activeList.forEach(item => {
      const tdVal = document.createElement('td');
      
      const val = item[rowInfo.key];
      const isCloze = isClozeStudy && !rowInfo.isHeader;
      
      if (isCloze) {
        tdVal.className = 'cloze-cell';
        tdVal.onclick = () => tdVal.classList.toggle('cloze-revealed');
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'cloze-content';
        renderCellToElement(contentDiv, val, rowInfo);
        tdVal.appendChild(contentDiv);
      } else {
        renderCellToElement(tdVal, val, rowInfo);
      }
      
      tr.appendChild(tdVal);
    });
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
}

// Render cell value inside a parent element for Transposed table
function renderCellToElement(element, val, rowInfo) {
  if (rowInfo.isHeader) {
    element.innerHTML = formatCellContent(val, searchQuery);
  } else if (rowInfo.isBadge) {
    const span = document.createElement('span');
    span.className = `badge badge-${val}`;
    const dispVal = PATHOGEN_MAP[val] || val;
    span.innerHTML = formatCellContent(dispVal, searchQuery);
    element.appendChild(span);
  } else if (rowInfo.isMultiBadge) {
    val.forEach(t => {
      const span = document.createElement('span');
      span.className = 'badge badge-transmission';
      const dispVal = TRANSMISSION_MAP[t] || t;
      span.innerHTML = formatCellContent(dispVal, searchQuery);
      element.appendChild(span);
    });
  } else {
    element.innerHTML = formatCellContent(val, searchQuery);
  }
}

// Create cell inner element for normal table view (supporting Cloze)
function createTableCellInner(val, allowCloze, isPathogenBadge = false, isTransmissionBadge = false) {
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
    span.className = `badge badge-${val}`;
    const dispVal = PATHOGEN_MAP[val] || val;
    span.innerHTML = formatCellContent(dispVal, searchQuery);
    targetNode.appendChild(span);
  } else if (isTransmissionBadge) {
    val.forEach(t => {
      const span = document.createElement('span');
      span.className = 'badge badge-transmission';
      const dispVal = TRANSMISSION_MAP[t] || t;
      span.innerHTML = formatCellContent(dispVal, searchQuery);
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

// Populate study decks in dropdown
function initDeckDropdown() {
  const select = document.getElementById('deck-select');
  select.innerHTML = '';
  
  DECK_OPTIONS.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt.id;
    el.textContent = opt.name;
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
      disease: item.disease,
      pathogenType: item.pathogen.toUpperCase(),
      attributes: []
    };
    
    // Add all attributes in the requested order
    ATTRIBUTE_FIELDS.forEach(field => {
      let htmlVal = '';
      if (field.key === 'pathogen') {
        const dispVal = PATHOGEN_MAP[item.pathogen] || item.pathogen;
        htmlVal = `<span class="badge badge-${item.pathogen}">${dispVal}</span>`;
      } else if (field.key === 'transmission') {
        htmlVal = item.transmission.map(t => {
          const dispVal = TRANSMISSION_MAP[t] || t;
          return `<span class="badge badge-transmission">${dispVal}</span>`;
        }).join(' ');
      } else {
        htmlVal = formatCellContent(item[field.key]);
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
    label.appendChild(document.createTextNode(field.label));
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
  cardNode.classList.remove('flipped');
  
  if (flashcardDeck.length === 0) {
    renderEmptyDeck();
    return;
  }
  
  if (currentCardIndex >= flashcardDeck.length) {
    renderDeckFinished();
    return;
  }
  
  const card = flashcardDeck[currentCardIndex];
  
  // Set category label
  document.getElementById('card-front-category').textContent = card.pathogenType;
  document.getElementById('card-back-category').textContent = `${card.pathogenType} - REVEALED`;
  
  // Set index indicator
  const idxStr = `${currentCardIndex + 1} / ${flashcardDeck.length}`;
  document.getElementById('card-front-index').textContent = idxStr;
  document.getElementById('card-back-index').textContent = idxStr;
  
  // Set term (Front title)
  document.getElementById('card-front-term').textContent = card.disease;
  
  // Populate back details
  updateCardBack();
  
  // Update progress bar & stats
  updateStats();
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
    name.textContent = attr.name;
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
  
  document.getElementById('stats-known').textContent = known;
  document.getElementById('stats-review').textContent = review;
  document.getElementById('stats-remaining').textContent = Math.max(0, remaining);
  document.getElementById('stats-total').textContent = total;
  
  const progressPercent = (currentCardIndex / total) * 100;
  document.getElementById('deck-progress').style.width = `${progressPercent}%`;
}

// Empty state
function renderEmptyDeck() {
  document.getElementById('card-front-term').textContent = 'No cards in this deck';
  document.getElementById('card-back-attributes').innerHTML = '';
}

// Deck completed screen
function renderDeckFinished() {
  const stage = document.querySelector('.flashcard-stage');
  const known = cardStats.known.size;
  const total = flashcardDeck.length;
  const score = Math.round((known / total) * 100) || 0;
  
  stage.innerHTML = `
    <div class="deck-completed">
      <i data-lucide="trophy"></i>
      <h3>Deck Completed!</h3>
      <p>You went through all ${total} cards in this deck.</p>
      <p style="font-size: 1.1rem; font-weight: 700; color: var(--accent-teal);">Score: ${score}% (${known}/${total} known)</p>
      <button class="btn-action" style="margin-top: 1.5rem;" onclick="restartDeck()">
        <i data-lucide="refresh-cw"></i> Restart Study
      </button>
    </div>
  `;
  
  lucide.createIcons();
}

function restartDeck() {
  const stage = document.querySelector('.flashcard-stage');
  stage.innerHTML = `
    <div class="flashcard" id="active-flashcard" onclick="flipCard()">
      <div class="card-face card-front">
        <div class="card-header">
          <span class="card-category" id="card-front-category">PATHOGEN TYPE</span>
          <span class="card-index" id="card-front-index">1 / 1</span>
        </div>
        <div class="card-body">
          <div class="card-title-prefix">Disease</div>
          <div class="card-title" id="card-front-term">Term</div>
        </div>
        <div class="card-instructions">
          <i data-lucide="help-circle" style="width: 1rem; height: 1rem;"></i>
          Click card to reveal details (Space)
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
          Click card to hide details (Space)
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
