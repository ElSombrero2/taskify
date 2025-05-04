import { useRef } from 'react';
import { Button } from '../../../../../../../ui/components/Buttons/Button/Button'
import { Dropdown } from '../../../../../../../ui/components/Dropdown/Dropdown'
import { Divider } from '../../../../../../../ui/components/Separators/Divider/Divider';
import { Item } from '../Item/Item';
import { useField } from './hooks/field';
import { useSort } from './hooks/sort';
import { useFilter } from '../../../../../../../store/filters/filters';
import { useToggler } from '../../../../../../../hooks/toggler';
import './Sort.scss'

/*
  [READY]: Analyze and refactoring
  Make a refactoring for this Sort component
  #task #low
*/
export const Sort = () => {
  const { toggle, hide, open } = useToggler(false);
  const { fields } = useField();
  const { sort: sortList } = useSort();
  const { field, sort, setSort } = useFilter();
  const form = useRef<HTMLFormElement>(null);

  const onSort = () => {
    if (form) {
      const currentForm = form.current;
      const field = (currentForm?.elements.namedItem('field') as RadioNodeList).value;
      const sort = (currentForm?.elements.namedItem('sort') as RadioNodeList).value as 'DESC' | 'ASC';

      setSort(field, sort);
    }
  }

  return (
    <Dropdown open={open}
      onClickOutside={hide}
      size="sm"
      position="left"
      button={<Button
        className="w-[160px]"
        size="sm"
        onClick={toggle}
        theme="secondary">
        {sort === 'ASC' ? <i className="fa-solid fa-arrow-down-short-wide"></i> : <i className="fa-solid fa-arrow-up-short-wide"></i>}
        <p className="truncate w-full h-[18px] text-left">
          {'Sort by : '}
          <strong>{field}</strong>
        </p>
      </Button>}
    >
      <form ref={form} className="flex flex-col gap-1">
        {fields.map((f) => (
            <Item onChange={onSort}
              key={`checkbox-${f.value}`}
              type='radio'
              checked={f.value === field}
              name="field"
              value={f.value}
            >
              <span>{f.label}</span>
            </Item>
        ))}
        <Divider />
        {sortList.map((s) => (
          <Item onChange={onSort}
            key={`checkbox-${s.value}`}
            type='radio'
            checked={s.value === sort}
            name="sort"
            value={s.value}
          >
            <span>{s.label}</span>
          </Item>
        ))}
      </form>
    </Dropdown>
  )
}