import {ChangeEventHandler, useState} from "react";

type UseTextField = (initState: string) => [value: string, handler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>];

const useTextfield: UseTextField = (initState) => {
  const [value, setValue] = useState<string>(initState);
  const handler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({currentTarget}) => {
    const {value} = currentTarget;
    setValue(value);
  };

  return [value, handler];
}

export default useTextfield;