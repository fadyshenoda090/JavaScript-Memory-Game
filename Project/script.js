var myCards = document.getElementById( 'container' );
var resultsArray = [];
var counter = 0;
var text = document.getElementById( 'text' );
var seconds = 0;
var tens = 0;
var appendTens = document.getElementById( "tens" );
var appendSeconds = document.getElementById( "seconds" );
var Interval;
var images = [
    'html',
    'css',
    'js',
    'react',
    'angular'
];

var clone = images.slice( 0 ); // duplicate array
var cards = images.concat( clone ); // merge to arrays 

function shuffle ( imgsArray )
{
    for ( var i = imgsArray.length - 1; i > 0; i-- )
    {
        // Generate a random index between 0 and i
        var j = Math.floor( Math.random() * ( i + 1 ) );
        // var j = Math.ceil( Math.random() * ( i ) );
        // Swap elements at i and j
        var x = imgsArray[i];
        imgsArray[i] = imgsArray[j];
        imgsArray[j] = x;
    }
    return imgsArray;
}
shuffle( cards );

for ( var i = 0; i < cards.length; i++ )
{
    card = document.createElement( 'div' );
    card.dataset.item = cards[i];
    // console.log(cards[i]);
    card.dataset.view = "card";
    myCards.appendChild( card );

    card.onclick = function ()
    {

        if ( this.className != 'flipped' && this.className != 'correct' )
        {
            this.className = 'flipped';
            var result = this.dataset.item;
            // console.log( result );
            resultsArray.push( result );
            clearInterval( Interval );
            Interval = setInterval( startTimer, 10 );
        }

        if ( resultsArray.length > 1 )
        {

            if ( resultsArray[0] === resultsArray[1] )
            {
                check( "correct" );
                counter++;
                win();
                resultsArray = [];
            } else
            {
                check( "reverse" );
                resultsArray = [];
            }

        }

    };

};


var check = function ( className )
{

    var x = document.getElementsByClassName( "flipped" );
    setTimeout( function ()
    {

        for ( var i = ( x.length - 1 ); i >= 0; i-- )
        {
            x[i].className = className;
        }

    }, 500 );

};

var win = function ()
{

    if ( counter === 5 )
    {
        clearInterval( Interval );
        
        setTimeout( function ()
        {
            window.location.reload();
        }, 5000 );
        text.innerHTML = "Your time was " + seconds + " : " + tens;
    }

};

function startTimer ()
{
    tens++;

    if ( tens < 9 )
    {
        appendTens.innerHTML = "0" + tens;
    }

    if ( tens > 9 )
    {
        appendTens.innerHTML = tens;

    }

    if ( tens > 99 )
    {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if ( seconds > 9 )
    {
        appendSeconds.innerHTML = seconds;
    }

}
