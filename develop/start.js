$(document).ready(function renderPage() {
    // ajax call to madlibz api
    $.ajax( {
        url: "https://madlibz.herokuapp.com/api/random"
    }).then(function(result) {
        // api data
        const wordBlanks = result.blanks;
        const storyTitle = result.title;
        const storyText = result.value;

        // loop to render word inputs
        for (let i = 0; i < wordBlanks.length; i++) {
            const blankIndex = wordBlanks[i];
            
            // add word type below each input
            $("#wordBlanks").append("<input><p>" + blankIndex + "</p><button>"); //changed li to p, we can change this later if needed to rearrange the word placement
            $("p").attr("class", "wordType");
            $("input").attr("class", "userInput");
            $("button").attr("class", "randomBtn");
            $(".randomBtn").attr("id", blankIndex);
            $(".randomBtn").text("Random!");

            // figure out how to render the start button as well to fix the alignment issues.

        };


        // user input stored here
        let userWords = [];
        let userStory = [];

        // render story on click with event listener
        function renderStory(){
            // store user words in array
            $(".userInput").each(function(){
                console.log('each user input val: ', $(this).val());
                const wordToPush = $(this).val();
                userWords.push(wordToPush);
            });

            // map the story array and merge with user input 
            // will need to figure out how to make this part asyncronous due to possible api timing issues once live
            const storyP$ = $('<p>');
            storyText.map(function(phrase, index){
                const wordSpan$ = $('<span>').text(userWords[index]);
                if(userWords[index] === ''){  
                    wordSpan$.text('User Input Missing').attr('class', 'missing-input');
                }
                storyP$.append(phrase);
                storyP$.append(wordSpan$);
            });

            // change story array to sting
           userStory.toString();

           //added local storage
           localStorage.setItem(storyTitle, userWords)
            // append title and story
            $("#storyTitle").text(storyTitle);
            $("#madlibzText").append(storyP$);

        };

        // event listener
        $("#startBtn").click(renderStory)

    });

// Array of possible words for each part of speach
const adjectives = ['brave', 'strong', 'bright', 'yellow', 'tall', 'ugly', 'painful', 'depressing'];

const nouns = ['table', 'finger', 'pirate', 'chair', 'crown'];

// Function to get Url based on the arrya we pass into it
function constructUrl(array){
  const randomNum = Math.floor(Math.random() * array.length - 1) + 1;
  const randomWord = array[randomNum];
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${randomWord}?key=3151b7fe-956b-4ad6-93df-1f1961de36c4`;
  return url;
}

// Function for ajax call to get synonyms
function getSynFromAjax(partofSpeech, randomURL) {
  console.log(randomURL);
  $.ajax({url: randomURL}).then(function(response){
    const wordResponse = response.find(function(entry){
      return entry.fl === partofSpeech
    });
    synonymArray = wordResponse.meta.syns[0];
    const randomNum = Math.floor(Math.random() * synonymArray.length - 1) + 1;
    console.log(synonymArray[randomNum]);
  })
}

// Where event listeners will go
const randomAdjUrl = constructUrl(adjectives);
const randomNounUrl = constructUrl(nouns);
getSynFromAjax('adjective', randomAdjUrl);
getSynFromAjax('noun', randomNounUrl);





// End documentReady
});