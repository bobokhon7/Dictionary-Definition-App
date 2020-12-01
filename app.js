const searchBtn = document.getElementById("searchBtn");
const myWord = document.getElementById("myword");

document.querySelector("body").addEventListener("click", removeBox);

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

searchBtn.addEventListener("click", findWord);

//function to get the translation from API
const getTranslation = async (word) => {
  try {
    return fetch(`${baseURL}/${word}`);
  } catch (error) {
    console.log({ error });
  }
};

//add enter key
myWord.addEventListener("keydown", (e) => {
  e.key === "Enter" && findWord();
});

function findWord() {
  const word = myWord.value;

  //make request using with fetch
  getTranslation(word)
    .then((response) => {
      if (response.status !== 200) {
        // alert("Not Found, please write again");
        document.querySelector("#output").innerHTML = `
        <article class="message is-danger">
        <div class="message-body">Not Found, please try again</div></article>
      `;
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((translation) => {
      console.log({ translation });
      let output = `<article class="message is-primary">
      <div class="message-header">
        <p>Word Info</p>
        <button class="delete"></button>
      </div>
      <div class="message-body">
        <ul>
          <li><strong>word: </strong>${translation[0].word}</li>
          <li><strong>Definition: </strong>${translation[0].meanings[0].definitions[0].definition}</li>
          <li><strong>Example: </strong>${translation[0].meanings[0].definitions[0].example}</li>
         
        </ul>

        <div>
        <h6 class="audiotxt"><strong>Audio:</strong></h6>
         <audio controls class="audio  mt-2">
            <source src="${translation[0].phonetics[0].audio}">
        </audio>
          </div>
      </div>
    </article>`;

      // let defresult = ` <article class= "message is-"><div class="message-body">

      //       <audio controls class="embed-responsive-item">
      //       <source src="${translation[0].phonetics[0].audio}">
      //   </audio>
      //     </div></article>`;

      document.querySelector("#output").innerHTML = output;
      // document.querySelector("#defresult").innerHTML = defresult;
    });

  // e.preventDefault();
}

// fix undefined
// function fixUndefined(){
//   if({translation[0].meanings[0].definitions[0].example} === undefined){

//   }
// }

//remove word info box
function removeBox(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    document.querySelector(".message").remove();
    document.querySelector("#myword").value = "";
  }
}
