import Registro from './Registro'
import './Registro.css';

export default function Registro(){

<div className='registro-container'>
    <div className='registro-box'>
    <h3>Registrate</h3>
    <form action="">
        <div className='input-registro'>
        <i class="fa-solid fa-user"></i>
        <input type="text" placeholder="E-mail"/>
        </div>

        <div className='input-registro2'>
        <i class="fas fa-lock"></i>{/*<!-- esto el icono de candado-->*/}
                    <input type="" placeholder="Contraseña"/>
                    <span class="eye-icon" onclick="togglePassword()"/>

        </div>
        <div class="input-group2">
                    <i class="fas fa-lock"></i>{/*<!-- esto el icono de candado-->*/}
                    <input type="" placeholder="Contraseña"/>
                    <span class="eye-icon" onclick="togglePassword()"/>
                       
              </div>
              <div class="boton ">
               <button type="submit">Iniciar Sesión </button>
                  </div>
    </form>
    </div>
</div>


}




