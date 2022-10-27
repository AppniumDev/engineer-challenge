import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <h1
      className="flex justify-start mb-2 text-3xl font-bold text-gray-900"
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
    >
      Policies
    </h1>
  );
};

export { Header };
