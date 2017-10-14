/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: 200
  },
  main: {
    textAlign: 'center',
    width: 1000,
    marginLeft: 200,
    marginTop: 50
  },
  padd: {
    padding: 20
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  }

  calculateScore = (e) => {
	const text = e.target.value;

	let nWords = 0, nSentences = 0, nSyllabes = 0;
	nWords = text.split(/[a-zA-z]+/).length-1;
	nSentences = text.split(/[^!?.]+/).length-1;
	nSyllabes = text.split(/[a-zA-Z]/).length-1;

	console.log('words :', nWords, 'sentences :', nSentences, 'syllables :', nSyllabes);
	let score = 206.835 - 1.015*(nWords/nSentences) - 84.6*(nSyllabes/nWords);

	this.setState({score: score});
  }

  render() {

    let startInstructions = null;
    let mainContent = null;

    if(!this.state.open) {
      startInstructions = (
        <div style={styles.container}>
        <h1>Flesch Readability Analyzer</h1>
        <h2>A material UI based project</h2>
        <RaisedButton
          label="Let's do it!"
          secondary={true}
          onTouchTap={this.handleTouchTap}
        />
      </div>
      );
    }

    if(this.state.open) {
      mainContent = (
        <div style={styles.main}>
          <AppBar
            title="Flesch Readability Analyzer"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <TextField 
		  	style={styles.padd}
            hintText="Type the paragraph or paste here to analyze flesch readability score"
            fullWidth={true}
            multiLine={true}
            rows={15}
            onChange={this.calculateScore}
          />
		  <h1> {this.state.score ? `Flesch Score : ${this.state.score}` : null}</h1>
        </div>
      );
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {startInstructions}
          {mainContent}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
