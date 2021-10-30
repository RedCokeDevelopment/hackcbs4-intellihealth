import React, {useState} from 'react';
import {InputGroup, Card, Button, ButtonGroup, Spinner} from "@blueprintjs/core";


function DrugSearch() {
    let [result, setResult] = useState(<h1>Insert query to search</h1>);
    const [text, setText] = useState('');

    function searchDrug() {
        console.log(text)
        setResult(<Spinner size={25} className={'spinner'}/>)
        fetch('https://api.fda.gov/drug/ndc.json?search=generic_name:\"' + text + '\"&limit=20',{
            method: 'GET',
        }).then(res => {
            if (res.status == 404) {
                setResult(<h1>Results Not Found</h1>)
                return;
            }
            return res.json()
        }).then(returnVal => {
            if (!returnVal) return;
            let tmp: any = [];
            returnVal.results.forEach((result: any) => tmp.push(
                <Card interactive={true} className="middle" key={result.product_id}>
                    <h2><a href={"/drug/" + result.generic_name}>{result.generic_name.length >= 80 ? result.generic_name.substr(0, 80) + '...': result.generic_name}</a></h2>
                    <p>Brand: {result.brand_name}</p>
                </Card>
            ))

            console.log(returnVal.results)

            setResult(
                tmp
            );
        }).catch()
    }


    // @ts-ignore
    return (
        <div className={'container center'}>
            <br/>
            <ButtonGroup>
                <InputGroup
                    asyncControl={true}
                    large={true}
                    leftIcon="geosearch"
                    defaultValue=''
                    onChange={e => setText(e.currentTarget.value)}
                    placeholder="Enter drug name..."
                />
                <Button icon={"search"} onClick={searchDrug}>Search</Button>
            </ButtonGroup>

            {result}

        </div>
    );
}

export default DrugSearch;
