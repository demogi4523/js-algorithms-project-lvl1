export default function buildSearchEngine(docs) {
    const search = (req) => {
        const inside = docs.filter((item) => item.indexOf(req) !== -1);
        return inside.map((item) => {
            let includesInDoc = {
                doc: item,
                includes: []
            };
            let i = 0;
            while (item.text.indexOf(req, i) !== -1) {
                let i = item.text.indexOf(req, i);
                includesInDoc.includes.push(i);
            }
            return includesInDoc;
        });
    };
    return {
        search
    }
}