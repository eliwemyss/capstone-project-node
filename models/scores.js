var mongoose = require('mongoose');

// Score Schema

var scoreSchema = mongoose.Schema({
	AwayTeamName:{
		type: String,
		required: true
	},
	HomeTeamName:{
		type: String,
		required: true
	},
	AwayTeamScore:{
		type: String,
	},
	HomeTeamScore:{
		type: String
	},
	"AwayTeamID":{
		type: Number
	},
	"HomeTeamID":{
		type: Number
	},
	Week:{
		type: Number
	}
})

scoreSchema.methods.serialize = function() {
	return {
		id: this._id,
		AwayTeamName: this.AwayTeamName,
		HomeTeamName: this.HomeTeamName,
		AwayTeamScore: this.AwayTeamScore,
		HomeTeamScore: this.HomeTeamScore,
		AwayTeamID: this.AwayTeamID,
		HomeTeamID: this.HomeTeamID,
		Week: this.Week
	}
}

var Scores = mongoose.model('Scores', scoreSchema);

module.exports = {Scores}