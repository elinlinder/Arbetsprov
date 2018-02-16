

function searchWikipedia(){
    var inputValue = $('#searchbox').val(); // Save value
    var myURL = "https://en.wikipedia.org/w/api.php?action=opensearch&callback=?&suggest=true&search=" + inputValue; //merge value and url
    //Check if i input has value
    if(inputValue) { 
        $('.search-results').show();
        $('.no-results').hide();
        $.getJSON(myURL, function(json){
            mimeType: "application/json"; 
            //If there is no results, display text
            if(json[1][0]===undefined) { 
                $('.search-results').html('<span class="no-results">No results found.</span>'); }
            else {
                $('.no-results').hide();
                var list = [];
                $.each(json[1], function(i){
                    list[i] = '<td><u>' + json[1][i] + '</u>' + ' : ' + json[2][i] + '</td>';
                });
                $.each(list, function(i){
                    var x = i - 6;
                    //create table of results.
                    $('.search-results').append('<tr id="result-' + x + '" class="result">'); 
                    $('#result-' + x).html(list[x]);
                    $('.search-results').append('</tr>'); 
                });
            }
        });
    }
     else { // If input is empty, hide table
        $('.search-results').hide();
    }
}


$(document).ready(function(){
    $('#savedSearch').hide();
    $('#searchbox').keyup(function(k){
        $('#savedSearch').show();
        searchWikipedia();
        if(k.keyCode == 13) {
            var savedSearch = $(this).val();
            var s = [];
            s.push(savedSearch); 
            for(var y in s) {
                var date = new Date(); //Fetch date
                var hours = date.getHours(); //Fetch hours
                var minutes = addZero(date.getMinutes()); //Fetch minutes and add zero if missing
                var t = hours + ":" + minutes; // Merge hours and minutes
                var day = addZero(date.getDate()); //Fetch day and add zero if missing
                var month = addZero(date.getMonth() + 1); //Fetch month and add zero if missing
                var year = date.getFullYear(); //Fetch year
                
                var d = year + "-" + month + "-" + day + " " + t; //Merge to a timestamp

                var newDiv = document.createElement('div'); //Create new div for search history
                var btnWrap = document.createElement('div'); //Create a wrap for the button so we can add red color to it
                var btn = document.createElement('button'); //Create button for each div
                var time = document.createElement('div');

                btn.className = "close-button"; //add classname to button
                btn.addEventListener('click', function(){ //button on-click close parent div.
                    $(this).parent().parent().fadeOut('slow', function(c){
                    });
                }, false);
                btn.innerHTML = 'X';
                btnWrap.className = "btn-wrap";    
                newDiv.className = "saved-search";
                time.className = "timestamp";
                time.innerHTML = d;
                newDiv.innerHTML = s;
                newDiv.appendChild(time);
                btnWrap.appendChild(btn); // Append btn to btnWrap
                newDiv.appendChild(btnWrap); //Append closebutton to div
                document.getElementById('row').appendChild(newDiv); //Append new div with saved search to #row
            }
        }
    });



});

function addZero(t){
    //If value is under 10, add a zero
    if(t < 10){
        t = "0" + t;
     }
     return t;
    } 
