import cookie from 'react-cookie'
const Helpers = {
	// checkStatus(response) {
	// 	return Promise.resolve(response)
	// },

	getBody(response) {
		return response.json()
	},

	formatPhoneNumber(pn) {
		return pn 
	},

	getSessionID(){
		let sessionID = cookie.load('sessionID')
		if (!sessionID){
			sessionID = '43'
			// sessionID = Math.random().toString().slice(2, 8)
			cookie.save('sessionID', 
				sessionID, // without a doubt need to be more secure
			{
				path: '/',
				expiresAt: new Date() + 7 * 24 * 60 * 60 // cookies last a week
			})
		}
		return sessionID
	}

}
export default Helpers