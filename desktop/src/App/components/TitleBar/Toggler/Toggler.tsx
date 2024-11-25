import { useState } from 'react';
import './Toggler.scss';

export const Toggler = ({onChange}: {onChange?: (checked: boolean) => void}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <input
        onChange={({target: {checked}}) => {
          onChange && onChange(checked);
          setChecked(checked);
        }}
        type="checkbox"
        id="toggler"
        className="hidden"
      />
      <label
        htmlFor="toggler"
        className="label"
      >
        <div className="text-[10px] translate-y-[-10px] opacity-40 translate-x-[5px]">
          {checked && <i className="fa fa-moon absolute"></i>}
          {!checked && <i className="fa fa-sun absolute translate-x-[16px]"></i>}
        </div>
      </label>
    </div>
  )
}