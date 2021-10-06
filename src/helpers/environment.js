let APIURL = ''

switch(window.location.hostname) {
	case 'localhost' || '127.0.0.1':
	
	APIURL = 'http://localhost:4000';
	break;

	case 'movie-ticket-entry.herokuapp.com':
	APIURL = 'https://movie-ticket-entry.herokuapp.com'
}

export default APIURL;