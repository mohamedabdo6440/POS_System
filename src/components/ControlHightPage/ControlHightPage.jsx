import { useEffect } from "react";

export default function ControlHightPage({row}) {
    useEffect(() => {
        if (window.innerHeight < 650) {
            if(row.current){
                row.current.style.minHeight = "600px";
            }
            
        } else {
            if(row.current){
                row.current.style.minHeight = "auto";
            }
        }
        window.addEventListener("resize", () => {
        if (window.innerHeight < 650) {
            if(row.current){
                row.current.style.minHeight = "600px";
            }
        } else {
            if(row.current){
                row.current.style.minHeight = "auto";
            }
        }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row.current]);
  return null
}
