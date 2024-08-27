import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        try {
            const { data} = await calendarApi.post('/auth', { email, password });
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({ name: data.name, uid: data._id }) )

        } catch (error) {
            dispatch( onLogout('Incorrect Credentials') )
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {

        try {

            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data._id }) )

        } catch (error) {
            dispatch( onLogout('User already exists') );
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );''
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (token) return dispatch( onLogout() );

        try {

            const { data } = await calendarApi.get('/auth/renewToken');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data._id }) )

        } catch (error) {

            localStorage.clear();
            dispatch( onLogout() );

        }
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Métodos
        startLogin,
        startRegister,
        startLogout,
        checkAuthToken
    }
}
