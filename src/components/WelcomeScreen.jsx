import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import PixelButton from "./PixelButton";
import { useSound } from "../hooks/useSound";

const CHARACTERS = [
  { id: "witch", name: "Witch", folder: "witch" },
  { id: "knight", name: "Knight", folder: "knight" },
  { id: "ice-golem", name: "Ice Golem", folder: "ice-golem" },
];

const WelcomeScreen = ({ onStart }) => {
  const { playSound } = useSound();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [confirmedCharacter, setConfirmedCharacter] = useState(null);
  const videoRefs = useRef({});

  // Determine which scene to show for each character
  const getSceneForCharacter = (charId) => {
    if (confirmedCharacter === charId) return "scene3";
    if (selectedCharacter === charId || hoveredCharacter === charId) return "scene2";
    return "scene1";
  };

  const handleCharacterHover = (charId) => {
    setHoveredCharacter(charId);
  };

  const handleCharacterLeave = () => {
    setHoveredCharacter(null);
  };

  const handleCharacterClick = (charId) => {
    setSelectedCharacter(charId);
    playSound("select");
  };

  const handleProceed = () => {
    if (!selectedCharacter) return;
    setShowNamePopup(true);
  };

  const handleNameSubmit = () => {
    if (!playerName.trim()) return;
    setShowNamePopup(false);
    setConfirmedCharacter(selectedCharacter);
    playSound("start");

    // Play scene3 and then transition
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onStart({ character: selectedCharacter, playerName: playerName.trim() });
      }, 600);
    }, 1500);
  };

  const handleStart = () => {
    if (!selectedCharacter) {
      // If no character selected, prompt to select
      return;
    }
    handleProceed();
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center main-screen-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
    >
      {/* Transition Flash Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white pointer-events-none"
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Name Entry Popup */}
      <AnimatePresence>
        {showNamePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white border-4 border-[#0066B2] p-6 shadow-[8px_8px_0_rgba(0,102,178,0.2)] max-w-sm w-full mx-4"
            >
              <h2 className="font-pixel text-lg text-[#0066B2] mb-4 text-center uppercase">
                Enter Your Name
              </h2>
              <p className="text-slate-500 text-sm mb-4 text-center">
                What should we call you, brave adventurer?
              </p>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Your name..."
                className="w-full px-4 py-3 border-2 border-[#0066B2] text-center font-sans text-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNamePopup(false)}
                  className="flex-1 py-3 border-2 border-slate-300 text-slate-600 font-bold uppercase tracking-wide hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNameSubmit}
                  disabled={!playerName.trim()}
                  className={`flex-1 py-3 bg-[#FF6600] text-white font-bold uppercase tracking-wide shadow-[0_4px_0_#993D00] active:translate-y-[2px] active:shadow-[0_2px_0_#993D00] transition-all ${
                    !playerName.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-[#E65C00]"
                  }`}
                >
                  Start Quest
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Themed Card - Glass effect on mobile */}
      <div className="relative sm:pixel-borders bg-white/80 backdrop-blur-md sm:bg-white sm:backdrop-blur-none border-4 border-[#0066B2] w-full h-full sm:h-auto sm:max-w-md sm:min-h-[600px] shadow-[12px_12px_0_rgba(0,102,178,0.1)] p-6 py-6 flex flex-col justify-between overflow-hidden">
        <div className="relative z-10 text-center flex-1 flex flex-col items-center justify-between h-full">
          {/* Top Content Group */}
          <div className="w-full flex flex-col items-center">
            {/* Logo Section */}
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                }}
                className="p-1 px-4 bg-white border-2 border-slate-100 shadow-sm"
              >
                <img
                  src="/bajaj_life.png"
                  alt="Bajaj Life"
                  className="w-24 sm:w-32 h-auto"
                />
              </motion.div>
            </div>

            {/* Professional Header Style */}
            <div className="mb-4 flex-shrink-0">
              <motion.h1 className="font-pixel text-xl sm:text-2xl text-[#0066B2] mb-1 leading-tight uppercase font-bold">
                LIFE GOALS QUEST
              </motion.h1>
              <p className="text-slate-500 font-sans text-xs sm:text-sm font-medium">
                Choose your character to begin.
              </p>
            </div>

            {/* Game Theme Accent */}
            <motion.p
              className="font-pixel text-[#FF6600] text-[10px] sm:text-xs mb-2 tracking-[0.2em] uppercase font-bold"
              animate={
                isTransitioning
                  ? { scale: [1, 1.2, 1] }
                  : { opacity: [0.6, 1, 0.6] }
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              SELECT YOUR HERO
            </motion.p>
          </div>

          {/* Character Selection Area with Carpet Background */}
          <div 
            className="w-full p-4 border-2 border-[#0066B2] my-4 relative overflow-hidden"
            style={{
              backgroundImage: "url('/assets/backgrounds/carpet.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Semi-transparent overlay for better visibility */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Characters Flexbox */}
            <div className="relative z-10 flex justify-center items-end gap-4 sm:gap-6 py-4">
              {CHARACTERS.map((char) => {
                const scene = getSceneForCharacter(char.id);
                const isSelected = selectedCharacter === char.id;
                
                return (
                  <motion.div
                    key={char.id}
                    className="flex flex-col items-center cursor-pointer"
                    onMouseEnter={() => handleCharacterHover(char.id)}
                    onMouseLeave={handleCharacterLeave}
                    onClick={() => handleCharacterClick(char.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Selection Pointer */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-2"
                        >
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="text-[#FF6600] text-2xl font-bold drop-shadow-lg"
                          >
                            ▼
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Character Video Container */}
                    <div 
                      className={`relative w-20 h-24 sm:w-24 sm:h-28 overflow-hidden rounded-lg transition-all duration-300 ${
                        isSelected 
                          ? "ring-4 ring-[#FF6600] ring-offset-2 shadow-lg shadow-orange-500/30" 
                          : "ring-2 ring-white/50"
                      }`}
                    >
                      <video
                        ref={(el) => (videoRefs.current[char.id] = el)}
                        key={`${char.id}-${scene}`}
                        src={`/assets/characters/${char.folder}/${scene}.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Character Name */}
                    <p className={`mt-2 font-pixel text-[8px] sm:text-[10px] uppercase tracking-wide ${
                      isSelected ? "text-[#FF6600]" : "text-white"
                    } drop-shadow-md`}>
                      {char.name}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Orange 'Proceed' Style Button - 3D Effect */}
          <div className="w-full flex-shrink-0 pt-2 sm:pt-4 max-w-lg">
            <PixelButton
              onClick={handleStart}
              disabled={isTransitioning || !selectedCharacter}
              className={`w-full py-4 bg-[#FF6600] hover:bg-[#E65C00] text-white font-sans font-extrabold text-base sm:text-lg border-none shadow-[0_6px_0_#993D00] active:translate-y-[2px] active:shadow-[0_4px_0_#993D00] transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-4 ${
                isTransitioning || !selectedCharacter ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span>►</span>
              <span>
                {isTransitioning 
                  ? "LOADING..." 
                  : selectedCharacter 
                    ? "START QUEST" 
                    : "SELECT A CHARACTER"}
              </span>
              <span>◄</span>
            </PixelButton>

            {/* Professional Subtext */}
            <p className="mt-4 text-[8px] sm:text-[10px] text-slate-400 font-sans uppercase tracking-[0.1em] text-center font-medium">
              Quest data is secured & private
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
