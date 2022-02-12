import React from "react";
import Image from "next/image";
import SyncLoader from "react-spinners/SyncLoader";
import classes from "./Loading.module.css";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <div className={classes.logo}>
          <Image
            src="/images/whatsapp-logo.png"
            alt=""
            width="200"
            height="200"
          />
        </div>
        <SyncLoader color="#25D366" speedMultiplier={0.7} />
      </div>
    </center>
  );
}

export default Loading;
