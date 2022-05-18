import { useQuery } from '@apollo/client';
import { Query, Term } from '../../generated';
import { TERM } from '../../queries';
import { generateTermId } from '../../utils';

export const useTermInfo = (numberOfDays: number): Term | undefined => {
    const termId = generateTermId(numberOfDays);

    const variables = {
        id: termId,
    };

    const { error, data } = useQuery<Query>(TERM, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.term) {
        return data.term;
    } else {
        return undefined;
    }
};
