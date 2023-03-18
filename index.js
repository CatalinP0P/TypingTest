var textBox;
var wordsContainer;
var Words = 25;
var correct = 0;
var startTime;


function GetNextWord()
{
    var word = document.getElementsByClassName("word")[0];

    if ( word == null )
    {
        HandleEnding();
        return;
    }    

    word.classList.add("selected")
    word.classList.remove("word")
}

function HandleEnding()
{
    var endTime = new Date().getTime();
    var seconds = (endTime - startTime) / 1000;
    var WPM = parseInt( correct * (60/seconds) );
    var ACC = correct / Words;
    ACC = ACC * 100;
    console.log("WPM: " + WPM + " ACC: " + ACC)
    document.getElementById("scoreLabel").textContent = "WPM: " + WPM + " / ACC: " + ACC;
}

function SubmitWord()
{
    var word = document.getElementsByClassName("selected")[0];
    console.log(word.textContent)
    console.log(textBox.value)

    if ( word.textContent.replace(" ", "") == textBox.value.replace(" ", "") )
    {
        correct ++;
        console.log("Corect")
        word.classList.add("correct");
    }
    else
    {
        word.classList.add("wrong");
    }

    word.classList.remove("word");
    word.classList.remove("selected")

    textBox.value = "";

    textBox.classList.remove("tbWrong")
    GetNextWord();
}

window.addEventListener("load", () =>
{
    textBox = document.getElementById("textBox");
    wordsContainer = document.getElementById("wordsContainer");

    textBox.focus();
    var request = new XMLHttpRequest();
    request.open("GET", "https://random-word-api.vercel.app/api?words=" + Words)
    request.send();
    request.onload = () =>
    {
        var words = JSON.parse(request.response);
        words.forEach(word => 
        {
            wordsContainer.innerHTML += 
            `
                <label class="word" >` + word + `</label>
            `  
        })
        GetNextWord();
    }
})

document.getElementById("textBox").addEventListener("keydown", e=>
{
    if ( startTime == null )
    {
        startTime = new Date().getTime();
        console.log(startTime);
    }
    if ( e.code == "Space" )
    {
        SubmitWord();
    }

})

document.getElementById("textBox").addEventListener("keyup", e=>
{
    var word = document.getElementsByClassName("selected")[0];

    var correct = true;
    textBox.value = textBox.value.replace(" ", "")
    for ( var i = 0; i < textBox.value.length; i++ )   
    {
        if ( word.textContent[i] != textBox.value[i] )     
        {
            correct = false;
            console.log(word.textContent[i] + "  " + textBox.value[i] )
        }
    }

    if ( correct == false )
        textBox.classList.add("tbWrong");
    else
        textBox.classList.remove("tbWrong")
})