import { useEffect } from 'react'

export default function ControlHightTableRes({resReset}) {
    useEffect(() => {
        if (window.innerHeight < 650) {
            if(resReset.current){
                resReset.current.style.maxHeight  = `150px`
                resReset.current.style.height  = `150px`
            }
            
        } else {
            if(resReset.current){
                resReset.current.style.maxHeight  = `calc(100vh - 70.16px - 6.5rem - 100px - 180px - 150px)`
                resReset.current.style.height  = `calc(100vh - 70.16px - 6.5rem - 100px - 180px - 150px)`
            }
        }
        window.addEventListener("resize", () => {
            if (window.innerHeight < 650) {
                if(resReset.current){
                    resReset.current.style.maxHeight  = `150px`
                    resReset.current.style.height  = `150px`
                }
                
            } else {
                if(resReset.current){
                    resReset.current.style.maxHeight  = `calc(100vh - 70.16px - 6.5rem - 100px - 180px - 150px)`
                    resReset.current.style.height  = `calc(100vh - 70.16px - 6.5rem - 100px - 180px - 150px)`
                }
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resReset.current]);
  return null
}
