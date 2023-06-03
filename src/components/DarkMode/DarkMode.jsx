import React from "react";

export default function DarkMode({dark,setDark}) {
  return (
    <div
      className={`${dark && `active`}  ||  mode || position-relative || unselectable`}
      onClick={() => {
        setDark(!dark);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("dark", JSON.stringify({ dark }));
      }}
    >
      <div className="position-absolute  || toggleMode "></div>
      <div className="modeElement">
        <img src="./img/HomeImg/sun.png" alt="" />
      </div>
      <div className="modeElement">
        <img src="./img/HomeImg/moon.png" alt="" />
      </div>
    </div>
  );
}
