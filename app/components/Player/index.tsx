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
    const coords = useRef<{
        startX: number,
        startY: number,
        lastX: number,
        lastY: number
        }>({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
        })
    const ref = useRef<HTMLDivElement | null>(null)
    const handleMouseDown = (e:MouseEvent) =>{ 
        setIsDragging (true)  
        coords.current.startX = e.clientX
        coords.current.startY = e.clientY             
    }
    const handleMouseUp = () => {
        setIsDragging(false)
        if(ref.current){
            coords.current.lastX = ref.current.offsetLeft
            coords.current.lastY = ref.current.offsetTop
        }
        

    }
    const handleMouseMove = (event:MouseEvent) => {
        if(isDragging && ref.current){        
            const nextX = event.clientX - coords.current.startX + coords.current.lastX;
            const nextY = event.clientY - coords.current.startY + coords.current.lastY;
            ref.current.style.top = `${nextY}px`
            ref.current.style.left = `${nextX}px`
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
        onMouseUp={handleMouseUp}
        >
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