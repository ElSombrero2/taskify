
export const LinkPlugin = (elem: any) => {
  if(elem.tagName === 'a') {
    const url = elem.properties.href;
    elem.tagName = "span";
    elem.properties = {
      class: 'underline font-bold',
      title: url,
    }
    return elem;
  }
}