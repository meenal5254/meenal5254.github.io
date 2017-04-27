// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function link() {
  var b = document.getElementById('link_id').value;
  var category = document.getElementById('select').value;
  window.location.href = 'search.html?q='+ b + '&category=' + category + '&size=10';
} 

function callElasticSearch(index, query) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "https://search-play-review-s2euwwqqevpg7z3ivnrnunodvq.us-west-2.es.amazonaws.com/" + index + "/_search?q=" + query + "&analyzer=my_synonyms", false);
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
        
  // apple review
  var complains_apple = callElasticSearch("apple", "awful").hits.total;
  var complements_apple = callElasticSearch("apple", "good").hits.total;

  // Google review
  var complains_google = callElasticSearch("google", "awful").hits.total;
  var complements_google = callElasticSearch("google", "good").hits.total;
     
  // Create the data table for all reviews
  var data = getDataForChart(complains_apple + complains_google,  complements_apple + complements_google);

  // Set chart options
  var options = {'title':'Analysis of Reviews For Google Play + Apple App Store'};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div_for_all'));
  chart.draw(data, options);

  var data = getDataForChart(complains_apple,  complements_apple);

  // Set chart options
  var options = {'title':'Analysis of Reviews For Apple App Store'};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div_for_apple'));
  chart.draw(data, options);

  // Create the data table for reviews in google
  var data = getDataForChart(complains_google,  complements_google);

  // Set chart options
  var options = {'title':'Analysis of Reviews For Google Play Store'};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div_for_google'));
  chart.draw(data, options);
} 

function getDataForChart(complainsTotal, complementsTotal) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Source');
  data.addColumn('number', 'Reviews');
  data.addRows([
    ['Complains', complainsTotal],
    ['Complements', complementsTotal]
  ]);

  return data;
}