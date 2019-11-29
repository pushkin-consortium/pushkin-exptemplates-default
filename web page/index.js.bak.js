import React from 'react';
import pushkinClient from 'pushkin-client';
import jsPsych from 'pushkin-jspsych';
import { useHistory, withRouter } from "react-router-dom";

const pushkin = new pushkinClient();
window.jsPsych = jsPsych; // for jsPsych plugin access

class newexp extends React.Component {

	constructor(props) {
		super(props);
	console.log("constructing...")
		this.state = { loading: true, experimentComplete: false };
	}

	componentDidMount() { 
	console.log("component mounted");
		this.startExperiment(); 
	}

	async startExperiment() {
	console.log("starting experiment...")
		let history = useHistory();
		history.listen(jsPsych.endExperiment);

		await pushkin.connect('/api/newexp');
	console.log("connected");
		await pushkin.prepExperimentRun();
	console.log("prepped experiment run");
		await pushkin.loadScripts([
			'https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.0.4/plugins/jspsych-html-button-response.js',
			'https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.0.4/plugins/jspsych-instructions.js',
			'https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.0.4/plugins/jspsych-survey-text.js'
		]);
		const stimuli = await pushkin.getAllStimuli();
	console.log(JSON.stringify(stimuli));
		const timeline = pushkin.setSaveAfterEachStimulus(stimuli);

		await jsPsych.init({
			display_element: document.getElementById('jsPsychTarget'),
			timeline: timeline,
			on_finish: this.endExperiment.bind(this)
		});

		this.setState({ loading: false });
	}

	endExperiment() {
		this.setState({ experimentComplete: true });
		pushkin.endExperiment();
	}

	render() {
	console.log("rendering");
		return (
			<div id="blah" style="width:864px height:500px">
			<div id="jsPsychContainer"> 
			Experiment is here. Is anything showing?
				{ this.state.loading && (<h1>Loading...</h1>)}
				<div id="jsPsychTarget" style={{ display: this.state.loading ? 'none' : 'block' }}></div>
				{ this.state.experimentComplete && (<h1>Thanks for participating.</h1>) }
			</div>
		</div>
		);
	}
}

export default withRouter(newexp);
