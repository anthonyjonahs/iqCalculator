# iqCalculator
A calculator built with React and Node. Demo: https://iqcalculator.herokuapp.com/

## About

This calculator was built as a technical test. More about it: 
- All calculation happens client-side.
- Evaluation of expression is done using a JavaScript implementation of the Shunting-Yard algorithm, which can be found in `lib/parse.js`
- The calculator is built with React only - no Flux, Redux, etc. 
- The backend is a very simple Express app with one route. 
- Tests are written for `lib/parser.js` and `lib/utils.js`
- Styling is Bootstrap 3.

## Getting Started
Fork this repo and run: 
`npm start`

For testing:
`npm run test`

## ToDo:
With more time I might have:
- Added Jest snapshot testing for React components. 
- Added validation for expressions input by user (at the moment, bad inputs simply give NaN) with corresponding tests.
- Improved styling. 
