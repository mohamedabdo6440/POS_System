import { useEffect } from 'react'

export default function ControlHightBodyTable({tableProductControl}) {
    useEffect(() => {
        if (window.innerHeight < 650) {
            if (window.innerHeight < 650) {
                if(tableProductControl.current){
                    if(!tableProductControl.current.classList.contains("heightEdit")){
                        tableProductControl.current.classList.add("heightEdit")
                }
                }
                
            } else {
                if(tableProductControl.current){
                    if(tableProductControl.current.classList.contains("heightEdit")){
                        tableProductControl.current.classList.remove("heightEdit")
                    }
                }
            }
        }
        window.addEventListener("resize", () => {
        if (window.innerHeight < 650) {
            if(tableProductControl.current){
                if(!tableProductControl.current.classList.contains("heightEdit")){
                    tableProductControl.current.classList.add("heightEdit")
            }
            }
            
        } else {
            if(tableProductControl.current){
                if(tableProductControl.current.classList.contains("heightEdit")){
                    tableProductControl.current.classList.remove("heightEdit")
                }
            }
        }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableProductControl.current])
  return null
}
