import React, {useState} from 'react';
import {InputGroup, Button, ButtonGroup, Spinner} from "@blueprintjs/core";
import {Redirect} from "react-router-dom";

function FoodSearch() {
    let [result, setResult] = useState(<h1>Insert food to calculate</h1>);
    const [text, setText] = useState('');

    function searchFood() {
        console.log(text)
        setResult(<Spinner size={25} className={'spinner'}/>)
        fetch('https://api.medi.study/food?food=' + text, {
            method: 'GET',
        }).then(res => {
            if (res.status != 200) {
                setResult(<h1>Results Not Found</h1>)
                return;
            }
            console.log('res' + res)
            return res.json()
        }).then(returnVal => {
            console.log(returnVal)

            let url = "/food/" +  text
            setResult(
                <Redirect to={url} /> // redirect to food/{input}
            );
        }).catch()
    }

    return (
        <div className={'container'}>
            <br/>
            <ButtonGroup className={'buttongrp'}>
                <InputGroup
                    asyncControl={true}
                    large={true}
                    leftIcon="geosearch"
                    defaultValue=''
                    onChange={e => setText(e.currentTarget.value)}
                    placeholder="Enter any food name... (e.g. chocolate short cake)"
                    className={'w-50'}
                />
                <Button icon={"calculator"} onClick={searchFood} >Calculate</Button>
            </ButtonGroup>

            {result}

        </div>
    );
}

export default FoodSearch;
