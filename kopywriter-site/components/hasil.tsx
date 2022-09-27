interface HasilProps {
  sentence: string;
  prompt: string;
  keywords: string[];
  onBack: any;
}

const Hasil: React.FC<HasilProps> = (props) => {
  const keywordElements = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = <div key={i}>#{props.keywords[i]}</div>;
    keywordElements.push(element);
  }

  return (
    <>
      <div>
        <div>
          <b>Your Products</b>
        </div>
        <div>{props.prompt}</div>
      </div>
      <div>
        <div>
          <b>Sentence</b>
        </div>
        <div>{props.sentence}</div>
      </div>
      <div>
        <div>
          <b>Keywords</b>
        </div>
        <div>{keywordElements}</div>
      </div>
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default Hasil;
