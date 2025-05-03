export const TagPlugin = (elem: any) => {
  if (elem?.type === 'element' && elem?.tagName === 'strong') {
    const firstChild = elem?.children[0];
    if (firstChild?.type === 'text' && firstChild?.value?.startsWith('#')) {
        elem.properties = {
          class: 'underline font-bold text-blue-400',
        }
        return elem;
    }
  }
}