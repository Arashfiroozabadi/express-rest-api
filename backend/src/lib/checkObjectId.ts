import { ObjectId } from 'bson';
import { requireID } from './i18nResources';

export default function(id: string, i18nTra: (val: string) => string) {
    const isValid = ObjectId.isValid(id);

    return isValid ? { id } : { err: true, msg: i18nTra(requireID) };
}