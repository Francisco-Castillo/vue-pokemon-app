export default {
    methods: {
        sort(a, b) {
            let elementA = a.id;
            let elementB = b.id;
            if (elementA < elementB) return -1;
            if (elementA > elementB) return 1;
            return 0;
        }
    }
}