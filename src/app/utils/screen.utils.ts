export default {
    isMobile: () => {
        const width = window.innerWidth;
        const mobileMaxWidth = 767;

        return width <= mobileMaxWidth;
    }
};
