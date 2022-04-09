import axios from 'axios';

export default class RestPing {

	private apiIP: string;

	constructor(apiIP: string) {
		this.apiIP = apiIP
	}

	public getPingResponse(url: string) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'GET',
				baseURL: this.apiIP,
				url: `/ping/${url}`
			}).then((response) => {
				if (response.status !== 200)
					reject('Invalid Status');
				resolve(response.data);
			}).catch((error) => {
				reject('Error occurred');
			});
		});
	}
}