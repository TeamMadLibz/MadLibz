(document).ready(function renderPage() {
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
            $("#wordBlanks").append("<input><li>" + blankIndex + "</li><br>");
            $("li").attr("class", "wordType");
            $("input").attr("class", "user-input-field");
<<<<<<< HEAD
            $("input").attr("class", "userInput");
=======
            $("input").attr("id", "userInput");
>>>>>>> 296a80ed104ee4c3cd31b5f8cb63cfe0e8bad936
        };

        // user input stored here
        let userWords = [];
        let userStory = [];

        // render story on click with event listener
        function renderStory(){
            // hide/show start and story
            // $("#choose-words-page").attr("id", "hide");
            // $("#story-page").attr("id", "show");  

            // store user words in array
<<<<<<< HEAD
            $(".userInput").each(function(){
                console.log('each user input val: ', $(this).val());
                const wordToPush = $(this).val();
                userWords.push(wordToPush);
=======
            $("#userInput").each(function(){
                userWords.push($(this).val())
>>>>>>> 296a80ed104ee4c3cd31b5f8cb63cfe0e8bad936
            });

            // map the story array and merge with user input 
            // will need to figure out how to make this part asyncronous due to possible api timing issues once live
            const storyP$ = $('<p>');
            storyText.map(function(phrase, index){
                const wordSpan$ = $('<span>').text(userWords[index]);
                if(userWords[index] === ''){  // !userWords[index]
                    wordSpan$.text('User Input Missing').attr('class', 'missing-input');
                }
                storyP$.append(phrase);
                storyP$.append(wordSpan$);
            });

            // change story array to sting
           userStory.toString();

            // append title and story
            $("#storyTitle").text(storyTitle);
<<<<<<< HEAD
            $("#madlibzText").append(storyP$);
=======
            $("#madlibzText").text(userStory);
>>>>>>> 296a80ed104ee4c3cd31b5f8cb63cfe0e8bad936

            console.log(userWords);
        };

        // event listener
        $("#startBtn").click(renderStory);
    });
});