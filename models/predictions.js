var mongoose = require('mongoose');

// Prediction Schema

var predictionSchema = mongoose.Schema({
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
		type: Number
	},
	user: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	username: {
		type: String
	}
})

predictionSchema.methods.serialize = function() {
	return {
		id: this._id,
		AwayTeamName: this.AwayTeamName,
		HomeTeamName: this.HomeTeamName,
		AwayTeamScore: this.AwayTeamScore,
		HomeTeamScore: this.HomeTeamScore,
		user: this.user,
		username: this.username,
		Week: this.Week
	}
}

var Predictions = mongoose.model('Predictions', predictionSchema);

module.exports = { Predictions }