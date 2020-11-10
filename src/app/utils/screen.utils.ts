import ObjectUtils from './object.utils';

export default {
    isMobile: () => {
        const width = window.innerWidth;
        const mobileMaxWidth = 767;

        return width <= mobileMaxWidth;
    },

    /*
    * isVisible
    * infinite scroll 구현시 사용
    * @param: last element*/
    isVisible: (element) => {
        if (element !== undefined) {
            const rect = element.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

            return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
        } else {
            return false;
        }
    }
};
