import React from "react";

function ShowInvalidCreditianls(props) {
    if(props.hasLoginFailed){
        return <div>Invalid Creditianls</div>
    }
    return null
}
export default ShowInvalidCreditianls