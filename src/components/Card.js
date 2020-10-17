import React from 'react';


const Card = ({ data }) => {
    if (data) {
        const { mission_name = "NA", flight_number = "NA", mission_id = "NA", launch_year = "NA", land_success = "NA", launch_success = "NA", links } = data;
        // console.log("******data : ", data);

        return (
            <div className="card">
                <img alt="" src={links.mission_patch ? links.mission_patch : ""} />
                <div style={{ margin: "15px 0", color: "darkblue" }}>
                    <b>{mission_name} # {flight_number}</b>
                </div>

                <div className="">
                    <b>Mission Ids: </b>{mission_id.toString()}
                </div>

                <div className="">
                    <b>Launch Year: </b>{launch_year}
                </div>

                <div className="">
                    <b>SuccessFul Launch: </b>{launch_success.toString()}
                </div>

                <div className="">
                    <b>SuccessFul Landing: </b>{land_success.toString()}
                </div>
            </div>
        );
    }

}

export default Card;