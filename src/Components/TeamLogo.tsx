import React, { useEffect, useState } from "react";
import ncaaLogo from "../assets/ncaa-4-logo-png-transparent-150-150.png";

interface Props {
  logos: string[];
  dark?: boolean;
}

const TeamLogo = ({ logos, dark }: Props) => {
  const [imgSource, setImgSource] = useState<string>("");
  const [errored, setErrored] = useState<boolean>(false);
  const setFallbackSource = () => {
    if (!errored) {
      setErrored(true);
      setImgSource(ncaaLogo);
    }
  };

  useEffect(() => {
    if (logos) {
      setImgSource(dark ? logos[1] : logos[0]);
    }
  }, [dark, logos]);
  if (logos) {
    return (
      <span>
        <img
          src={imgSource}
          onError={setFallbackSource}
          style={{ width: "100%" }}
          alt="team logo"
        ></img>
      </span>
    );
  } else {
    return (
      <span>
        <img src={ncaaLogo} style={{ width: "100%" }} alt="team logo"></img>
      </span>
    );
  }
};

export default TeamLogo;
