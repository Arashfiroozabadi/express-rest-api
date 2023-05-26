import * as yup from 'yup';
import { IUser } from '../../interfaces';
import { requireEmail, requireName, requirePass, requirePhone, validEmail } from '../../lib/i18nResources';

export async function checkNewUserData(post: IUser, i18nTra: (val: string) => string) {
    const validationSchema = yup.object({
        name: yup.string().required(i18nTra(requireName)),
        password: yup.string().required(i18nTra(requirePass)),
        phone: yup.string().required(i18nTra(requirePhone)),
        email: yup.string().email(i18nTra(validEmail)).required(i18nTra(requireEmail))
    });
    return validationSchema.validate(post, { abortEarly: false })
        .then(result => result)
        .catch(err => {
            console.log(err.errors);
            return {
                err: true,
                msg: err.errors
            };
        });
}

export async function checkUserLoginData(post: IUser, i18nTra: (val: string) => string) {
    const validationSchema = yup.object({
        password: yup.string().required(i18nTra(requirePass)),
        phone: yup.string().required(i18nTra(requirePhone))
    });
    return validationSchema.validate(post, { abortEarly: false })
        .then(result => result)
        .catch(err => {
            console.log(err.errors);
            return {
                err: true,
                msg: err.errors
            };
        });
}