import React from "react";
import Form from "./form";
import Hasil from "./hasil";

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
      <h1>Kopywriter</h1>
      {elemenTerlihat}
    </>
  );
};

export default Kopywriter;
