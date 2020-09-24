import React from"react";
import useSWR from 'swr';

const url = "https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/map/";

const fetcher = () => fetch(url).then(r => r.json())

function TestSWR() {
    const { data: elements } = useSWR('/api/book', fetcher);
    console.log('ele',elements);
 
    return (
        <div>
            <p>{JSON.stringify(elements)}</p>
        </div>
    )
}

export default TestSWR;
 
