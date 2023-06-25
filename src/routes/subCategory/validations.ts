import { ISubCategory } from '../../interfaces';
import * as yup from 'yup';
import {
    requireTitle
} from '../../lib/i18nResources';

export async function checkSubCategoryData(post: ISubCategory, i18nTra: (val: string) => string) {
    const validationSchema = yup.object({
        title: yup.string().required(i18nTra(requireTitle))
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