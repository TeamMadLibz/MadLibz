$(document).ready(function renderPage() {
    // ajax call to madlibz api
    $.ajax( {
        url: 'https://madlibz.herokuapp.com/api/random'
    }).then(function renderUserEntry(result) {
        // API data
        const wordTypes = result.blanks;
        const storyTitle = result.title;
        const storyText = result.value;
        // Start button variable with class and id added.
        const startBtn = $('<button>').text('MadLibz!').addClass('start-btn').attr('id', 'startBtn');

        // Append start button to start button div line 16.
        $('#start-btn').append(startBtn);

        // For loop to render word inputs, word type, and random word buttons from the wordTypes array coming from the API.
        for (let i = 0; i < wordTypes.length; i++) {
            // Current word type in the array.
            const blankIndex = wordTypes[i];
            // Reworked code using variables to create the word type, input fields and random buttons. Classes added to each, we can add more or change these if needed.
            const wordTypeField = $('<p>').text(blankIndex).addClass('word-type');
            const wordInputField = $('<input>').addClass('user-input-field userInput');
            const randomWordBtn = $('<button>').text('Random!').addClass('word-type randomBtn');

            // Append the word type, input and random button on the word-blanks div line 13.
            $('.word-blanks').append(wordTypeField, wordInputField, randomWordBtn);
        };

        // user input stored here
        let userWords = [];
        let userStory = [];

        // render story on click with event listener
        function renderStory(){
            // store user words in array
            $('.userInput').each(function(){
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
            $('#storyTitle').text(storyTitle);
            $('#madlibzText').append(storyP$);

        };

        // event listener
        $('#startBtn').click(renderStory)

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