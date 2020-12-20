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
            $("#wordBlanks").append("<input><p>" + blankIndex + "</p>"); //changed li to p, we can change this later if needed to rearrange the word placement
            $("p").attr("class", "wordType");
            $("input").attr("class", "userInput");
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
});