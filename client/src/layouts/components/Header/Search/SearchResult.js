import { memo } from 'react';
import ShowItem from '../../../../components/ShowItem';

//import AccountItem from '~/components/AccountItem/AccountItem';

function SearchResult({ value = [] }) {
    const searchResult = value;
    return (searchResult.map((result, index) => <ShowItem key={index} data={result} />));
}

export default memo(SearchResult);
