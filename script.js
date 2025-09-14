function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const createElements = (arr) => {
  const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
  return (htmlElements.join(" "));
};

const manageSpinner =(status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())  //promise of json data.
    .then((json) => displayLesson(json.data));
}
//remove active button color--------------------
const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => btn.classList.remove("active"))
};

//------------------------
const loadLevelWord =(id) =>{
    manageSpinner(true);
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        removeActive()
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active");
        displayLevelWord(data.data)
    });
}

const loadWordDetail = async(id) =>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails =(word) =>{
    const detailBox = document.getElementById("details-container")
    detailBox.innerHTML=`
    <div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i>: ${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class="font-bold">${word.Meaning}</h2>
            <p>agrohi</p>
        </div>
        <div>
            <h2 class="font-bold">Exampe</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold">Synonyms</h2>
            <div>${createElements(word.synonyms)}</div>
        </div>
    
    `
    document.getElementById("word_modal").showModal();
}

const displayLevelWord =(words) =>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length ==0){
        wordContainer.innerHTML =`
        <div class="text-center col-span-3 space-y-8">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl text-gray-400 text-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl text-black font-semibold text-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        return
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML=`
        <div class="bg-white py-10 px-5 rounded-xl shadow-sm text-center space-y-4">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl font-semibold">${word.meaning? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation : "পাওয়া যায়নি"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#e8f4ff] hover:bg-[#b1d7fb]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#e8f4ff] hover:bg-[#b1d7fb]" "><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.append(card);
    });
    manageSpinner(false);
};



//-------------------------
const displayLesson =(lessons) =>{
    //get the container and empty
    const levelContainer = document.getElementById('lavel-container');
    levelContainer.innerHTML="";

    //get into every lessons
    for(let lesson of lessons){
        //create element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML=`
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>lesson - ${lesson.level_no} </button>
        `;
        //append into container
        levelContainer.append(btnDiv);
    }

}

loadLesson(); 




//------------------
document.getElementById('btn-search').addEventListener('click', () =>{
    removeActive();
    const input=document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then((data) =>{
        const allWords =data.data;
        const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    })
})