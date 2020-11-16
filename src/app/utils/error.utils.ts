import {CustomError} from '../models/error';

export default {
    initCustomError: (location, msg, param) => {
        const error: CustomError = {
            location,
            msg,
            param
        };
        return error;
    },
};
