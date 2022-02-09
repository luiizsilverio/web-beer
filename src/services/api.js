import axios from 'axios'
import Nookies from 'nookies'

export const apiConfig = {
	ok: true,
	api_host: process.env.NEXT_PUBLIC_API_HOST || '192.168.1.200',
	api_port: process.env.NEXT_PUBLIC_API_PORT || '3434',
  api_secret: process.env.NEXT_PUBLIC_API_SECRET 
}

const api = axios.create({
	baseURL: `http://${ apiConfig.api_host }:${ apiConfig.api_port }`,
	timeout: 5000,
	headers: { 'secret': apiConfig.api_secret },
})


const cookies = Nookies.get()
let host = cookies['MyBeer:host']

if (host) {
	apiConfig.api_host = host
	api.defaults.baseURL = `http://${ apiConfig.api_host }:${ apiConfig.api_port }`;
}

api.interceptors.response.use(
	(response) => {
		apiConfig.ok = true
		return response;
	},
	(error) => {
		if (error.code === 'ECONNABORTED') { // error.message: "timeout of 5000ms exceeded"
			apiConfig.ok = false
		}
		else if (error.message === 'Network Error') {
			apiConfig.ok = false
		}
		if (!apiConfig.ok) {
			console.log('** Erro ao acessar Beer-API')
		}
		return Promise.reject(error);
	}
);

export default api