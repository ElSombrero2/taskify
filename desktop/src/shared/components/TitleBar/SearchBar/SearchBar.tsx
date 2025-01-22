import clsx from 'clsx';
import './SearchBar.scss';
import { ChangeEvent, useRef, useState } from 'react';

type SearchBarProps = {
  words: string[],
  className?: string,
}

export const SearchBar = ({words, className}: SearchBarProps) => {
  const [showed, setShowed] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const toggle = () => setShowed(!showed);
  const input = useRef<HTMLInputElement>(null);

  const filter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value?.length) setFiltered(words.filter((w) => w.includes(value.toLowerCase())));
    else setFiltered([]);
  }

  const select = (word: string) => {
    if (input.current) input.current.value = word;
    setFiltered([]);
  }

  return (
    <div className={className}>
      <div
        className={clsx(
          'fixed w-full h-full left-0 top-0',
          !showed && 'hidden'
        )}
        onClick={toggle}
      ></div>
      <button onClick={toggle} className="search-button w-[420px]">
        <p className="opacity-50 flex gap-2 items-center">
          <i className="fa fa-search text-xs"></i>
          <span>Search</span>
        </p>
      </button>
      <div className={clsx(
        'flex flex-col absolute w-[450px] translate-x-[-15px] translate-y-[-25px] p-2',
        'input-wrapper rounded-md border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-800 shadow-lg gap-2 text-xs',
        !showed && 'hidden'
      )}>
        <input
          ref={input}
          onChange={filter}
          placeholder="Search"
          type="text"
          className="w-full rounded-sm dark:bg-gray-700 bg-gray-100 px-2 text-xs py-1 focus-within:outline-none"
        />
        <div className={clsx('auto-complete', !filtered.length && 'hidden')}>
          {filtered.map((word, index) => 
            <button key={`key-${index}`} className="item" onClick={() => select(word)}>
              {word}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}