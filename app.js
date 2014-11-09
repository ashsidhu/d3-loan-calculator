var principal = 100000;
var interest = 11/1200;
var currentYears = null;
var currentPayment = null;

var graph = d3.select('body')
  .append('svg')
  .attr('height', 600)
  .attr('width', 1200)
  .append('g')
  .attr('transform', 'translate(0,600)')
  .attr('fill', 'blue')
  // .attr('width', 40);


function getData() {
  var data = [];
  for (var i = 1; i <= 30; i++) {
    var obj = {
      year: i,
      monthlyPayment: calculatePayment(i, principal, interest)
    };
    data.push(obj);
  }
  return data;
}

function calculatePayment(years, principal, interest) {
  return principal * ( interest/(1- Math.pow((1+interest),(-years*12)) ) );
}

resultPayment = d3.select('.val-mp');
resultYears = d3.select('.val-yr');

function setResults (d) {
  currentMonthlyPayment = Math.round(d.monthlyPayment*100)/100;
  resultPayment.text(currentMonthlyPayment);
  currentYears = d.year;
  resultYears.text(currentYears);
}

(function () {
  var data = getData();
  graph.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('height', function(d) {
      return 0;
    })
    .attr('transform', 'scale(1,-1)')
    .attr('width', 40)
    .attr('x', function(d) {
      return d.year*40;
    })
    .classed('blue', true)
    .on('mouseover', function(d){
      setResults(d);
    });
  generateBars();
})();

function generateBars() {
  var data = getData();
  graph.selectAll('rect')
    .data(data)
    .attr('height', function(d) {
      return 0;
    })
    .transition()
    .duration(1500)
    .attr('height', function(d) {
      return d.monthlyPayment * 600/(20000);
    })

    currentYears && setResults(data[currentYears-1]);

};

//insert event handler

var principalInput = d3.select('.principal');

principalInput.on('input', function() {
  window.principal = this.value || 100000;
  generateBars();
});

var interestInput = d3.select('.interest');
interestInput.on('input', function() {
 window.interest = this.value/1200;
 generateBars();
});

