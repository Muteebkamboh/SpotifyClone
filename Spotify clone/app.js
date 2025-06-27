console.log("welcome to sptify clone")

// Initiliaze thr variables

let songIndex = 0; 
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let masterSongName = document.getElementById('masterSongName')
let gif = document.getElementById('gif')
let songitems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Chun_ke_tu_legi_Official", filePath: "song/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Main_Rang_Sharbaton_Ka", filePath: "song/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Mil_Ke_Baithange", filePath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "No_problem!", filePath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Rooh_De_Rukh", filePath: "song/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Savera_Ka_Mere_Tu_Suraj_Lage", filePath: "song/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Teri_Ore___Full_Audio", filePath: "song/7.mp3", coverPath: "covers/7.jpg"},
]

songitems.forEach((element, i) =>{
    element.getElementsByTagName("imge").src = songs[i].coverPath;    
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// handle play.pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}); 

// listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate')
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    console.log(progress);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () =>{
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
})
}


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})