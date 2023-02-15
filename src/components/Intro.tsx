import { TextScramble } from "@a7sc11u/scramble";
import { useRef } from "react";

type Props = {
  setConsent: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Intro({ setConsent }: Props) {
  const ref = useRef<HTMLDivElement>(null)!;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center text-2xl font-extrabold max-w-2xl space-y-5">
        <TextScramble
          as="h1"
          className="leading-loose"
          ref={ref}
          play={true}
          text="The future is around us. You just have to look."
        />
        <button
          onClick={() => {
            if (setConsent) setConsent(true);
          }}
          className="lowercase rounded-md text-sm text-purple-500 hover:text-purple-900 duration-200"
        >
          Begin
        </button>
      </div>
    </div>
  );
}
