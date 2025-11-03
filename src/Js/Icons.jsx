import Icon from '@ant-design/icons';

//* Función de creación de íconos
export const CreateIcon = (props, SvgComponent) => {
    //Desestructura y separación de props
    const { strokeWidth, size, strokeColor, ...restProps } = props;
    //Props para Svg
    const svgProps = { strokeWidth, size, strokeColor };

    return(<Icon component={ () => <SvgComponent {...svgProps} />} {...restProps}/>)
}

//? En este apartado se colocan los SVG de los íconos que se necesitan.
const CertificateSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke={props.strokeColor||'currentColor'} strokeWidth={props.strokeWidth||1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-certificate">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
        <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
        <path d="M6 9l12 0" />
        <path d="M6 12l3 0" />
        <path d="M6 15l2 0" />
    </svg>
);

const SchoolSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke={props.strokeColor||'currentColor'} strokeWidth={props.strokeWidth||1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-school">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
        <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
    </svg>
);

const BriefCaseSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke={props.strokeColor||'currentColor'} strokeWidth={props.strokeWidth||1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
        <path d="M12 12l0 .01" />
        <path d="M3 13a20 20 0 0 0 18 0" />
    </svg>
);
    


const CashSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||'currentColor'}  strokeWidth={props.strokeWidth||1}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cash">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 15h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v3" />
        <path d="M7 9m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
        <path d="M12 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    </svg>
)

const MenuSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||'currentColor'}  strokeWidth={props.strokeWidth||1}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
    </svg>
)

const MailSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||'currentColor'}  strokeWidth={props.strokeWidth||1}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-mail">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
        <path d="M3 7l9 6l9 -6" />
    </svg>
)


const MainLogo = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size||"100%"} height={props.size||"100%"} stroke={props.strokeColor||'currentColor'} viewBox="0 0 1280 1280">
        <path d="M611 167a6797 6797 0 0 0-183 74l-22 10-36 15-201 91-33 15c-43 20-50 24-55 35-9 18-5 43 9 54 7 5 40 24 119 65l73 38v153c0 163 0 160 5 167 6 10 14 14 39 17q47 7 80 18 57 19 66 40c3 6 5 12 11 39q16 76 21 85 10 20 43 21c13 0 17-1 39-18a988 988 0 0 1 184-99l60-25 22-8a1524 1524 0 0 1 145-50l15-5q9-5 13-13c5-10 5-5 5-180V534l22-11 61-30 39-19 9-5q21-12 20-38 1-26-26-37l-22-9-236-108-17-8-16-7-66-29-23-11c-70-30-119-50-130-53s-25-3-34-2zm23 54c12 3 122 50 186 79l22 10 31 14 117 53 122 58-21 10-77 37c-7 3-19 8-25 12l-41 19-26 12a9520 9520 0 0 1-318 140 7203 7203 0 0 1-328-164l-91-48-31-16-14-8 37-18 86-38 38-18 74-32 187-81 17-7q40-16 46-16zm342 487v148h-2l-109 37a1464 1464 0 0 0-281 130V885l-1-137-9-5-203-102v181l7 1c56 10 83 26 115 70l15 21-9-7c-8-6-22-15-34-21a448 448 0 0 0-124-36h-6V720l1-130 41 21 219 110c14 4 22 2 62-16l47-21 152-69 33-15 85-40z"/>
        <path d="M614 307c-13 2-28 12-35 23-11 19-7 44 9 57q21 15 44 11c8-2 20-8 26-14 17-16 18-44 2-62a54 54 0 0 0-46-15zm311 295-80 38-66 30-150 70-8 3v109l1 109 6-3a1449 1449 0 0 1 224-96l74-25 14-4V714l-1-119z"/>
    </svg>
);

    <svg xmlns="http://www.w3.org/2000/svg" stroke='currentColor' viewBox="0 0 1280 1280">
        <path d="M611 167a6797 6797 0 0 0-183 74l-22 10-36 15-201 91-33 15c-43 20-50 24-55 35-9 18-5 43 9 54 7 5 40 24 119 65l73 38v153c0 163 0 160 5 167 6 10 14 14 39 17q47 7 80 18 57 19 66 40c3 6 5 12 11 39q16 76 21 85 10 20 43 21c13 0 17-1 39-18a988 988 0 0 1 184-99l60-25 22-8a1524 1524 0 0 1 145-50l15-5q9-5 13-13c5-10 5-5 5-180V534l22-11 61-30 39-19 9-5q21-12 20-38 1-26-26-37l-22-9-236-108-17-8-16-7-66-29-23-11c-70-30-119-50-130-53s-25-3-34-2zm23 54c12 3 122 50 186 79l22 10 31 14 117 53 122 58-21 10-77 37c-7 3-19 8-25 12l-41 19-26 12a9520 9520 0 0 1-318 140 7203 7203 0 0 1-328-164l-91-48-31-16-14-8 37-18 86-38 38-18 74-32 187-81 17-7q40-16 46-16zm342 487v148h-2l-109 37a1464 1464 0 0 0-281 130V885l-1-137-9-5-203-102v181l7 1c56 10 83 26 115 70l15 21-9-7c-8-6-22-15-34-21a448 448 0 0 0-124-36h-6V720l1-130 41 21 219 110c14 4 22 2 62-16l47-21 152-69 33-15 85-40z"/>
        <path d="M614 307c-13 2-28 12-35 23-11 19-7 44 9 57q21 15 44 11c8-2 20-8 26-14 17-16 18-44 2-62a54 54 0 0 0-46-15zm311 295-80 38-66 30-150 70-8 3v109l1 109 6-3a1449 1449 0 0 1 224-96l74-25 14-4V714l-1-119z"/>
    </svg>


const UserSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill={props.strokeColor||'currentColor'}  className="icon icon-tabler icons-tabler-filled icon-tabler-user">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
        <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
    </svg>
);


const BackArrowSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||'currentColor'}  strokeWidth={props.strokeWidth||1}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
    </svg>
);


const VSCodeSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||'currentColor'}  strokeWidth={props.strokeWidth||1}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-vscode">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 3v18l4 -2.5v-13z" />
        <path d="M9.165 13.903l-4.165 3.597l-2 -1l4.333 -4.5m1.735 -1.802l6.932 -7.198v5l-4.795 4.141" />
        <path d="M16 16.5l-11 -10l-2 1l13 13.5" />
    </svg>
);


const AutomationSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||'currentColor'}  strokeWidth={props.strokeWidth||1}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-automation">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M13 20.693c-.905 .628 -2.36 .292 -2.675 -1.01a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.492 .362 1.716 2.219 .674 3.03" />
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M17 22l5 -3l-5 -3z" />
    </svg>
);


const TruckSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||'currentColor'}  strokeWidth={props.strokeWidth||1}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-truck-loading">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M2 3h1a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h15" />
        <path d="M9 6m0 3a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-4a3 3 0 0 1 -3 -3z" />
        <path d="M9 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    </svg>
);

const MediumSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||"currentColor"}  strokeWidth={props.strokeWidth||2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-baseline-density-medium">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 20h16" />
        <path d="M4 12h16" />
        <path d="M4 4h16" />
    </svg>
);

const IndentSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||"currentColor"} strokeWidth={props.strokeWidth||2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-indent-increase">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 6l-11 0" />
        <path d="M20 12l-7 0" />
        <path d="M20 18l-11 0" />
        <path d="M4 8l4 4l-4 4" />
    </svg>
)

const UsersSvg = (props) => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={props.size||24}  height={props.size||24}  viewBox="0 0 24 24"  fill="none"  stroke={props.strokeColor||"currentColor"}  strokeWidth={props.strokeWidth||2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-users">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
)



//?  En este apartado definimos las funciones a exportar 
export const IconCertificate = (props) => CreateIcon(props, CertificateSvg);
export const IconSchool = (props) => CreateIcon(props, SchoolSvg);
export const IconBriefCase = (props) => CreateIcon(props, BriefCaseSvg);
export const IconCash = (props) => CreateIcon(props, CashSvg);
export const IconMenu2 = (props) => CreateIcon(props, MenuSvg);
export const IconMail = (props) => CreateIcon(props, MailSvg);
export const IconMainLogo = (props) => CreateIcon(props, MainLogo);
export const IconUserFill = (props) => CreateIcon(props, UserSvg);
export const IconBackArrow = (props) => CreateIcon(props, BackArrowSvg);
export const VsCodeIcon = (props) => CreateIcon(props, VSCodeSvg);
export const IndustrialIcon = (props) => CreateIcon(props, AutomationSvg);
export const AdministracionIcon = (props) => CreateIcon(props, TruckSvg);
export const IconMedium = (props) => CreateIcon(props, MediumSvg);
export const IconIndent = (props) => CreateIcon(props, IndentSvg);
export const IconUsers = (props) => CreateIcon(props, UsersSvg);