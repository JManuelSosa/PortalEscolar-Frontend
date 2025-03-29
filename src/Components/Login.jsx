import Login from './Login';
import './Login.css';


export default function Login() {
    return (

        <div className="login-container">
            <div className="login-box">
                <h3></h3>

                <form>

                    <div className="input-group">
                        <i className="fa-solid fa-user"></i>
                        <input type="text" placeholder="Enter username" />
                    </div>



                    <div className="input-group2">
                        <i className="fas fa-lock"></i> {/*esto el icono de candado*/}
                        <input type="password" placeholder="Enter password" />
                        <i class="fa-solid fa-eye"></i> {/*este icono es para el ojo abi */}
                    </div>
                    <div className="options">
                        <label><input type="checkbox" />Recorda</label>
                        <a href="#">Forgot Password?</a>

                    </div>
                    <button type="submit">Iniciar Sesión </button>
                </form>
                <label className="registro">Registrate</label>

            </div>

        </div>


    )
};


























