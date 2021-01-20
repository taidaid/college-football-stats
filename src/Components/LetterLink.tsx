import React from "react";
import { Link } from "react-router-dom";

interface Props {
  letter: string;
}

const LetterLink = ({ letter }: Props) => {
  return (
    <Link to={`/${letter}`}>
      <span>{letter}</span>
    </Link>
  );
};

export default LetterLink;
