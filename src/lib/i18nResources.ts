import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware/cjs';
import FilesystemBackend from 'i18next-node-fs-backend';
import sprintf from 'i18next-sprintf-postprocessor';

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
export const requireTitle = 'requireTitle';
export const requireID = 'requireID';
export const requireDesc = 'requireDesc';
export const requireAbstract = 'requireAbstract';
export const notFound = 'notFound';
export const accessDenied = 'accessDenied';
export const onlyAcceptImage = 'onlyAcceptImage';
export const requireFile = 'requireFile';
export const requireMSG = 'requireMSG';

const i18nResources = {
    fa: {
        translation: {
            requireMSG: 'متن اجباری است',
            requireFile: 'ارسال فایل اجباری است',
            LIMIT_FILE_SIZE: 'حجم فایل بیش از حد مجاز است (حداکثر ۲۰ مگابایت)',
            onlyAcceptImage: 'فقط فایل تصویری مجاز است',
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
            requireTitle: 'عنوان اجباری است',
            requireID: 'شناسه اجباری است',
            requireDesc: 'توضیحات اجباری است',
            requireAbstract: 'خلاصه اجباری است',
            notFound: 'یافت نشد',
            accessDenied: 'دسترسی شما مجاز نیست'
        }
    },
    en: {
        translation: {
            requireMSG: 'message is require',
            requireFile: 'send file is require',
            LIMIT_FILE_SIZE: 'file too large (maximum 20Mb)',
            onlyAcceptImage: 'Only image file is allowed',
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
            requireTitle: 'title is required',
            requireID: 'ID is required',
            requireDesc: 'description is required',
            requireAbstract: 'abstract is required',
            notFound: 'not found',
            accessDenied: 'access denied'
        }
    }
};

const i18nOptions = {
    initImmediate: false,
    lng: 'en',
    resources: i18nResources
};

export async function initI18next() {
    await i18next
        .use(i18nextMiddleware.LanguageDetector)
        .use(FilesystemBackend)
        .use(sprintf)
        .init(i18nOptions);
}

export default i18nResources;