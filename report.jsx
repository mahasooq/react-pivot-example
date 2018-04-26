var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' },
]

var reduce = function (row, memo) {
  memo.displays = (row.type === 'display') ? 
    (!memo.displays ? 1 : (memo.displays + 1)) : memo.displays;

  memo.loads = (row.type === 'load') ? 
    (!memo.loads ? 1 : (memo.loads + 1)) : memo.loads;

  memo.impressions = (row.type === 'impression') ?
    (!memo.impressions ? 1 : (memo.impressions + 1)) : memo.impressions;

  memo.loadRate = memo.loads / memo.impressions * 100;
  memo.displayRate = memo.displays / memo.loads * 100;

  return memo;
}

var calculations = [{
  title: 'Impressions', value: 'impressions'
}, {
  title: 'Loads', value: 'loads'
}, {
  title: 'Displays', value: 'displays'
}, {
  title: 'Load rate', value: 'loadRate',
  template: function (val, row) {
    return val.toFixed(2) + ' %';
  }
}, {
  title: 'Display rate', value: 'displayRate',
  template: function (val, row) {
    return val.toFixed(2) + ' %';
  }
}]

module.exports = createReactClass({
  render() {
    return <ReactPivot rows={rows}
      dimensions={dimensions}
      reduce={reduce}
      calculations={calculations} />
  }
})