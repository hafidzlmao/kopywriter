interface HasilProps {
  sentence: string;
  prompt: string;
  setPrompt: any;
  keywords: string[];
  onBack: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Hasil: React.FC<HasilProps> = (props) => {
  const keywordElements = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = (
      <div
        className="bg-green-700 p-1 text-green-200 px-2 text-sm rounded-md"
        key={i}
      >
        #{props.keywords[i]}
      </div>
    );
    keywordElements.push(element);
  }

  const isPromptValid = props.prompt.length < props.characterLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  const keywordContainer = (
    <div className="flex flex-wrap gap-2">{keywordElements}</div>
  );

  const hasilSection = (label: string, body: any) => {
    return (
      <div className="bg-slate-700 p-4 my-2 rounded-md">
        <div className="text-sm text-slate-300 font-bold mb-3">{label}</div>
        <div>{body}</div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-5">
        {hasilSection(
          "Your Product",
          <div className="text-xl font-bold">{props.prompt}</div>
        )}
        {hasilSection("Sentence", props.sentence)}
        {hasilSection("Keywords", keywordContainer)}
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 
        to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg mb-3"
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}
      >
        Regenerate
      </button>
      <button
        className="bg-gradient-to-r from-teal-400 
        to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onBack}
      >
        Back
      </button>
    </>
  );
};

export default Hasil;
