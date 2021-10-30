import React from 'react';
import {InputGroup,  Button, ButtonGroup} from "@blueprintjs/core";

function FoodSearch() {
    return (
        <div>
            <br/>
            <ButtonGroup className={'my-8'}>
                <InputGroup
                    asyncControl={true}
                    large={true}
                    leftIcon="geosearch"
                    defaultValue=''
                    placeholder="Enter Food name..."
                />
                <Button icon={"search"} >Search</Button>
            </ButtonGroup>


        </div>
    );
}

export default FoodSearch;
