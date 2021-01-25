import React, { useEffect, useState } from "react";
import ncaaLogo from "../assets/ncaa-4-logo-png-transparent.png";

interface Props {
  logos: string[];
  dark?: boolean;
}

const TeamLogo = ({ logos, dark }: Props) => {
  const [imgSource, setImgSource] = useState<string>("");
  const [loadedStyles, setLoadedStyles] = useState<{ [key: string]: any }>({});
  const [errored, setErrored] = useState<boolean>(false);
  const setFallbackSource = () => {
    if (!errored) {
      setErrored(true);
      setImgSource(ncaaLogo);
    }
  };

  const handleImagedLoaded = () => {
    setLoadedStyles({
      opacity: "1",
      transitionProperty: "opacity",
      transitionDuration: ".2s",
      transitionTimingFunction: "ease-in",
    });
  };

  const initialContainerStyles: {
    position: "relative";
    [key: string]: string | number;
  } = {
    position: "relative",
    width: "100%",
    opacity: 0,
    paddingBottom: "100%",
  };

  useEffect(() => {
    if (logos) {
      setImgSource(dark ? logos[1] : logos[0]);
    }
  }, [dark, logos]);

  return (
    <div style={Object.assign({}, initialContainerStyles, loadedStyles)}>
      <img
        src={imgSource}
        onError={setFallbackSource}
        onLoad={handleImagedLoaded}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
        alt="team logo"
      ></img>
    </div>
  );
};

export default TeamLogo;
