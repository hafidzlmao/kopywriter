import React from "react";
import Form from "./form";
import Hasil from "./hasil";
import Image from "next/image";
import logo from "../public/logoipsum.svg";

const Kopywriter: React.FC = () => {
  const CHARACTER_LIMIT: number = 32;
  const ENDPOINT: string = `https://6brzxjenv7.execute-api.us-west-1.amazonaws.com/prod/generate_copywrite_dan_keywords`;
  const [prompt, setPrompt] = React.useState("");
  const [sentence, setSentence] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasHasil, setHasHasil] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting:" + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onHasil);
  };

  const onHasil = (data: any) => {
    setSentence(data.sentence);
    setKeywords(data.keywords);
    setHasHasil(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt("");
    setHasHasil(false);
    setIsLoading(false);
  };

  let elemenTerlihat = null;

  if (hasHasil) {
    elemenTerlihat = (
      <Hasil
        sentence={sentence}
        keywords={keywords}
        onBack={onReset}
        prompt={prompt}
        onSubmit={onSubmit}
        setPrompt={prompt}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    );
  } else {
    elemenTerlihat = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    );
  }

  return (
    <>
      <div className="h-screen flex">
        <div className="max-w-md m-auto p-2">
          <div className="bg-slate-600 p-5 rounded-md text-white">
            <div className="text-center my-5">
              <Image src={logo} width={64} height={64} />
              <h1 className=" text-3xl text-white font-light mt-4S">
                Kopywriter
              </h1>
              <div>AI Generated Copywriting and Keywords</div>
            </div>
            {elemenTerlihat}
          </div>
        </div>
      </div>
    </>
  );
};

export default Kopywriter;
