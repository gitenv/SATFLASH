// Elements
const flashcardsContainer = document.getElementById('flashcards');
const allButton = document.getElementById('allButton');
const shuffleButton = document.getElementById('shuffleButton');


// Flashcards Data
let flashcardsData = [];

// Fetch the CSV file from a static location
fetch('dutput.csv')
    .then(response => response.text())
    .then(csvContent => {
        flashcardsData = parseCSV(csvContent);
        generateFlashcards(flashcardsData);
    })
    .catch(error => console.error('Error fetching the CSV file:', error));

// CSV Parsing Function (semicolon-separated values)
function parseCSV(data) {
    const rows = data.split('\n').slice(1); // Skip header row
    return rows.map(row => {
        const [vocab, definition, example] = row.split(';');
        return { vocab, definition, example };
    });
}

// Generate flashcards dynamically
function generateFlashcards(data) {
    flashcardsContainer.innerHTML = '';
    data.forEach(item => {
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');
        
        const flashcardInner = document.createElement('div');
        flashcardInner.classList.add('flashcard-inner');

        const front = document.createElement('div');
        front.classList.add('flashcard-front');
        front.innerText = item.vocab;

        const back = document.createElement('div');
        back.classList.add('flashcard-back');
        back.innerHTML = `<p><strong>Definition:</strong> ${item.definition}</p>
                          <p><strong>Example:</strong> ${item.example}</p>`;

        flashcardInner.appendChild(front);
        flashcardInner.appendChild(back);
        flashcard.appendChild(flashcardInner);

        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });

        flashcardsContainer.appendChild(flashcard);
    });
}



// Shuffle flashcards
shuffleButton.addEventListener('click', () => {
    flashcardsData = shuffleArray(flashcardsData);
    generateFlashcards(flashcardsData);
});

// Show all flashcards
allButton.addEventListener('click', () => {
    location.reload(); // Refresh the website
});


// Shuffle Array Function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
