import { IPost } from '../../interfaces';
import * as yup from 'yup';
import {
    requireAbstract,
    requireDesc,
    requireTitle
} from '../../lib/i18nResources';

export async function checkPostData(post: IPost, i18nTra: (val: string) => string) {
    const validationSchema = yup.object({
        title: yup.string().required(i18nTra(requireTitle)),
        description: yup.string().required(i18nTra(requireDesc)),
        abstract: yup.string().required(i18nTra(requireAbstract))
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