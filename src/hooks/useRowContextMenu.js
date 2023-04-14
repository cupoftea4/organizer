import { useState, useEffect } from "react";

function useRowContextMenu() {
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const onContextMenu = (e, rowId) => {
    e.preventDefault();
    const position = { x: e.pageX, y: e.pageY };
    setContextMenu({position, rowId});
  };

  return [contextMenu, onContextMenu];
};

export default useRowContextMenu;