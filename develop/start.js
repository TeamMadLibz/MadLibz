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
            $(".word-blanks").append("<input><li>" + blankIndex + "</li><br>");
            $("li").attr("class", "word-type");
            $("input").attr("class", "user-input");
        };

        // user input stored here
        let userWords = [];
        let userStory = [];

        // render story on click with event listener
        function renderStory(){
            // hide/show start and story
            $(".choose-words-page").attr("id", "hide");
            $(".story-page").attr("id", "show");  

            // store user words in array
            $(".user-input").each(function(){
                userWords.push($(this).val())
            });

            // map the story array and merge with user input 
            // will need to figure out how to make this part asyncronous due to possible api timing issues once live
            userStory = storyText.map(function(value, index){
                return value + userWords[index];
            });

            // change story array to sting
            userStory.toString();

            // append title and story
            $(".title").text(storyTitle);
            $(".story-text").text(userStory);

            console.log(userWords);

            
        };

        // event listener
        $(".start-btn").click(renderStory);
    });
});