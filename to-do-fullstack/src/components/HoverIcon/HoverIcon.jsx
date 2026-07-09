import { useState } from "react";

export function HoverIcon ({ default: Default, hovered: Hovered, defaultProps = {}, hoveredProps={} }){
    const [isHovered, setIsHovered] = useState(false)

    return (
        <span
        onMouseEnter={()=> setIsHovered(true)}
        onMouseLeave={()=> setIsHovered(false)}>
        
            {isHovered ? <Hovered {...hoveredProps}/> : <Default {...defaultProps}/>}
        </span>
    )
}