import css from "@css/Components/LoadingLogo.module.css"; 

const LoadingLogo = (props) => {
    // Si tus PNG son de 320px, muéstralos a 160px (para retina @2x)
    const displaySize = props.size || '160px'; 

    return (
        <div className={`${css.logoContainer} ${props.className || ''}`} style={{ width: displaySize, height: displaySize }}>
            {/* 1. Logo de Fondo (PNG) - Estático */}
            <img 
                src="/img/EduConnectBg.png" 
                alt="Logo background" 
                className={css.logoImage} 
            />
            
            {/* 2. El "Contenedor de Relleno" que se anima */}
            <div className={css.colorWrapper}>
                {/* 3. El Logo de Color (que se contra-anima) */}
                <img 
                    src="/img/EduConnectColor.png" 
                    alt="Logo foreground" 
                    className={`${css.logoImage} ${css.logoImageColor}`} 
                />
            </div>
        </div>
    );
};

export default LoadingLogo;