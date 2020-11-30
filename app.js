const searchBtn = document.getElementById("searchBtn");
const myWord = document.getElementById("myword");

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

function findWord(e) {
  const word = myWord.value;

  //make request using with fetch
  getTranslation(word)
    .then((response) => {
      if (response.status !== 200) {
        alert("Not Found, please write again");
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((translation) => {
      console.log({ translation });
      let output = `<div class="message-body">
        <ul>
          <li><strong></strong>${translation[0].word}</li>
          <li><strong></strong>${translation[0].meanings[0].definitions[0].definition}</li>
        </ul>
      </div>`;
      document.querySelector("#output").innerHTML = output;
    });

  // fetch(`${baseURL}/${word}`)
  //   .then((response) => {
  //     if (response.status != 200) {
  //       //   document.querySelector("#output").innerHTML = `
  //       //   <article class="message is-danger">
  //       //   <div class="message-body">Not Found, please try again</div></article>
  //       // `;

  //       //hozircha error messagni alert bn chiqadi
  //       alert("Not Found, please write again");
  //       throw Error(response.statusText);
  //     } else {
  //       return response.json();
  //     }
  //   })
  //   .then((data) => {
  //     let output = `<div class="message-body">
  //     <ul>
  //       <li><strong></strong>${data.word}</li>
  //       <li><strong></strong>${data.definition}</li>
  //     </ul>
  //   </div>`;
  //     // data.meanings.forEach((word) => {
  //     //   output += `
  //     //         <article class="message is-primary">
  //     //           <div class="message-header">
  //     //             <p>Location Info</p>
  //     //             <button class="delete"></button>
  //     //           </div>
  //     //           <div class="message-body">
  //     //             <ul>
  //     //               <li><strong>City: </strong>${word["example"]}</li>
  //     //               <li><strong>State: </strong>${word["definition"]}</li>
  //     //             </ul>
  //     //           </div>
  //     //         </article>
  //     //       `;
  //     // });
  //     // Insert into output div
  //     document.querySelector("#output").innerHTML = output;
  //     // console.log(data);
  //   })
  //   .catch((err) => console.log(err));

  e.preventDefault();
}
