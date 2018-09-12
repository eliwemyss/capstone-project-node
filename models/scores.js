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
	Week:{
		type: String
	},
	Day:{
		type:String
	}
})

scoreSchema.methods.serialize = function() {
	return {
		id: this._id,
		AwayTeamName: this.AwayTeamName,
		HomeTeamName: this.HomeTeamName,
		AwayTeamScore: this.AwayTeamScore,
		HomeTeamScore: this.HomeTeamScore
	}
}

var Scores = mongoose.model('Scores', scoreSchema);

module.exports = {Scores}