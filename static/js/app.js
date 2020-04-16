$(document).ready(function(){
  $('.sidenav').sidenav();
});
  $(window).on( 'load', function(){

    $('#masonry').masonry({
      itemSelector: '.col',
      layoutMode: 'masonry',
      filter: '*',
      animationOptions: {
          duration: 500,
          easing: 'linear',
          queue: false
      }
  });

  })

function getReply(elementName, idReply){
  document.getElementsByName(elementName)[0].value=idReply;
  window.location.hash = "#comment-form";
};

let vuesearch = new Vue({
  el: '#search', // div ID
  data: {
      txt: '', // will contain the text written by user
      timeoutID: 0, // used to detect when the user stopped typing
      showresult: false, // show the result dropdown, or not
      result: {}, // results to display, as JSON : {[ {"url":"", "title":""},..] }
      bdd: [] // will contain the full JSON file created by HUGO
      },
  mounted: function() {
      // loading the full JSON to 'bdd'
      axios.get(location.protocol + '//' + location.host + '/search/index.json')
      .then(function (response) {
          vuesearch.bdd = response.data.results;
          })
      .catch(function (error) {
          console.log(error);
          });
      },
  methods: {
      close: function() {
          // Close the dropdown when the input search loses focus
          // with a 300ms delay to let time for the click on link to work
          setTimeout(function() {
              vuesearch.showresult = false;
              vuesearch.txt = '';
              }, 300);
          },
      search: function() {
          // we will search when the user stopped typing for 500ms
          clearTimeout(this.timeoutID);
          this.timeoutID = setTimeout(this.dosearch, 500);
          },
      dosearch: function() {
          // do the search in the 'bdd'
          this.result = []; // clear previous result
          let words = this.txt.split(' '); // split typed text with spaces
          let words2 = []; // words that will be searched
          words.forEach(function(element) { // to skip empty words, if multiple spaces typed (i.e "a  b c")
              if(element) {words2.push(element);}
              });
          let r;
          let resultmp;
          words2.forEach(function(e) { // for each word
              r = vuesearch.bdd.filter(p => p.content.indexOf(e.toLowerCase()) !== -1);
              if(vuesearch.result.length===0) {vuesearch.result = r.slice(); return;}
              resultmp = [];
              vuesearch.result.forEach(function(all1) {
                  r.forEach(function(all2) { // we want AND for words
                      if(all1.url===all2.url) {resultmp.push(all1);}
                      });
                  });
              vuesearch.result = resultmp.slice();
              });
          this.result = this.result.slice(0, 10); // 10 results max
          this.showresult = (this.result.length>0); // show results if we have one or more
          } // dosearch
      } // methods
  }); // Vue