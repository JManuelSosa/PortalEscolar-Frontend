import React from 'react';
import Icon from '@ant-design/icons';

//? En este apartado se colocan los SVG de los íconos que se necesitan.

const IconCertificateSVG = (props) => {

    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-certificate">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
            <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
            <path d="M6 9l12 0" />
            <path d="M6 12l3 0" />
            <path d="M6 15l2 0" />
        </svg>
    );
};

const IconSchoolSVG = (props) => {

    const { strokeWidth = 1, strokeColor = "currentColor", size = 24} = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-school">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
            <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
        </svg>
    );
}

const IconBriefCaseSVG = (props) => {

    const { strokeWidth = 1, strokeColor = "currentColor", size = 24} = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
            <path d="M12 12l0 .01" />
            <path d="M3 13a20 20 0 0 0 18 0" />
        </svg>
    );
}

const IconCashSVG = (props) => {

    const { strokeWidth = 1, strokeColor = "currentColor", size = 24} = props;

    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  width={size}  height={size}  viewBox="0 0 24 24"  fill="none"  stroke={strokeColor}  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cash">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 15h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v3" />
            <path d="M7 9m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
            <path d="M12 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        </svg>
    )
}

const IconMenuSVG = (props) => {

    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;

    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  width={size}  height={size}  viewBox="0 0 24 24"  fill="none"  stroke={strokeColor}  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
        </svg>
    )
}

const IconMailSVG = (props) => {
    
    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;

    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  width={size}  height={size}  viewBox="0 0 24 24"  fill="none"  stroke={strokeColor}  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-mail">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
            <path d="M3 7l9 6l9 -6" />
        </svg>
    );
}

//?  En este apartado definimos las funciones a exportar 
export const IconCertificate = (props) => (
    <Icon component={(iconProps) => <IconCertificateSVG {...iconProps} {...props} />} />
);

export const IconSchool = (props) => (
    <Icon component={(iconProps) => <IconSchoolSVG {...iconProps} {...props} />} />
);

export const IconBriefCase = (props) => (
    <Icon component={(iconProps) => <IconBriefCaseSVG {...iconProps} {...props} />} />
);

export const IconCash = (props) => (
    <Icon component={(iconProps) => <IconCashSVG {...iconProps} {...props} />}/>
);

export const IconMenu2 = (props) => (
    <Icon component={ (iconProps) => <IconMenuSVG {...iconProps} {...props}/> }/>
);

export const IconMail = (props) => (
    <Icon component={ (iconProps) => <IconMailSVG {...iconProps} {...props}/> }/>
)