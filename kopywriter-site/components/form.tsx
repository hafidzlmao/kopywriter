import { text } from "stream/consumers";

interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length < props.characterLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  let statusWarna = "text-slate-300";
  let statusTeks = null;
  if (!isPromptValid) {
    statusWarna = "text-red-400";
    statusTeks = "Input must be under 32 characters";
  }

  return (
    <>
      <div className="mb-6 text-slate-300">
        <p>
          Tell us what is your product about, I will generate copywrited
          sentence and similar Keywords for you!
        </p>
      </div>

      <input
        className="p-2 w-full rounded-md focus:outline-teal-500 focus:outline text-slate-800"
        type="text"
        placeholder="beef burger"
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div className={statusWarna + " flex justify-between my-2 text-sm mb-6"}>
        <div>{statusTeks}</div>
        <div className="">
          {props.prompt.length}/{props.characterLimit}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 
        to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}
      >
        Submit
      </button>
    </>
  );
};

export default Form;
