
export const Load = (plugins: ((elem: any) => any)[]) => {
    return () => (node: any) => {
        const list = [node];
        while (list.length) {
            const obj = list.pop();
            if (obj.children) {
                for (let elem of obj.children) {
                    for (const plugin of plugins) {
                        const result = plugin(elem);
                        if (result) {
                            elem =  { ...result }
                        }
                    }
                    list.push(elem);
                }
            }
        }
        return node;
    }   
}