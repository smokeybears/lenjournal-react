import Cookies from 'react-cookie';
import uuidV4 from 'uuid/v4';
const Helpers = {
	getBody(response) {
		return response.json()
	},

	formatPhone(phone) {
		return `(${phone.slice(0, 3)})-${phone.slice(3, 6)}-${phone.slice(6, 10)}`
	},

	getSessionID(){
		let sessionID = Cookies.load('sessionID')
		if (!sessionID){
			let expires = new Date()
			expires.setDate(expires.getDate() + 30) // cookies last a month
			Cookies.save('sessionID', 
				// could definitely but threat posed to this site is very small 
				uuidV4(), 
			{
				path: '/',
				expiresAt: expires
			})
		}
		return sessionID
	},

	clearSessionCookie(){
		Cookies.save('sessionID', '')	
	}
}

export default Helpers