export default function buildSearchEngine(docs) {
    const simpleSearch = (req) => {
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

    const normalizationSearch = (req) => {
        const token = req;
        const re = /\w+/g;
        const term = token.match(re);
        return simpleSearch(term.join(" "));
    };

    return {
        search: {
            ss: simpleSearch(),
            ns: normalizationSearch()
        }
    };
}