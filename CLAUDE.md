# CLAUDE.md — Numerologia Quântica

## Project Overview

This is a static, client-side web application for **Quantum Numerology** (Numerologia Quântica), built in Brazilian Portuguese. It calculates and interprets Pythagorean numerology charts ("laudos") from a person's full birth name and date of birth. The app runs entirely in the browser with no backend — no build step, no package manager, no framework.

It is hosted via **GitHub Pages** with a Jekyll Cayman theme for the Markdown index page (`index.md`), while the main app is a standalone HTML/CSS/JS application.

---

## Repository Structure

```
alissonsilveira/
├── Index.html              # Main application entry point (SPA shell)
├── style.css               # Global stylesheet for all pages
├── script.js               # All application logic (vanilla JS)
├── numbers_index.html      # Grid index linking to each number's detail page
├── meaning_1.html          # Detail page for number 1 (template for all others)
├── meaning_2.html          # Detail page for number 2
├── meaning_22.html         # Detail page for master number 22
├── meaning_X.html          # Template for creating new number detail pages
├── index.md                # GitHub Pages Markdown landing page (Jekyll)
├── _config.yml             # Jekyll config (theme: jekyll-theme-cayman)
└── README.md               # Minimal repo description
```

### Missing files referenced in the codebase (need to be created)

The app references pages that do not yet exist in the repository:

- `meaning_3.html` through `meaning_9.html` — standard numbers
- `meaning_11.html`, `meaning_33.html` — master numbers
- `flechas/` directory — arrow detail pages (e.g., `flecha_determinacao.html`, `arrows_index.html`)

Use `meaning_X.html` as the template when creating new number detail pages.

---

## Architecture

### Single-Page Application Pattern (Index.html + script.js)

The main app (`Index.html`) uses a **screen-based SPA pattern** with no routing library. All screens are `<div class="screen">` elements hidden by default (`display: none`). Only the active screen gets the `.active` class (`display: block`).

**Screens:**
| Screen ID | Purpose |
|---|---|
| `homeScreen` | Main menu |
| `laudoInputScreen` | Form to enter name/birthdate |
| `laudoResultScreen` | Display calculated numerology report |
| `historyScreen` | Saved reports list |
| `conversionTableScreen` | Letter-to-number reference table |
| `aboutScreen` | Contact info |
| `flechasScreen` | Birth date arrow analysis |

Navigation is handled by `showScreen(screenId)` in `script.js`. If the `screenId` ends in `.html`, it navigates to a new page via `window.location.href`.

### Data Persistence

Reports ("laudos") are saved to and loaded from **`localStorage`** under the key `numerologiaLaudos` as a JSON array. There is no backend or authentication.

---

## Core Logic (script.js)

### Pythagorean Conversion Table

Letters map to digits 1–9 using the standard Pythagorean table:

```
1: A, J, S
2: B, K, T
3: C, L, U
4: D, M, V
5: E, N, W
6: F, O, X
7: G, P, Y
8: H, Q, Z
9: I, R
```

### Key Calculations

| Function | Purpose |
|---|---|
| `reduceToSingleDigit(n, allowMasterNumbers)` | Reduces a number by summing its digits repeatedly. Stops at 11, 22, or 33 if `allowMasterNumbers=true` |
| `calculateNamePartDetails(namePart)` | Splits a name part into vowels (alma) and consonants (personalidade), returns values per letter |
| `calculatePotentialityMap(fullName)` | Counts frequency of each digit 1–9 in the name; identifies absent numbers |
| `calculateLaudo(nome, data, endereco, tel)` | Main entry: computes all 8 numerological values and returns a laudo object |

### Laudo Object Schema

```js
{
  nomeCompleto: string,
  dataNascimento: string,       // ISO date
  endereco: string,
  telefone: string,
  numeroAlma: number,           // Soul number (vowels)
  numeroPersonalidade: number,  // Personality number (consonants)
  numeroExpressao: number,      // Expression number (all letters)
  numeroDestino: number,        // Destiny/Life path (birthdate)
  numeroMissao: number,         // Mission (expression + destiny)
  anoPessoal: number,           // Personal year (day + month + current year)
  numeroEndereco: number|null,  // Address number (optional)
  numeroTelefone: number|null,  // Phone number (optional)
  nameCalculationDetails: {},   // Per-word breakdown
  potentialityMap: {}           // Frequency map of digits in name
}
```

### Flechas (Individuality Arrows)

`analisarFlechas(dataNascimentoStr)` analyzes a birthdate for "strength" and "weakness" arrows. It counts digit occurrences in the date (ignoring 0), then:
- **Strength arrows**: all 3 required digits are present in the birthdate
- **Weakness arrows**: none of the 3 required digits are present

The 3×3 numerology grid renders as: rows `[3,6,9]`, `[2,5,8]`, `[1,4,7]` (top to bottom).

Repeated digit meanings (`repeatedNumbersMeanings`) are defined for counts of 2, 3, and 4 occurrences of each digit 1–9.

---

## Styling Conventions (style.css)

- **Brand colors**: Purple (`#6a0dad`), Blue-violet (`#8a2be2`), Lavender background accents
- **Layout**: Single-column, max-width 800px, centered
- **Responsive**: Media query at `max-width: 600px` for smaller font sizes in detail tables
- **Buttons**: Full-width by default (`width: calc(100% - 10px)`), inline in `.laudo-item .actions`
- **Delete action**: Red (`#dc3545`)

### CSS Classes to Know

| Class | Purpose |
|---|---|
| `.screen` / `.screen.active` | SPA screen visibility toggle |
| `.result-card` | Purple left-border card for each numerology number result |
| `.name-conversion-detail-table` | 3-row table: vowel values (green) / letters / consonant values (red) |
| `.potentiality-map-table` | Frequency table of digits in name |
| `.grid-cell` | Cell in the 3×3 numerology grid (Flechas screen) |
| `.laudo-item` | Row in saved reports history list |
| `.number-detail-section` | Section block on `meaning_N.html` detail pages |

---

## Number Detail Pages Pattern

Each `meaning_N.html` file follows the same structure. Use `meaning_X.html` as the template — replace all occurrences of `X` with the actual number.

**Required sections** in each detail page:
1. Significado Geral (General Meaning)
2. Número da Alma (Soul Number interpretation)
3. Número da Personalidade (Personality Number interpretation)
4. Número do Destino / Caminho da Vida (Destiny / Life Path)
5. Lição de Vida (Life Lesson)
6. Ano Pessoal (Personal Year)
7. Número do Endereço (Address Number)
8. Número do Telefone (Phone Number)
9. Desafios (Challenges)
10. Conselhos (Advice)

Master numbers (11, 22, 33) may use a condensed format (see `meaning_22.html`).

Each detail page links back with:
```html
<button onclick="window.location.href='numbers_index.html'">Voltar para a Lista de Números</button>
<button onclick="window.location.href='index.html'">Voltar ao Início</button>
```

---

## Development Workflow

### Running Locally

No build step required. Open `Index.html` directly in a browser, or serve with any static file server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

### Deployment

Pushing to the `master` branch triggers GitHub Pages to rebuild automatically. The Jekyll theme applies only to Markdown files (`index.md`). The HTML/CSS/JS files are served as-is.

### Branch Strategy

- `master` — production branch, deployed to GitHub Pages
- Feature branches use the convention `claude/<description>-<id>` (e.g., `claude/add-claude-documentation-3FyQd`)

---

## Key Conventions for AI Assistants

1. **Language**: All user-facing text is in Brazilian Portuguese. Keep it that way. Do not translate or add English content to the UI.

2. **No framework, no build**: This is plain HTML/CSS/JS. Do not introduce npm, bundlers, or frameworks.

3. **No backend**: All data lives in `localStorage`. Do not add server-side logic.

4. **File naming**: Number detail pages must be named `meaning_N.html` exactly (lowercase), since `script.js` dynamically links to them via `href="meaning_${value}.html"`.

5. **Master numbers**: The app recognizes 11, 22, and 33 as master numbers. `reduceToSingleDigit` must be called with `allowMasterNumbers=true` for name-based calculations and destiny, but `false` when reducing individual date parts before summing.

6. **`meaning_X.html` is a template**: Do not fill in content there. Copy it when creating new number pages.

7. **`Index.html` vs `index.html`**: The main app file is `Index.html` (capital I). The Jekyll markdown page is `index.md`. Do not confuse them. Buttons inside the app that say "Voltar ao Início" link to `index.html` (lowercase) — browsers handle this case-insensitively on most systems, but be aware of the discrepancy.

8. **`setupButton` pattern**: Wire up new buttons in `DOMContentLoaded` using the existing `setupButton(id, screenOrFn)` helper rather than adding inline `addEventListener` calls.

9. **CSS duplication**: There are two `#numerologyGrid` and `.grid-cell` rule blocks in `style.css` (the second is more heavily commented). This is redundant but not harmful — the second block takes precedence. Do not add a third block; consolidate if refactoring styles.

10. **Arrow pages not yet created**: The `flechasData` object in `script.js` references HTML files under a `flechas/` subdirectory that do not yet exist. Links will 404 until those pages are created.
