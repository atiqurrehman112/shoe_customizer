import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { ColorPicker, FilePicker, Tab, CustomButton } from "../components";
import PlugDevRev from "../components/PlugDevRev";
import ShoeSelector from "../components/ShoeSelector";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShoe: true,
    stylishShoe: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "filepicker":
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        );

      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShoe":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;

      case "stylishShoe":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  const proceedToOrder = () => {
    const canvas = document.querySelector("canvas");

    if (canvas) {
      const image = canvas.toDataURL("image/png");
      state.designImage = image;
    }

    state.orderPage = true;
  };

  const saveDesign = async () => {
    const canvas = document.querySelector("canvas");

    if (!state.currentUser) {
      alert("Please login first to save your design.");
      state.authPage = true;
      return;
    }

    if (canvas) {
      const image = canvas.toDataURL("image/png");

      try {
        await fetch("http://localhost:5000/api/orders/save-design", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: state.currentUser?.id,
            designImage: image,
            selectedColors: snap.items,
            logoDecal: snap.logoDecal,
            fullDecal: snap.fullDecal,
          }),
        });

        alert("Design saved successfully!");
      } catch (error) {
        console.log("Save design error:", error);
      }
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <ShoeSelector />
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <ColorPicker />

            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-5 right-5 z-10 flex gap-3"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Save Design"
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={saveDesign}
            />

            <CustomButton
              type="filled"
              title="Download Design"
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={downloadCanvasToImage}
            />

            <CustomButton
              type="filled"
              title="Proceed Order"
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={proceedToOrder}
            />

            <CustomButton
              type="filled"
              title="Go Back"
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={() => (state.intro = true)}
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilteredTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>

          <motion.div>
            <PlugDevRev />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;