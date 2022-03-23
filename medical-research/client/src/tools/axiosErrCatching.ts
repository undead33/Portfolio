export default function axiosErrCatching(err: string, action: string) {
    let errorMessage = 'Something went wrong, try again.';

    if (err === 'Network Error') {
        errorMessage = 'No internet. Check your internet connection and try again.';
    } else if (localStorage.getItem('tokenExpirationTime') === 'expired') {
        errorMessage = 'expired';
    } else {
        const status = +err.split(' ')[err.split(' ').length - 1];
        console.log(err)///////////////
        console.log(status)///////////////
        if (status === 400) {
            if (action === 'Register') {
                errorMessage = 'User with entered name or email has already exist.';
            }
        }
        else if (status === 401) {
            errorMessage = action === 'Login'
                ? 'You entered wrong email or password, check them and try again.'
                : 'token has expired';
        } else if (status === 404) {
            if (action === 'fetchMedicines') {
                errorMessage = 'The list of medicines is empty';
            } else if (action === 'fetchClinics') {
                errorMessage = 'The list of clinics is empty';
            }
        } else if (status === 500) {
            errorMessage = 'Internal server error, please, try again';
        }
    }

    return errorMessage;
}
