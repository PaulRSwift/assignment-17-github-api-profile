console.log('wired up!')
console.log($);

var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i], i, arr)
   }
}

if (typeof myApiSecert === 'undefined'){
var myApiSecert = ' '
}

var searchBoxEl = document.querySelector('.search-box')
var userProfileEl = document.querySelector('.profile-info')
var repoInfoEl = document.querySelector('.repo-info')




var fetchAndRenderProfileData = function(changeUsers){
$.getJSON("https://api.github.com/users/" + changeUsers + "?"+ myApiSecert)
         .then( function( returnData ){
            // console.log(returnData)

   var usrProfileSt =               '<div class="user-pic">'
   usrProfileSt +=                  '<img class="media-object" src="' + returnData.avatar_url + '" alt="...">'
   usrProfileSt +=                   '</div>'
   usrProfileSt +=                     '<div class="user-info">'
   usrProfileSt +=                     '<h1>' + returnData.name + '</h1>'
   usrProfileSt +=                     '<h2>' + returnData.login + '</h2>'
   usrProfileSt +=                     '<p>' + returnData.bio + '</p>'
   usrProfileSt +=                     '<p>' + returnData.blog + "</p>"
   usrProfileSt +=                    '</div>'
   usrProfileSt +=                    '<div> <button type="button" class="btn btn-primary">Follow</button> </div>'
   usrProfileSt +=                 '<a href="#"> Block or Report User</a>'
   usrProfileSt +=               '<hr>'
   usrProfileSt +=                  '<p>' + returnData.company + "</p>"
   usrProfileSt +=                  '<p>' + '<i class="fa fa-map-marker" aria-hidden="true"></i>'+ ' ' + returnData.location + "</p>"
   usrProfileSt +=                  '<p>' + '<i class="fa fa-envelope-o" aria-hidden="true"></i>' + ' ' + '<a href="#">'+ returnData.email + '</a>' + "</p>"
   usrProfileSt +=                  '<p>' + '<i class="fa fa-link" aria-hidden="true"></i>' + ' ' + '<a href="#">' + returnData.blog + '</a>'+ "</p>"
   usrProfileSt +=                  '<p>' + '<i class="fa fa-clock-o" aria-hidden="true"></i>' + ' ' +returnData.created_at + "</p>"

   userProfileEl.innerHTML = usrProfileSt

})

}


var fetchAndRenderReposData = function(changeUsers){
$.getJSON("https://api.github.com/users/" + changeUsers + "/repos")
         .then( function( returnData ){
            // console.log(returnData)

            forEach(returnData, function(repoResults){
               //console.log(repoResults);

               var repoStr = '<ul>' + repoResults.name + '<ul>'
               repoStr +=     '<hr>'


               repoInfoEl.innerHTML += repoStr
            })

          })
}

// fetchAndRenderProfileData()
// fetchAndRenderReposData()
//
// console.log(window.location)

var goButton = document.querySelector('button')
var inputBox = document.querySelector('input')

var changeUserInput = function(){
   userKeyedContent = (inputBox.value);
   console.log(userKeyedContent);

}


var controllerRouter = function(evt){
   var inPutedInfo = window.location.hash.slice(1)
   //console.log(inPutedInfo);

   //console.log(window.location.hash)
   //console.log(inputedInfo)

   if ( inPutedInfo.length === 0 ){
         fetchAndRenderReposData('PaulRSwift')
         fetchAndRenderProfileData('PaulRSwift')
         return
   }

   fetchAndRenderProfileData(changeUserInput)
   fetchAndRenderReposData(changeUserInput)

}


controllerRouter()
window.addEventListener(controllerRouter, 'hashchange')
goButton.addEventListener('click', changeUserInput)
