export default {
    hasText: (str) => {
        if (typeof str === 'undefined' || str == null || str === '') {
            return false;
        }
        else {
            return true;
        }
    }
};
