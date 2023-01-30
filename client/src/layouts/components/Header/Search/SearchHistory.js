import { memo } from 'react';
import ShowHistory from '../../../../components/ShowHistory';

//import AccountItem from '~/components/AccountItem/AccountItem';

function SearchResult({ historyData = [] }) {
    const searchHistory = historyData;
    return (searchHistory.map((result, index) => <ShowHistory key={index} index={index} data={result} />));
}

export default memo(SearchResult);
