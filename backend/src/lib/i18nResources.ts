export const validEmail = 'validEmail';
export const requireName = 'requireName';
export const requirePass = 'requirePass';
export const requirePhone = 'requirePhone';
export const requireEmail = 'requireEmail';
export const notAuth = 'notAuth';
export const userNotFound = 'userNotFound';
export const invalidPass = 'invalidPass';

const i18nResources = {
    fa: {
        translation: {
            '11000': 'داده مورد نظر تکراری است',
            requireName: 'نام اجباری است',
            requirePass: 'رمزعبور اجباری است',
            requirePhone: 'شماره تلفن همراه اجباری است',
            requireEmail: 'ایمیل اجباری است',
            invalidEmail: 'ایمیل صحیح نیست',
            notAuth: 'کاربر احراز هویت نشد',
            userNotFound: 'کاربر یافت نشد',
            invalidPass: 'رمزعبور صحیح نیست'
        }
    },
    en: {
        translation: {
            '11000': 'value for this field is duplicated',
            requireName: 'name is required',
            requirePass: 'password is required',
            requirePhone: 'phone number is required',
            requireEmail: 'email is required',
            invalidEmail: 'email is invalid',
            notAuth: 'user not authorized',
            userNotFound: 'user not found',
            invalidPass: 'password is not correct'
        }
    }
};
export default i18nResources;