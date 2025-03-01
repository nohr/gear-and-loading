import { useGameStore } from "state/game";
import { useModelStore } from "state/model";
import { useUIStore } from "state/ui";
import { motion } from "framer-motion";
import ModalButtons from "./ModalButtons";

function OptionsButton({
  label,
  label2,
  func,
  toggle,
  command,
}: {
  label: JSX.Element;
  label2: JSX.Element;
  func: () => void;
  toggle: boolean;
  command: string;
}): JSX.Element {
  return (
    <div className="flex !select-none flex-col items-center">
      <motion.div
        className="hover cursor-pointer rounded-lg bg-blue-500 bg-opacity-25 px-2 py-1 font-bold hover:bg-red-500 hover:bg-opacity-25 hover:text-red-500 dark:bg-gray-500 dark:bg-opacity-25 dark:hover:bg-lime-500 dark:hover:bg-opacity-25 hover:dark:text-lime-500"
        onClick={func}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {toggle ? label2 : label}
      </motion.div>
      <p className="text-xs">{`( ${command} )`}</p>
    </div>
  );
}
export default function Options() {
  const [playing, started, start, stop, setPlay] = useGameStore((state) => [
    state.playing,
    state.started,
    state.start,
    state.stop,
    state.setPlay,
  ]);
  const [setSelfie, selfie] = useModelStore((state) => [
    state.setSelfie,
    state.selfie,
    state.kill_holistic,
    state.stop_input,
  ]);
  const [fullscreen, setFullscreen, setStatus] = useUIStore((state) => [
    state.fullscreen,
    state.setFullscreen,
    state.setStatus,
  ]);

  const optionsArray = [
    {
      label: <>Laptop</>,
      label2: <>External</>,
      func: () => {
        if (started) stop(setStatus);
        setSelfie();
        setStatus(
          <span>
            using <b>{selfie ? "Laptop" : "External"}</b> camera
          </span>,
        );
      },
      toggle: selfie,
      command: "L",
    },
    {
      label: <>Fullscreen</>,
      label2: <>Windowed</>,
      func: () => setFullscreen(),
      toggle: fullscreen,
      command: "F",
    },
    {
      label: <>Start</>,
      label2: <>Stop</>,
      func: () => {
        started ? stop(setStatus) : start(setStatus);
      },
      toggle: started,
      command: "S",
    },
    {
      label: <>Resume</>,
      label2: <>Pause</>,
      func: () => setPlay(),
      toggle: playing,
      command: "Space",
    },
  ];

  return (
    <div className="flex select-none flex-row gap-x-4">
      <ModalButtons />
      <OptionsButton {...optionsArray[0]} />
      <OptionsButton {...optionsArray[1]} />
      <OptionsButton {...optionsArray[2]} />
      {started ? <OptionsButton {...optionsArray[3]} /> : null}
    </div>
  );
}
