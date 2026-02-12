# Library App

A small vanilla JavaScript app for tracking books in a personal library.

## Features

- Add a new book from a modal form
- Store title, author, page count, and read status
- Render books as cards in a responsive grid
- Toggle read status from each card
- Delete books from the UI and in-memory library array
- Show an empty-state message when no books are present

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6, no framework)

## Project Structure

```text
library-2/
├── index.html
├── css/
│   └── styles.css
└── js/
    └── script.js
```

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/theamanali/library-2.git
cd library-2
```

2. Open `index.html` in your browser.

Optional: run a local server instead of opening the file directly.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## How To Use

1. Click `Add book`.
2. Fill out the form fields.
3. Submit to create a new card.
4. Use the checkbox on a card to toggle read status.
5. Use `Delete` to remove a card.

