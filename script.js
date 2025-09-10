const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())  //promise of json data.
    .then((json) => displayLesson(json.data));
}

//------------------------
const loadLevelWord =(id) =>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then((data) => displayLevelWord(data.data));
}

const displayLevelWord =(words) =>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML=`
        <div class="bg-white py-10 px-5 rounded-xl shadow-sm text-center space-y-4">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl font-semibold">${word.meaning} / ${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#e8f4ff] hover:bg-[#b1d7fb]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#e8f4ff] hover:bg-[#b1d7fb]" "><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.append(card);
    });
}



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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i>lesson - ${lesson.level_no} </button>
        `;
        //append into container
        levelContainer.append(btnDiv);
    }

}

loadLesson(); 