var mongoose = require('mongoose');

// Score Schema

var scoreSchema = mongoose.Schema({
	awayTeamName:{
		type: String,
		required: true
	},
	homeTeamName:{
		type: String,
		required: true
	},
	awayTeamScore:{
		type: String,
	},
	homeTeamScore:{
		type: String
	},
	week:{
		type: String
	}
})

scoreSchema.methods.serialize = function() {
	return {
		id: this._id,
		awayTeamName: this.awayTeamName,
		homeTeamName: this.homeTeamName,
		awayTeamScore: this.awayTeamScore,
		homeTeamScore: this.homeTeamScore
	}
}

var Scores = mongoose.model('Scores', scoreSchema);

module.exports = {Scores}