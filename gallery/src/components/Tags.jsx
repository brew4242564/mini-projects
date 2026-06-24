import { getTags } from "../services/catsApi";
import { useState, useEffect } from "react";
export default function Tags({setTag}){
    const [tags, setTags] = useState([]);
    useEffect(()=> {
        async function loadTags(){
            const data = await getTags();
            const cleanTags = data.filter(tag => tag && tag.length >0);
            setTags(cleanTags)
        }

        loadTags();
    },[])
        

    return(
        <div className="tag-wall">
            {tags.map((t)=> (
                <button className="tag-btn" key={t} onClick={()=> setTag(t)}>{t}</button>
            ))}
        </div>
    )
}