// Parasite Study Dashboard - Application Logic

// State management
let currentCategory = 'nematodes';
let currentMode = 'table';
let isTransposed = false;
let isClozeStudy = false;
let isCompact = true;
let searchQuery = '';

// Flashcards state
let flashcardDeck = [];
let currentCardIndex = 0;
let hiddenFields = [];
let cardStats = {
  known: new Set(),
  review: new Set()
};

// Category mapping to extracted_content.json indices
const CATEGORY_MAP = {
  nematodes: [3, 4, 5],
  trematodes: [6, 7, 8],
  cestodes: [9, 10, 11],
  protozoa: [12, 13, 14],
  arthropods: [15, 16, 17],
  differentials: [18, 19, 20, 21, 22, 23, 24, 25, 26]
};

// Deck options mapping for flashcards
const DECK_OPTIONS = [
  { id: 'all', name: 'All Parasites Combined', tables: [5, 8, 11, 14] },
  { id: 'nematodes', name: 'Nematodes', tables: [5] },
  { id: 'trematodes', name: 'Trematodes', tables: [8] },
  { id: 'cestodes', name: 'Cestodes', tables: [11] },
  { id: 'protozoa', name: 'Protozoa', tables: [14] },
  { id: 'arthropods', name: 'Medical Arthropods', tables: [17] }
];

// Parasite Name to Lifecycle Image mapping
const LIFECYCLE_IMAGES = {
  "Ascaris lumbricoides": "1_Ascaris lumbricoides.jpg",
  "Trichuris trichiura": "2_Trichuris trichiura.gif",
  "Hookworms": "3_Hookworm.jpg",
  "Enterobius vermicularis": "4_Enterobius vermicularis.gif",
  "Wuchereria bancrofti / Brugia malayi": "5_Wuchereria bancrofti.jpg",
  "Trichinella spiralis": "6_Trichinella spiralis.gif",
  "Clonorchis sinensis": "7_Clonorchis sinensis.jpg",
  "Fasciolopsis buski": "9_Fasciolopsis buski.gif",
  "Paragonimus westermani": "8_Paragonimus westermani.gif",
  "Schistosoma japonicum": "10_Schistosoma japonicum.jpg",
  "Taenia solium": "11_Taenia solium.gif",
  "Taenia saginata": "12_Taenia saginata.gif",
  "Echinococcus granulosus": "13_Echinococcus granulosus.gif",
  "Entamoeba histolytica": "14_Entamoeba histolytica.jpg",
  "Leishmania donovani": "15_Leishmania.gif",
  "Giardia lamblia": "16_Giardia duodenalis.gif",
  "Trichomonas vaginalis": "17_Trichomonas vaginalis.gif",
  "Plasmodium spp.": "18_Plasmodium.gif",
  "Toxoplasma gondii": "19_Toxoplasma gondii.gif",
  "Cryptosporidium spp.": "20_Cryptosporidium.jpg"
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  // Check if data is loaded
  if (!window.PARASITE_DATA) {
    console.error('Parasite data not found!');
    document.getElementById('table-view-container').innerHTML = '<div style="color: var(--accent-red); text-align: center; padding: 3rem;">Error: data.js failed to load.</div>';
    return;
  }
  
  // Render current category
  renderCategory();
  
  // Initialize deck options in dropdown
  initDeckDropdown();
  
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Setup Keyboard listeners for flashcards
  setupKeyboardListeners();
});

// Switch view modes
function setMode(mode) {
  currentMode = mode;
  
  // Update UI buttons
  document.getElementById('mode-table').classList.toggle('active', mode === 'table');
  document.getElementById('mode-flashcards').classList.toggle('active', mode === 'flashcards');
  
  // Update visibility of sections
  document.getElementById('table-mode-section').classList.toggle('active', mode === 'table');
  document.getElementById('flashcards-mode-section').classList.toggle('active', mode === 'flashcards');
  
  // If switched to flashcards, initialize deck
  if (mode === 'flashcards') {
    initFlashcards();
  }
}

// Switch categories
function setCategory(category) {
  currentCategory = category;
  
  // Update tab buttons
  const buttons = document.querySelectorAll('#category-tabs .cat-btn');
  buttons.forEach(btn => {
    const text = btn.textContent.toLowerCase();
    if (category === 'arthropods' && text.includes('arthropod')) {
      btn.classList.add('active');
    } else if (category === 'differentials' && text.includes('differential')) {
      btn.classList.add('active');
    } else if (text.startsWith(category.substring(0, 5))) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Render new category
  renderCategory();
}

// Render data for selected category
function renderCategory() {
  const container = document.getElementById('table-view-container');
  container.innerHTML = '';
  
  const elementIndices = CATEGORY_MAP[currentCategory];
  if (!elementIndices) return;
  
  elementIndices.forEach(idx => {
    const element = window.PARASITE_DATA[idx];
    if (!element) return;
    
    if (element.type === 'paragraph') {
      const headingHtml = renderParagraph(element);
      container.appendChild(headingHtml);
    } else if (element.type === 'table') {
      const tableHtml = renderTable(element, idx);
      container.appendChild(tableHtml);
    }
  });
  
  // Append parsed Chinese protozoa key points and interactive quiz on Others section
  if (currentCategory === 'differentials') {
    appendProtozoaArticle(container);
    appendInteractiveQuiz(container);
  }
  
  // Refresh Lucide icons in newly generated DOM
  lucide.createIcons();
}

// HTML Renderer for Paragraphs (Titles/Subtitles)
function renderParagraph(p) {
  const div = document.createElement('div');
  div.className = 'section-header-block';
  
  // Check header level based on text
  const isMainTitle = p.text === 'Nematodes' || p.text === 'Trematodes' || p.text === 'Cestodes' || p.text === 'Protozoa' || p.text === 'Medical arthropods' || p.text === 'Differential Tables';
  
  const h2 = document.createElement(isMainTitle ? 'h2' : 'h3');
  h2.style.fontFamily = 'var(--font-display)';
  h2.style.color = isMainTitle ? 'var(--text-primary)' : 'var(--text-secondary)';
  h2.style.marginTop = isMainTitle ? '0' : '1.5rem';
  h2.style.fontWeight = isMainTitle ? '800' : '600';
  h2.style.fontSize = isMainTitle ? '2rem' : '1.35rem';
  
  // Format runs
  if (p.runs && p.runs.length > 0) {
    p.runs.forEach(run => {
      let span = document.createElement('span');
      span.textContent = run.text;
      if (run.bold) span.style.fontWeight = '700';
      if (run.italic) span.style.fontStyle = 'italic';
      h2.appendChild(span);
    });
  } else {
    h2.textContent = p.text;
  }
  
  div.appendChild(h2);
  return div;
}

// HTML Renderer for Tables
function renderTable(tableData, elementIdx) {
  const rows = tableData.rows;
  if (!rows || rows.length === 0) return document.createElement('div');
  
  // 1. Check if 1x1 table (Shared Features / Info Callouts)
  const isOneByOne = rows.length === 1 && rows[0].length === 1;
  if (isOneByOne) {
    const box = document.createElement('div');
    box.className = 'shared-features-box';
    
    const h3 = document.createElement('h3');
    const isSharedFeature = rows[0][0].text.trim().startsWith('Shared features:');
    h3.innerHTML = isSharedFeature 
      ? '<i data-lucide="info"></i> Shared Features' 
      : '<i data-lucide="book-open"></i> Note';
      
    box.appendChild(h3);
    
    const p = document.createElement('p');
    // We render runs inside the paragraph to preserve bolding/italics
    const cell = rows[0][0];
    if (cell.paragraphs && cell.paragraphs.length > 0) {
      p.innerHTML = renderCellHTML(cell);
    } else {
      p.textContent = cell.text;
    }
    box.appendChild(p);
    return box;
  }
  
  // 2. Regular Comparison Table
  const wrapper = document.createElement('div');
  wrapper.className = 'table-wrapper';
  
  const table = document.createElement('table');
  
  // Check if we need to transpose this table
  // Do not transpose non-comparison tables (only transpose tables with columns > 2)
  const canTranspose = rows[0].length > 2;
  const activeTransposed = isTransposed && canTranspose;
  
  if (activeTransposed) {
    table.className = 'transposed-table';
    renderTransposedTableBody(table, rows);
  } else {
    renderNormalTableBody(table, rows);
  }
  
  if (isCompact) {
    table.classList.add('compact-table');
  }
  
  wrapper.appendChild(table);
  return wrapper;
}

// Render normal table rows
function renderNormalTableBody(table, rows) {
  const tbody = document.createElement('tbody');
  
  rows.forEach((row, rIdx) => {
    // Check if row matches search query (skip header row)
    if (rIdx > 0 && searchQuery) {
      const rowMatches = row.some(cell => 
        cell.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (!rowMatches) return; // skip this row
    }
    
    const tr = document.createElement('tr');
    
    row.forEach((cell, cIdx) => {
      const isHeader = rIdx === 0;
      const elType = isHeader ? 'th' : 'td';
      const cellNode = document.createElement(elType);
      
      // Set grid span if any
      if (cell.grid_span && cell.grid_span > 1) {
        cellNode.colSpan = cell.grid_span;
      }
      
      // Render standard content and check if it has lifecycle image mapping
      let cellHtml = renderCellHTML(cell, searchQuery);
      const parasiteName = row[0].text.trim();
      const hasLifecycle = cIdx === 2 && !isHeader && LIFECYCLE_IMAGES[parasiteName];
      
      if (hasLifecycle) {
        const imgName = LIFECYCLE_IMAGES[parasiteName];
        cellHtml += `<br><span class="lifecycle-indicator" onclick="event.stopPropagation(); showLifecycle('${parasiteName.replace(/'/g, "\\'")}', '${imgName}')"><i data-lucide="image"></i> Lifecycle</span>`;
      }
      
      // Handle Cloze Study Mode for contents (exclude header row and first column)
      const shouldCloze = isClozeStudy && !isHeader && cIdx > 0;
      
      if (shouldCloze) {
        cellNode.className = 'cloze-cell';
        cellNode.onclick = () => cellNode.classList.toggle('cloze-revealed');
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'cloze-content';
        contentDiv.innerHTML = cellHtml;
        cellNode.appendChild(contentDiv);
      } else {
        cellNode.innerHTML = cellHtml;
      }
      
      tr.appendChild(cellNode);
    });
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
}

// Render transposed table rows (horizontal becomes vertical)
function renderTransposedTableBody(table, rows) {
  const tbody = document.createElement('tbody');
  const numRows = rows.length;
  const numCols = rows[0].length;
  
  // We will create row for each column in the original table
  for (let colIdx = 0; colIdx < numCols; colIdx++) {
    const tr = document.createElement('tr');
    
    // We only filter columns (which represent parasites) in transposed mode
    // Column 0 is the attribute header, so we always keep it
    let columnsToInclude = [0];
    if (searchQuery) {
      for (let r = 1; r < numRows; r++) {
        // If this parasite (column) matches search query, keep it
        const parasiteRow = rows[r];
        const parasiteMatches = parasiteRow.some(cell => 
          cell.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (parasiteMatches) {
          columnsToInclude.push(r);
        }
      }
      // If no parasites matched, do not render this attribute row
      if (columnsToInclude.length === 1) continue;
    } else {
      for (let r = 1; r < numRows; r++) columnsToInclude.push(r);
    }
    
    columnsToInclude.forEach((rowIdx, arrayIdx) => {
      const cell = rows[rowIdx][colIdx];
      const cellNode = document.createElement('td');
      
      // Handle Cloze Study Mode in transposed mode
      // Exclude first column (attributes) and first row (parasite names)
      const isHeaderCol = arrayIdx === 0;
      const isHeaderRow = colIdx === 0;
      const shouldCloze = isClozeStudy && !isHeaderCol && !isHeaderRow;
      
      let cellHtml = renderCellHTML(cell, searchQuery);
      const parasiteName = rows[rowIdx][0].text.trim();
      const hasLifecycle = colIdx === 2 && !isHeaderCol && LIFECYCLE_IMAGES[parasiteName];
      
      if (hasLifecycle) {
        const imgName = LIFECYCLE_IMAGES[parasiteName];
        cellHtml += `<br><span class="lifecycle-indicator" onclick="event.stopPropagation(); showLifecycle('${parasiteName.replace(/'/g, "\\'")}', '${imgName}')"><i data-lucide="image"></i> Lifecycle</span>`;
      }
      
      if (shouldCloze) {
        cellNode.className = 'cloze-cell';
        cellNode.onclick = () => cellNode.classList.toggle('cloze-revealed');
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'cloze-content';
        contentDiv.innerHTML = cellHtml;
        cellNode.appendChild(contentDiv);
      } else {
        cellNode.innerHTML = cellHtml;
      }
      
      tr.appendChild(cellNode);
    });
    
    tbody.appendChild(tr);
  }
  
  table.appendChild(tbody);
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

// Helper to render cell formatted HTML with highlights for search query
function renderCellHTML(cell, search = '') {
  if (!cell.paragraphs || cell.paragraphs.length === 0) {
    return highlightText(escapeHTML(cell.text), search);
  }
  
  return cell.paragraphs.map(p => {
    if (!p.runs || p.runs.length === 0) {
      return highlightText(escapeHTML(p.text), search);
    }
    
    return p.runs.map(run => {
      let text = escapeHTML(run.text);
      text = highlightText(text, search);
      if (run.bold) text = `<strong>${text}</strong>`;
      if (run.italic) text = `<em>${text}</em>`;
      return text;
    }).join('');
  }).join('<br>');
}

// Search highlighting helper
function highlightText(text, search) {
  if (!search) return text;
  const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
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
  const option = DECK_OPTIONS.find(o => o.id === deckId);
  if (!option) return;
  
  // Extract cards from the tables list
  flashcardDeck = [];
  
  option.tables.forEach(tblIdx => {
    const tbl = window.PARASITE_DATA[tblIdx];
    if (!tbl || tbl.type !== 'table') return;
    
    const rows = tbl.rows;
    if (rows.length < 2) return;
    
    // Header names for attributes
    const headers = rows[0].map(c => c.text.trim());
    
    // For medical arthropods (Table 23), col 0 is Group, col 1 is Species
    const isArthropods = tblIdx === 23;
    
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      let card = {
        category: isArthropods ? 'Medical Arthropod' : headers[0],
        term: '',
        attributes: [],
        tableIndex: tblIdx
      };
      
      if (isArthropods) {
        // Front: Group (e.g. Mosquitoes) + Important species/stages
        card.term = `[${row[0].text.trim()}] ${row[1].text.trim()}`;
        // Back: rest of the columns
        for (let c = 2; c < row.length; c++) {
          card.attributes.push({
            name: headers[c],
            htmlValue: renderCellHTML(row[c])
          });
        }
      } else {
        // Front: Parasite name (e.g. Ascaris lumbricoides)
        card.term = row[0].text.trim();
        // Back: rest of the columns (Infective stage, Site/Host, etc.)
        for (let c = 1; c < row.length; c++) {
          card.attributes.push({
            name: headers[c],
            htmlValue: renderCellHTML(row[c])
          });
        }
      }
      
      flashcardDeck.push(card);
    }
  });
  
  // Shuffle flashcard deck to make study effective
  shuffleDeck(flashcardDeck);
  
  // Reset index & stats
  currentCardIndex = 0;
  cardStats.known = new Set();
  cardStats.review = new Set();
  
  // Populate checkbox list of attributes to allow custom hiding
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
  
  // Get all unique attribute names in current deck
  let uniqueFields = new Set();
  flashcardDeck.forEach(card => {
    card.attributes.forEach(attr => uniqueFields.add(attr.name));
  });
  
  uniqueFields.forEach(field => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = field;
    cb.checked = true; // default: test all attributes
    cb.onchange = updateHiddenFields;
    
    label.appendChild(cb);
    label.appendChild(document.createTextNode(field));
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
      // Checked means we include them on the BACK (i.e. hide them from the front, test them)
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
  
  // Reset flip status
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
  document.getElementById('card-front-category').textContent = card.category.toUpperCase();
  document.getElementById('card-back-category').textContent = card.category.toUpperCase() + ' - DETAILED';
  
  // Set index indicator
  const idxStr = `${currentCardIndex + 1} / ${flashcardDeck.length}`;
  document.getElementById('card-front-index').textContent = idxStr;
  document.getElementById('card-back-index').textContent = idxStr;
  
  // Set term (Front title)
  document.getElementById('card-front-term').textContent = card.term;
  
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
    // Check if this field should be shown (if checked)
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
  cardNode.classList.toggle('flipped');
}

// Next Card
function nextCard() {
  if (currentCardIndex < flashcardDeck.length - 1) {
    currentCardIndex++;
    showCard();
  } else if (currentCardIndex === flashcardDeck.length - 1) {
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

// Update study statistics and progress
function updateStats() {
  const total = flashcardDeck.length;
  const known = cardStats.known.size;
  const review = cardStats.review.size;
  const remaining = total - currentCardIndex;
  
  document.getElementById('stats-known').textContent = known;
  document.getElementById('stats-review').textContent = review;
  document.getElementById('stats-remaining').textContent = Math.max(0, remaining);
  document.getElementById('stats-total').textContent = total;
  
  // Progress bar fill
  const progressPercent = (currentCardIndex / total) * 100;
  document.getElementById('deck-progress').style.width = `${progressPercent}%`;
}

// Render empty deck state
function renderEmptyDeck() {
  const container = document.getElementById('card-back-attributes');
  container.innerHTML = '';
  document.getElementById('card-front-term').textContent = 'No cards in this deck';
}

// Render deck completion screen
function renderDeckFinished() {
  const stage = document.querySelector('.flashcard-stage');
  const originalCard = document.getElementById('active-flashcard');
  
  const known = cardStats.known.size;
  const total = flashcardDeck.length;
  const score = Math.round((known / total) * 100);
  
  stage.innerHTML = `
    <div class="deck-completed">
      <i data-lucide="trophy"></i>
      <h3>Deck Completed!</h3>
      <p>You went through all ${total} cards in this deck.</p>
      <p style="font-size: 1.1rem; font-weight: 700; color: var(--accent-emerald);">Score: ${score}% (${known}/${total} known)</p>
      <button class="btn-action" style="margin-top: 1rem;" onclick="restartDeck()">
        <i data-lucide="refresh-cw"></i> Restart Study
      </button>
    </div>
  `;
  
  // Re-create lucide icons in dynamically loaded elements
  lucide.createIcons();
}

// Restart current deck study
function restartDeck() {
  // Restore stage HTML
  const stage = document.querySelector('.flashcard-stage');
  stage.innerHTML = `
    <div class="flashcard" id="active-flashcard" onclick="flipCard()">
      <div class="card-face card-front">
        <div class="card-header">
          <span class="card-category" id="card-front-category">CATEGORY</span>
          <span class="card-index" id="card-front-index">1 / 1</span>
        </div>
        <div class="card-body">
          <div class="card-title-prefix">Parasite</div>
          <div class="card-title" id="card-front-term">Term</div>
        </div>
        <div class="card-instructions">
          <i data-lucide="help-circle" style="width: 1rem; height: 1rem;"></i>
          Click card to reveal details (Space)
        </div>
      </div>
      <div class="card-face card-back">
        <div class="card-header">
          <span class="card-category" id="card-back-category">CATEGORY - DETAILED</span>
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

// Setup keyboard shortcuts for study convenience
function setupKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      closeLifecycleModal();
      return;
    }
    
    if (currentMode !== 'flashcards') return;
    
    // Ignore keypresses inside select or check elements
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

// Show lifecycle modal popup
function showLifecycle(parasiteName, imageName) {
  const modal = document.getElementById('lifecycle-modal');
  const modalTitle = document.getElementById('lifecycle-modal-title');
  const modalImg = document.getElementById('lifecycle-modal-img');
  
  modalTitle.innerHTML = `<i data-lucide="image"></i> Lifecycle: <em>${escapeHTML(parasiteName)}</em>`;
  modalImg.src = `parasites/${imageName}`;
  modalImg.alt = `Lifecycle of ${parasiteName}`;
  
  modal.classList.add('active');
  lucide.createIcons(); // refresh icons inside modal
}

// Close lifecycle modal popup
function closeLifecycleModal() {
  const modal = document.getElementById('lifecycle-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// ==========================================
// ARTICLE AND INTERACTIVE QUIZ FUNCTIONS
// ==========================================

// Global Quiz State
let quizState = {
  currentQuestionIdx: 0,
  selectedAnswers: new Set(),
  answersSubmitted: false,
  userGrades: Array(19).fill(null),
  userAnswers: Array(19).fill(null)
};

// Render key points from docx
function appendProtozoaArticle(container) {
  const titleDiv = document.createElement('div');
  titleDiv.className = 'section-header-block';
  titleDiv.style.marginTop = '4rem';
  titleDiv.style.borderLeftColor = 'var(--accent-emerald)';
  
  const h2 = document.createElement('h2');
  h2.innerHTML = '<i data-lucide="book-open" style="color: var(--accent-emerald); vertical-align: middle;"></i> 医学原虫学重点';
  titleDiv.appendChild(h2);
  
  const desc = document.createElement('p');
  desc.textContent = '《医学原虫学重点》课程重点归纳与复习笔记';
  titleDiv.appendChild(desc);
  container.appendChild(titleDiv);
  
  const articleBox = document.createElement('div');
  articleBox.className = 'article-container';
  articleBox.style.background = '#ffffff';
  articleBox.style.border = '1px solid var(--border-color)';
  articleBox.style.borderRadius = '1rem';
  articleBox.style.padding = '2rem';
  articleBox.style.boxShadow = 'var(--shadow-lg)';
  articleBox.style.marginBottom = '4rem';
  
  let currentSection = null;
  
  window.PROTOZOA_KEY_POINTS.forEach(p => {
    const isHeading = /^[一二三四五六七]、/.test(p.text);
    
    if (isHeading) {
      if (currentSection) {
        articleBox.appendChild(currentSection);
      }
      
      currentSection = document.createElement('div');
      currentSection.className = 'article-section';
      currentSection.style.marginBottom = '2rem';
      
      const h3 = document.createElement('h3');
      h3.style.fontFamily = 'var(--font-display)';
      h3.style.color = 'var(--accent-teal)';
      h3.style.fontSize = '1.25rem';
      h3.style.fontWeight = '700';
      h3.style.marginBottom = '1rem';
      h3.style.borderBottom = '1px solid var(--border-color)';
      h3.style.paddingBottom = '0.5rem';
      h3.textContent = p.text;
      currentSection.appendChild(h3);
    } else {
      if (!currentSection) {
        currentSection = document.createElement('div');
        currentSection.className = 'article-section';
        currentSection.style.marginBottom = '2rem';
      }
      
      const pNode = document.createElement('p');
      pNode.style.fontSize = '0.95rem';
      pNode.style.color = 'var(--text-secondary)';
      pNode.style.marginBottom = '0.75rem';
      pNode.style.lineHeight = '1.7';
      
      const isListItem = /^(?:\d+\.|\(\d+\)|[①②③④⑤⑥⑦⑧⑨⑩])/.test(p.text);
      if (isListItem) {
        pNode.style.paddingLeft = '1.25rem';
        pNode.style.textIndent = '-1.25rem';
      }
      
      if (p.runs && p.runs.length > 0) {
        p.runs.forEach(run => {
          let span = document.createElement('span');
          span.textContent = run.text;
          if (run.bold) span.style.fontWeight = '700';
          if (run.italic) span.style.fontStyle = 'italic';
          pNode.appendChild(span);
        });
      } else {
        pNode.textContent = p.text;
      }
      
      currentSection.appendChild(pNode);
    }
  });
  
  if (currentSection) {
    articleBox.appendChild(currentSection);
  }
  
  container.appendChild(articleBox);
}

// Render Interactive Quiz Section
function appendInteractiveQuiz(container) {
  const titleDiv = document.createElement('div');
  titleDiv.className = 'section-header-block';
  titleDiv.style.marginTop = '4rem';
  titleDiv.style.borderLeftColor = 'var(--accent-amber)';
  
  const h2 = document.createElement('h2');
  h2.innerHTML = '<i data-lucide="help-circle" style="color: var(--accent-amber); vertical-align: middle;"></i> 互动练习题';
  titleDiv.appendChild(h2);
  
  const desc = document.createElement('p');
  desc.textContent = '寄生虫学课后思考题与期末复习自测 (Shandong University Lecture Quizzes)';
  titleDiv.appendChild(desc);
  container.appendChild(titleDiv);
  
  const quizBox = document.createElement('div');
  quizBox.className = 'quiz-container';
  quizBox.style.background = '#ffffff';
  quizBox.style.border = '1px solid var(--border-color)';
  quizBox.style.borderRadius = '1rem';
  quizBox.style.padding = '2rem';
  quizBox.style.boxShadow = 'var(--shadow-lg)';
  quizBox.style.marginBottom = '4rem';
  quizBox.id = 'quiz-interactive-box';
  
  container.appendChild(quizBox);
  
  // Trigger initial rendering
  renderQuizArena();
}

function renderQuizArena() {
  const box = document.getElementById('quiz-interactive-box');
  if (!box) return;
  
  const qList = window.QUIZ_QUESTIONS;
  if (!qList || qList.length === 0) {
    box.innerHTML = '<div style="color: var(--accent-red); padding: 2rem; text-align: center;">Error: quiz questions not loaded.</div>';
    return;
  }
  
  const qIdx = quizState.currentQuestionIdx;
  const q = qList[qIdx];
  const isMulti = q.is_multiple;
  
  // Calculate score stats
  let answeredCount = 0;
  let correctCount = 0;
  quizState.userGrades.forEach(g => {
    if (g !== null) {
      answeredCount++;
      if (g) correctCount++;
    }
  });
  
  // 1. Header showing progress & score
  let html = `
    <div class="quiz-header">
      <div>
        <h3 style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 700;">
          Question ${qIdx + 1} of ${qList.length} 
          <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted); margin-left: 0.5rem; text-transform: uppercase; background: #f1f5f9; padding: 0.15rem 0.5rem; border-radius: 0.25rem;">
            ${isMulti ? '多选题 (Multiple Choice)' : '单选题 (Single Choice)'}
          </span>
        </h3>
      </div>
      <div class="quiz-score-indicator">
        Score: <span style="color: var(--accent-emerald);">${correctCount}</span> / ${answeredCount} answered
      </div>
    </div>
  `;
  
  // 2. Navigation dots list (progress map)
  html += `<div class="quiz-dot-grid">`;
  qList.forEach((item, idx) => {
    let dotClass = 'quiz-dot';
    if (idx === qIdx) dotClass += ' active';
    const grade = quizState.userGrades[idx];
    if (grade === true) dotClass += ' correct';
    else if (grade === false) dotClass += ' incorrect';
    
    html += `<div class="${dotClass}" onclick="jumpToQuizQuestion(${idx})">${idx + 1}</div>`;
  });
  html += `</div>`;
  
  // 3. Question text
  html += `
    <div class="quiz-question-card">
      <div class="quiz-q-meta">Lecture slide: ${q.file.replace('.txt', '')}</div>
      <div class="quiz-q-text">${highlightText(escapeHTML(q.question), searchQuery)}</div>
      <div class="quiz-option-list">
  `;
  
  // 4. Render Options list
  q.options.forEach(opt => {
    const key = opt.key;
    const isSelected = quizState.selectedAnswers.has(key);
    
    let cardClass = 'quiz-option-card';
    if (isSelected) cardClass += ' selected';
    
    // If submitted, show grading highlights
    if (quizState.answersSubmitted) {
      // Check if this option is correct
      const isCorrectOption = Array.isArray(q.correct_answer) 
        ? q.correct_answer.includes(key)
        : q.correct_answer === key;
        
      if (isCorrectOption) {
        cardClass += ' correct';
      } else if (isSelected) {
        cardClass += ' incorrect';
      }
    }
    
    // Add onclick depending on state
    let clickAttr = '';
    if (!quizState.answersSubmitted) {
      clickAttr = `onclick="selectQuizOption('${key}')"`;
    }
    
    html += `
      <div class="${cardClass}" ${clickAttr}>
        <div class="quiz-option-letter">${key}</div>
        <div class="quiz-option-text">${highlightText(escapeHTML(opt.text), searchQuery)}</div>
      </div>
    `;
  });
  
  html += `
      </div>
    </div>
  `;
  
  // 5. Submit or Explanation block
  if (quizState.answersSubmitted) {
    const isUserCorrect = quizState.userGrades[qIdx];
    const correctLabel = Array.isArray(q.correct_answer) 
      ? q.correct_answer.join(', ') 
      : q.correct_answer;
      
    html += `
      <div class="quiz-explanation-box">
        <div class="quiz-explanation-title">
          ${isUserCorrect 
            ? '<i data-lucide="check-circle" style="color: var(--accent-emerald);"></i> 回答正确 (CORRECT)' 
            : '<i data-lucide="alert-triangle" style="color: var(--accent-red);"></i> 回答错误 (INCORRECT)'}
          <span style="font-weight: 700; margin-left: auto;">正确答案: ${correctLabel}</span>
        </div>
        <div class="quiz-explanation-text">
          <strong>解析:</strong> ${escapeHTML(q.explanation)}
        </div>
      </div>
    `;
  }
  
  // 6. Action buttons
  html += `
    <div class="quiz-actions">
      <button class="btn-action" onclick="prevQuizQuestion()" ${qIdx === 0 ? 'disabled' : ''}>
        <i data-lucide="chevron-left"></i> Previous
      </button>
  `;
  
  // If not submitted, render submit controls
  if (!quizState.answersSubmitted) {
    const hasSelection = quizState.selectedAnswers.size > 0;
    // For single choice, we submit immediately on selection, but multiple choice requires button click
    if (isMulti) {
      html += `
        <button class="btn-quiz-submit btn-action" onclick="submitQuizAnswer()" ${!hasSelection ? 'disabled' : ''}>
          <i data-lucide="check"></i> Submit Answer
        </button>
      `;
    }
  } else {
    // Already submitted, show grading details
    const isUserCorrect = quizState.userGrades[qIdx];
    html += `
      <div class="quiz-status-badge ${isUserCorrect ? 'correct' : 'incorrect'}">
        <i data-lucide="${isUserCorrect ? 'check' : 'x'}"></i>
        ${isUserCorrect ? 'Correct' : 'Incorrect'}
      </div>
    `;
  }
  
  html += `
      <button class="btn-action" onclick="nextQuizQuestion()" ${qIdx === qList.length - 1 ? 'disabled' : ''}>
        Next <i data-lucide="chevron-right"></i>
      </button>
    </div>
  `;
  
  // Reset score button if all answered
  const allAnswered = answeredCount === qList.length;
  if (allAnswered) {
    html += `
      <div style="text-align: center; margin-top: 1.5rem;">
        <button class="btn-action" onclick="resetQuiz()" style="border-color: var(--accent-amber); color: var(--accent-amber); margin: 0 auto;">
          <i data-lucide="refresh-cw"></i> Reset Quiz
        </button>
      </div>
    `;
  }
  
  box.innerHTML = html;
  
  // Re-create icons in quiz arena
  lucide.createIcons();
}

// Option selector logic
function selectQuizOption(key) {
  const qList = window.QUIZ_QUESTIONS;
  const qIdx = quizState.currentQuestionIdx;
  const q = qList[qIdx];
  const isMulti = q.is_multiple;
  
  if (quizState.answersSubmitted) return;
  
  if (isMulti) {
    if (quizState.selectedAnswers.has(key)) {
      quizState.selectedAnswers.delete(key);
    } else {
      quizState.selectedAnswers.add(key);
    }
    renderQuizArena();
  } else {
    // Single choice: select and submit immediately
    quizState.selectedAnswers.clear();
    quizState.selectedAnswers.add(key);
    submitQuizAnswer();
  }
}

// Submit Answer and Grade
function submitQuizAnswer() {
  const qList = window.QUIZ_QUESTIONS;
  const qIdx = quizState.currentQuestionIdx;
  const q = qList[qIdx];
  
  if (quizState.selectedAnswers.size === 0) return;
  
  quizState.answersSubmitted = true;
  
  // Grade answer
  const correctAns = q.correct_answer;
  const userAnsArray = Array.from(quizState.selectedAnswers);
  
  let isCorrect = false;
  if (Array.isArray(correctAns)) {
    // Multiple choice comparison
    const hasAll = correctAns.every(val => userAnsArray.includes(val));
    const sameLength = correctAns.length === userAnsArray.length;
    isCorrect = hasAll && sameLength;
  } else {
    // Single choice comparison
    isCorrect = userAnsArray.length === 1 && userAnsArray[0] === correctAns;
  }
  
  // Save state
  quizState.userGrades[qIdx] = isCorrect;
  quizState.userAnswers[qIdx] = userAnsArray;
  
  renderQuizArena();
}

// Navigate Questions
function prevQuizQuestion() {
  if (quizState.currentQuestionIdx > 0) {
    quizState.currentQuestionIdx--;
    loadQuizQuestionState();
  }
}

function nextQuizQuestion() {
  const qList = window.QUIZ_QUESTIONS;
  if (quizState.currentQuestionIdx < qList.length - 1) {
    quizState.currentQuestionIdx++;
    loadQuizQuestionState();
  }
}

function jumpToQuizQuestion(idx) {
  quizState.currentQuestionIdx = idx;
  loadQuizQuestionState();
}

function loadQuizQuestionState() {
  const qIdx = quizState.currentQuestionIdx;
  const prevAns = quizState.userAnswers[qIdx];
  
  quizState.selectedAnswers.clear();
  if (prevAns) {
    prevAns.forEach(val => quizState.selectedAnswers.add(val));
    quizState.answersSubmitted = true;
  } else {
    quizState.answersSubmitted = false;
  }
  
  renderQuizArena();
}

// Reset quiz state
function resetQuiz() {
  quizState = {
    currentQuestionIdx: 0,
    selectedAnswers: new Set(),
    answersSubmitted: false,
    userGrades: Array(19).fill(null),
    userAnswers: Array(19).fill(null)
  };
  renderQuizArena();
}
