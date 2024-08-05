import React from 'react';
import style from './Marquee.module.css'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    className?:string;
}

const Marquee: React.FC<MarqueeProps> = ({text, className}) =>{
    return (
        <div className={`${className??""} ${style.marquee}`}><span>{text}</span></div>
    )
}

export default Marquee