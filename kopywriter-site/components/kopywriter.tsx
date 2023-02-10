import React from "react";
import Form from "./form";
import Hasil from "./hasil";
import Image from "next/image";
import logo from "../public/logoipsum.svg";

const Kopywriter: React.FC = () => {
  const CHARACTER_LIMIT: number = 32;
  const ENDPOINT_IND: string =
    "https://xmbqbxjvyc.execute-api.ap-southeast-1.amazonaws.com/prod/generate_copywrite_dan_keywords";
  const ENDPOINT_ENG: string = `https://k7hs8a7bp7.execute-api.us-east-1.amazonaws.com/prod/generate_copywrite_dan_keywords`;
  const [prompt, setPrompt] = React.useState("");
  const [sentence, setSentence] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasHasil, setHasHasil] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [language, setLanguage] = React.useState("IND");

  //   console.log("Language:", language);

  const onSubmit = () => {
    console.log("Submitting:" + prompt);
    setIsLoading(true);

    if (language === "ENG") {
      fetch(`${ENDPOINT_ENG}?prompt=${prompt}`)
        .then((res) => res.json())
        .then(onHasil);
    } else if (language == "IND") {
      fetch(`${ENDPOINT_IND}?prompt=${prompt}`)
        .then((res) => res.json())
        .then(onHasil);
    }
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
        language={language}
      />
    );
  }

  return (
    <>
      <div className="h-screen flex">
        <div className="max-w-md m-auto p-2">
          <div className="bg-slate-600 p-5 rounded-md text-white">
            <div className="flex row-auto items-center justify-end">
              <div className="col-auto mr-2">
                <button
                  className={`px-4 py-2 rounded-md text-lg font-medium ${
                    language === "IND"
                      ? "bg-teal-400 text-white active"
                      : "bg-gray-300 text-slate-800 inactive"
                  }`}
                  onClick={() => setLanguage("IND")}
                >
                  🇮🇩
                </button>
              </div>
              <div className="col-auto">
                <button
                  className={`px-4 py-2 rounded-md text-lg font-medium ${
                    language === "ENG"
                      ? "bg-teal-400 text-white active"
                      : "bg-gray-300 text-slate-800 inactive"
                  }`}
                  onClick={() => setLanguage("ENG")}
                >
                  🇬🇧
                </button>
              </div>
            </div>
            <div className="text-center my-5">
              <Image alt="" src={logo} width={64} height={64} />
              <h1 className=" text-3xl text-white font-light mt-4">
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
