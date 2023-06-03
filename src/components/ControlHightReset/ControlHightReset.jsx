import { useEffect } from "react";

export default function ControlHightReset({reset}) {
    useEffect(() => {
            if (window.innerHeight < 650) {
                if(reset.current){
                    reset.current.style.height = "600px";
                }
            } else {
                if(reset.current){
                    reset.current.style.height = "calc(100vh - 126.78px )";
                }
            }
        window.addEventListener("resize", () => {
        if (window.innerHeight < 650) {
            if(reset.current){
                reset.current.style.height = "600px";
            }
        } else {
            if(reset.current){
                reset.current.style.height = "calc(100vh - 126.78px )";
            }
        }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset.current]);
  return null
}
