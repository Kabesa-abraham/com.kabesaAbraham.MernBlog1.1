import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () =>{ //cette fonction va me permettre de scroll au top
    const {pathname} = useLocation();
    useEffect(() =>{
        window.scrollTo(0, 0);
    },[pathname])

    return null
}
export default ScrollToTop