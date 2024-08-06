import React, { useEffect, useRef, useState } from 'react';
import style from './Player.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons/faForwardStep';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons/faBackwardStep';

interface PlayerProps {
    title: string;
}

const Player:React.FC<PlayerProps> = ({title}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [position, setPosition] = useState<{x:number; y:number}>({x:0,y:0})
    const ref = useRef<HTMLDivElement | null>(null)
    const handleMouseDown = () =>{ setIsDragging (true)}
    const handleMouseUp = () => {setIsDragging(false)}
    const handleMouseMove = (event:MouseEvent) => {
        if(isDragging && ref.current){
            const x = event.clientX - ref.current.getBoundingClientRect().left
            const y = event.clientY - ref.current.getBoundingClientRect().top
            setPosition({
                x: event.clientX - x,
                y: event.clientY - y
            })
        }
    }

    const progress ='45%'

    useEffect(()=>{
        if(isDragging){
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        return ()=>{
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    },[isDragging])

    return (
        <div
        className={style.playerContainer} 
        ref={ref} 
        onMouseDown={handleMouseDown}
        style={{
            top: position.x,
            left: position.y
        }}>
            <div className={style.outerDisk}></div>
            <div className={style.progressCircle} style={{ '--progress': progress }}></div>
            <div className={style.innerDisk}></div>
            <div className={style.innerContainer}>
                <div className={style.mainControl}>
                <FontAwesomeIcon icon={faBackwardStep} className={style.controlIcon}/>
                <FontAwesomeIcon icon={faPlay} className={`${style.controlIcon} ${style.controlPlay}` }/>
                <FontAwesomeIcon icon={faForwardStep} className={style.controlIcon}/>
                </div>
                <div className={style.info}>{title}</div>
                
            </div>
        </div>
    )
}
export default Player