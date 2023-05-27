export const validEmail = 'validEmail';
export const requireName = 'requireName';
export const requirePass = 'requirePass';
export const requirePhone = 'requirePhone';
export const invalidPhone = 'invalidPhone';
export const requireEmail = 'requireEmail';
export const notAuth = 'notAuth';
export const userNotFound = 'userNotFound';
export const invalidPass = 'invalidPass';
export const logout = 'logout';

const i18nResources = {
    fa: {
        translation: {
            '11000': 'داده مورد نظر تکراری است',
            'TokenExpiredError': 'اعتبار احراز هویت شما منقضی شده',
            requireName: 'نام اجباری است',
            requirePass: 'رمزعبور اجباری است',
            requirePhone: 'شماره تلفن همراه اجباری است',
            invalidPhone: 'شماره تلفن همراه صحیح نیست',
            requireEmail: 'ایمیل اجباری است',
            invalidEmail: 'ایمیل صحیح نیست',
            notAuth: 'کاربر احراز هویت نشد',
            userNotFound: 'کاربر یافت نشد',
            invalidPass: 'رمزعبور صحیح نیست',
            logout: 'خروج از حساب کاربری انجام شد',
        }
    },
    en: {
        translation: {
            '11000': 'value for this field is duplicated',
            'TokenExpiredError': 'auth token is expired',
            requireName: 'name is required',
            requirePass: 'password is required',
            requirePhone: 'phone number is required',
            invalidPhone: 'phone number is not valid',
            requireEmail: 'email is required',
            invalidEmail: 'email is invalid',
            notAuth: 'user not authorized',
            userNotFound: 'user not found',
            invalidPass: 'password is not correct',
            logout: 'The user account has been logged out',
        }
    }
};
export default i18nResources;