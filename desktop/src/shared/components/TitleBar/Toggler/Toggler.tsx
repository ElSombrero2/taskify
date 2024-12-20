import { useState } from 'react';
import './Toggler.scss';

export const Toggler = ({onChange, defaultValue}: {onChange?: (checked: boolean) => void, defaultValue?: boolean}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <input
        onChange={({target: {checked}}) => {
          onChange && onChange(checked);
          setChecked(checked);
        }}
        defaultChecked={defaultValue}
        type="checkbox"
        id="toggler"
        className="hidden"
      />
      <label
        htmlFor="toggler"
        className="label"
      >
        <div className="text-[10px] translate-y-[-10px] opacity-80 translate-x-[5px]">
          {checked && <i className="fa fa-moon absolute"></i>}
          {!checked && <i className="fa fa-sun absolute translate-x-[16px]"></i>}
        </div>
      </label>
    </div>
  )
}