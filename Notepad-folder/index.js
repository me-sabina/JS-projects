// Function to save the note to localStorage
function saveNote() {
    const noteContent = document.getElementById('noteArea').value;
    if (noteContent.trim() !== "") {
        localStorage.setItem('savedNote', noteContent);
        alert('Note saved successfully!');
    } else {
        alert('Cannot save an empty note.');
    }
}

// Function to load the saved note from localStorage
function loadNote() {
    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
        document.getElementById('noteArea').value = savedNote;
        alert('Note loaded successfully!');
    } else {
        alert('No saved note found.');
    }
}

// Function to clear the current note and the textarea
function clearNote() {
    document.getElementById('noteArea').value = '';
    localStorage.removeItem('savedNote');
    alert('Note cleared!');
}

// Function to download the note as a .txt file
function downloadNote() {
    const noteContent = document.getElementById('noteArea').value;
    if (noteContent.trim() !== "") {
        const blob = new Blob([noteContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'note.txt';
        link.click();
    } else {
        alert('Cannot download an empty note.');
    }
}
