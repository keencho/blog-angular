export default {
    hasText: (str) => {
        return !(typeof str === 'undefined' || str == null || str === '');
    }
};
