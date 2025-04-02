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

const MainLogo = (props) => {

    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 1280 1280" stroke={strokeColor}>
            <path d="M610.5 167.4c-10.2 2.1-24.3 7.3-63 23.4-46.2 19.2-61.3 25.5-71 29.7-13.3 5.7-41.9 17.9-49.5 21-3 1.3-12.7 5.4-21.5 9.3-8.8 3.8-24.8 10.8-35.5 15.4-22.3 9.7-119.3 52.7-141 62.5-32 14.5-49.1 22.3-60.5 27.8-6.6 3.1-21.2 10-32.4 15.2-43.5 20.2-49.8 24.2-55.5 35.8-8.6 17.7-4.3 42.4 9.5 53.5 6.8 5.4 40.2 23.6 118.9 64.5 42.3 22 72.5 37.8 72.8 38 .1.1.2 69.2.2 153.6 0 162.8-.1 159.4 4.6 166.7 6.7 10.6 14 13.8 38.9 17.3 30.2 4.1 59.6 10.5 80.5 17.6 38.6 12.9 59 25.3 66.3 40 3.1 6.2 4.6 11.9 10.6 39.8 10.9 50.3 17.5 77.2 20.7 84.1 6.4 13.7 21.8 21.5 42.9 21.8 13.6.1 17.4-1.6 39.5-17.9 16.3-12 58.7-37.8 87.5-53.3 18.3-9.8 63.2-31.8 81-39.7 7.2-3.1 13.9-6.1 15-6.6 10.2-4.5 50.6-21.2 60.5-24.9 6.9-2.6 16.8-6.3 22-8.3 23.8-9 39-14.4 58-20.8 42.8-14.4 75.9-25.3 86.9-28.6 6.3-1.9 13.1-4.3 15.2-5.3 4.7-2.5 10.5-8.3 13-13.2 5.1-9.9 4.9-4.7 4.9-179.5V533.9l22.3-10.8c12.2-6 39.7-19.5 61-30 21.4-10.5 39-19.1 39.2-19.1.3 0 3.8-2.1 8-4.6 14.1-8.5 20.9-21.4 20.7-38.7-.2-17.3-8.6-28.6-26.7-36.4-2.7-1.2-12.4-5.6-21.5-9.8-21.3-9.9-64-29.3-90-41-17.3-7.8-104.7-47.6-146.5-66.8-6.6-3-14.2-6.5-17-7.7-2.7-1.2-9.7-4.4-15.5-7-5.8-2.6-16.3-7.3-23.5-10.5-7.1-3.1-17.3-7.6-22.5-10-5.2-2.4-14.2-6.3-20-8.8-5.8-2.5-16.3-7.1-23.5-10.2-70-30.6-118.7-50.7-130-53.6-10.2-2.7-24.9-3.3-34-1.5zm23.3 53.2c12.7 3.7 122.3 50.3 186 79.3 12.3 5.5 22.5 10.1 22.7 10.1.1 0 5.4 2.4 11.6 5.4 6.3 2.9 14.8 6.8 18.9 8.6 4.1 1.8 18.5 8.3 32 14.5 27.5 12.6 39.9 18.2 85 38.5 28.2 12.7 48.4 21.9 89.5 40.8 32.4 14.8 33.6 15.5 32.3 16.7-.7.7-10.1 5.3-20.8 10.3-10.7 5-29.4 13.9-41.5 19.7-12.1 5.9-28.1 13.5-35.5 17-7.4 3.5-18.9 8.9-25.5 12-12.5 5.9-16.1 7.6-41 19.3-8.2 3.8-19.9 9.3-26 12.2-19.4 9.3-80.9 37.7-109.5 50.7-9.1 4.1-29.1 13.2-44.5 20.3-15.4 7-31.4 14.2-35.5 16-7.5 3.3-33.3 14.9-46.5 21-3.8 1.8-12.4 5.6-19 8.5-6.6 2.9-20.1 9-30 13.5-19.4 8.9-26.5 11.1-32.3 10.3-3.1-.4-145.1-70.7-185.7-91.8-6.6-3.4-35.6-18.3-64.5-33s-64-32.7-78-40c-14-7.3-36.5-18.9-50-25.8-13.5-7-32-16.6-41.1-21.4-9.1-4.8-22.9-12.2-30.7-16.3-7.8-4.1-14.2-7.8-14.2-8.1 0-.6 11.9-6.4 36.5-17.5 9.4-4.2 20.4-9.2 24.5-11.1 4.1-1.9 12.2-5.5 18-8 5.8-2.5 13-5.8 16-7.3s15.4-7.1 27.5-12.5 29.4-13.1 38.5-17.3c9.1-4.1 23.5-10.5 32-14.2 8.5-3.8 27.4-12.1 42-18.5 67.8-29.9 144.3-62.7 187-80.2 4.7-1.9 12.3-5.1 17-7 26.6-11 41.2-16.2 45.8-16.3 1.9 0 5.9.7 9 1.6zM976 707.9v148l-2.2.6c-16.8 4.8-83.8 27.1-108.4 36.1-113.8 41.3-202.8 81.9-265.9 121.2-4.9 3.1-10.3 6.7-12 8-1.6 1.3-3.1 2-3.2 1.5-.2-.5-.4-62.7-.6-138.3l-.2-137.4-9.5-4.5c-11.3-5.4-122.8-61.4-169.7-85.2-18.2-9.3-33.3-16.9-33.5-16.9-.1 0-.3 40.6-.2 90.2l.1 90.3 6.9 1.3c56.9 10.5 83.1 26.5 115.8 70.7 4.9 6.6 10.2 13.7 11.9 15.8 1.6 2.1 2.7 4 2.4 4.3-.2.3-4.1-2.5-8.6-6.2-8.2-6.5-22.4-15.5-33.9-21.3-14.9-7.5-47.3-19-71.2-25.2-11.9-3.1-43.2-9.2-53.2-10.4l-5.8-.7v-130c0-71.5.4-129.8.8-129.6.4.1 18.8 9.6 40.8 21 68.7 35.6 81.2 42 147.7 75.3 35.6 17.9 67.9 33.4 71.8 34.6 13.8 4.2 22.4 2 62.4-16.2 14.9-6.7 35.8-16.1 46.5-20.9 49-21.9 63.6-28.5 152.5-69 9.4-4.3 24.2-11.2 33-15.3 28.9-13.4 62.8-29.4 73.5-34.5 5.8-2.8 10.8-5.1 11.3-5.1.4-.1.7 66.5.7 147.8z" />
            <path d="M613.7 307c-12.9 2-27.8 12-34.4 23.1-11 18.5-7.1 44.3 8.7 56.8 12.5 9.9 29.5 14.1 44.2 11 8.1-1.8 19.6-7.8 26-13.7 17.1-15.9 18-44.3 1.9-62.4-10.1-11.4-29.2-17.4-46.4-14.8zM924.5 601.6c-39.8 18.8-49.6 23.4-80 37.9-18.1 8.6-38.4 18.2-45 21.2-6.6 3-15.8 7.3-20.5 9.5-19.5 9.3-103 48-130 60.3-6.3 2.8-15.2 6.9-19.7 9l-8.3 3.8v108.8c0 68.6.4 108.9 1 108.9.5 0 3.3-1.4 6.2-3.1 23.6-14 91.3-44.8 146.8-66.9 30.8-12.2 43.8-17.2 77-29.3 11.1-4.1 54.4-18.5 74.3-24.7l13.7-4.3V713.8c0-65.3-.3-118.8-.7-118.8-.5 0-7.1 3-14.8 6.6z" />
        </svg>
    );
}

const UserSVG = (props) => {

    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;
    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  width={size}  height={size}  viewBox="0 0 24 24"  fill={strokeColor}  className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
            <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
        </svg>
    );
}


const BackArrowSvg = (props) => {
    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;
    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  width={size}  height={size}  viewBox="0 0 24 24"  fill="none"  stroke={strokeColor}  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
        </svg>
    );
}

const VSCodeSvg = (props) => {
    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;
    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  width={size}  height={size}  viewBox="0 0 24 24"  fill="none"  stroke={strokeColor}  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-vscode">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M16 3v18l4 -2.5v-13z" /><path d="M9.165 13.903l-4.165 3.597l-2 -1l4.333 -4.5m1.735 -1.802l6.932 -7.198v5l-4.795 4.141" /><path d="M16 16.5l-11 -10l-2 1l13 13.5" />
        </svg>
    );
}

const AutomationSvg = (props) => {
    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;
    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  width={size}  height={size}  viewBox="0 0 24 24"  fill="none"  stroke={strokeColor}  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-automation"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 20.693c-.905 .628 -2.36 .292 -2.675 -1.01a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.492 .362 1.716 2.219 .674 3.03" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17 22l5 -3l-5 -3z" /></svg>
    );
}

const TruckSvg = (props) => {
    const { strokeWidth = 1, strokeColor = "currentColor", size = 24 } = props;
    return(<svg  xmlns="http://www.w3.org/2000/svg"  width={size}  height={size}  viewBox="0 0 24 24"  fill="none"  stroke={strokeColor}  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-truck-loading"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 3h1a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h15" /><path d="M9 6m0 3a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-4a3 3 0 0 1 -3 -3z" /><path d="M9 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>);
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
);

export const IconMainLogo = (props) => (
    <Icon component={ (iconProps) => <MainLogo {...iconProps} {...props}/> }/>
);

export const IconUserFill = (props) => (
    <Icon component={ (iconProps) => <UserSVG {...iconProps} {...props}/> }/>
);

export const IconBackArrow = (props) => (
    <Icon component={ (iconProps) => <BackArrowSvg {...iconProps} {...props}/> }/>
);

export const VsCodeIcon = (props) => (
    <Icon component={ (iconProps) => <VSCodeSvg {...iconProps} {...props}/> }/>
);

export const IndustrialIcon = (props) => (
    <Icon component={ (iconProps) => <AutomationSvg {...iconProps} {...props}/> }/>
);

export const AdministracionIcon = (props) => (
    <Icon component={ (iconProps) => <TruckSvg {...iconProps} {...props}/> }/>
);