
export const LinkPlugin = () => (node: any) => {
  const list = [node];
  while (list.length) {
    const obj = list.pop();
    if (obj.children) {
      for (const elem of obj.children) {
        if(elem.tagName === 'a') {
          const url = elem.properties.href;
          elem.tagName = "span";
          elem.properties = {
            class: 'underline font-bold',
            title: url,
          }
        }
        list.push(elem);
      }
    }
  }
  return node;
}