const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progress');
const volumeControl = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const currentTimeElement = document.getElementById('current-time');
const totalTimeElement = document.getElementById('total-time');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const songList = document.getElementById('song-list');
const favoritesList = document.getElementById('favorites-list');
const themeToggleBtn = document.getElementById('theme-toggle');

let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentSongIndex = 0;
let favoriteSongs = [];

const songs = [
    { title: 'Song 1', src: 'tune1.mp3', albumArt: 'p1.png' },
    { title: 'Song 2', src: 'tune1.mp3', albumArt: 'p1.png' },
    { title: 'Song 3', src: 'tune1.mp3', albumArt: 'p1.png' }
];

let audio = new Audio(songs[currentSongIndex].src);

// Load song and update UI
function loadSong(song) {
    songTitle.textContent = song.title;
    audio.src = song.src;
    document.getElementById('album-art').src = song.albumArt;
    audio.load();
}

// Play or Pause the song
function playPauseSong() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    } else {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

// Play next song
function playNextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(songs[currentSongIndex]);
    playPauseSong();
}

// Play previous song
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playPauseSong();
}

// Toggle shuffle mode
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? 'blue' : 'black';
});

// Toggle repeat mode
repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? 'blue' : 'black';
    audio.loop = isRepeat;
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    totalTimeElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
});

// Seek to position in the song
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Update volume
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value / 100;
});

// Add songs to playlist UI
function loadPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(song);
            playPauseSong();
        });
        songList.appendChild(li);
    });
}

// Mark song as favorite
function addToFavorites(song) {
    if (!favoriteSongs.includes(song)) {
        favoriteSongs.push(song);
        updateFavoritesUI();
    }
}

// Update favorite songs UI
function updateFavoritesUI() {
    favoritesList.innerHTML = '';
    favoriteSongs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = songs.indexOf(song);
            loadSong(song);
            playPauseSong();
        });
        favoritesList.appendChild(li);
    });
}

// Toggle dark mode
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Event Listeners
playPauseBtn.addEventListener('click', playPauseSong);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPrevSong);

// Initialize
loadSong(songs[currentSongIndex]);
loadPlaylist();
