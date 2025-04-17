export const TagPlugin = () => (node: any) => {
    const list = [node];
    while (list.length) {
      const obj = list.pop();
      if (obj.children) {
        for (const elem of obj.children) {
          if (elem?.type === 'element' && elem?.tagName === 'strong') {
            const firstChild = elem?.children[0];
            if (firstChild?.type === 'text' && firstChild?.value?.startsWith('#')) {
                elem.properties = {
                    class: 'underline font-bold text-blue-400',
                }
            }
          }
          
          list.push(elem);
        }
      }
    }
    return node;
  }