import { IPost } from '../../interfaces';
import * as yup from 'yup';
import {
    requireAbstract,
    requireDesc,
    requireTitle
} from '../../lib/i18nResources';

export async function checkCategoryData(post: IPost, i18nTra: (val: string) => string) {
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