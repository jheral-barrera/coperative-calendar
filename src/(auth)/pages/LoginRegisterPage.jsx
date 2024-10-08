import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import '../styles/loginRegisterPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
}

const registerFormFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerPasswordConfirmation: '',
}

export const LoginRegisterPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

	const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );
	const { registerName, registerEmail, registerPassword, registerPasswordConfirmation, onInputChange: onRegisterInputChange } = useForm( registerFormFields );

	const onLoginSubmit  = ( event ) => {
		event.preventDefault();

		startLogin({ email: loginEmail, password: loginPassword });
	}

	const onRegisterSubmit  = ( event ) => {
		event.preventDefault();

        if ( registerPassword !== registerPasswordConfirmation ) {
            Swal.fire('Registration Error', 'Passwords do not match', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
	}

    useEffect( () => {
        if ( errorMessage !== undefined ) {
            Swal.fire('Authentication Error', errorMessage, 'error');
        }
    }, [errorMessage] )

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ onLoginSubmit }>
                        <div className="form-group mb-2">
                            <input 
								name='loginEmail'
                                type="text"
                                className="form-control"
                                placeholder="example@example.com"
								onChange={ onLoginInputChange }
								value={ loginEmail }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
								name='loginPassword'
                                type="password"
                                className="form-control"
                                placeholder="Password"
								onChange={ onLoginInputChange }
								value={ loginPassword }
                            />
                        </div>
                        <div className="form-group mb-2 text-center">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ onRegisterSubmit }>
                        <div className="form-group mb-2">
                            <input
								name='registerName'
                                type="text"
                                className="form-control"
                                placeholder="Name"
								onChange={ onRegisterInputChange }
								value={ registerName }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
								name='registerEmail'
                                type="email"
                                className="form-control"
                                placeholder="example@example.com"
								onChange={ onRegisterInputChange }
								value={ registerEmail }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
								name='registerPassword'
                                type="password"
                                className="form-control"
                                placeholder="Password"
								onChange={ onRegisterInputChange }
								value={ registerPassword }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
								name='registerPasswordConfirmation'
                                type="password"
                                className="form-control"
                                placeholder="Repeat password"
								onChange={ onRegisterInputChange }
								value={ registerPasswordConfirmation }
                            />
                        </div>

                        <div className="form-group mb-2 text-center">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Sign up" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}