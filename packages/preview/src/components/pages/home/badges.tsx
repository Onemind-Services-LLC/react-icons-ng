import React from "react";

function Badges() {
  return (
    <p>
      <a
        href="https://github.com/Onemind-Services-LLC/react-icons-ng/pkgs/npm/react-icons-ng"
        rel="noreferrer"
        target="_blank"
      >
        <img
          src="https://img.shields.io/github/lerna-json/v/Onemind-Services-LLC/react-icons-ng/master?label=react-icons-ng"
          alt="react-icons-ng version"
        />
      </a>
      &emsp;
      <a
        href="https://github.com/Onemind-Services-LLC/react-icons-ng/pkgs/npm/react-icons-ng-pack"
        rel="noreferrer"
        target="_blank"
      >
        <img
          src="https://img.shields.io/github/lerna-json/v/Onemind-Services-LLC/react-icons-ng/master?label=react-icons-ng-pack"
          alt="react-icons-ng-pack version"
        />
      </a>
    </p>
  );
}

export default Badges;
