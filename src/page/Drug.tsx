import React, {useEffect, useState} from 'react';
import {InputGroup, Card, Button, ButtonGroup, Spinner, Callout, Code} from "@blueprintjs/core";
import {useParams} from "react-router-dom";
import {INTENT_WARNING} from "@blueprintjs/core/lib/esnext/common/classes";

function Drug(props: any) {

    //console.log(props.match.params)
    //console.log(useParams())
    let [result, setResult] = useState(<Spinner size={25} className={'spinner'}/>);

    useEffect(() => {
        fetch('https://api.fda.gov/drug/ndc.json?search=generic_name:\"' + props.match.params.drugName + '\"&limit=1', {
            method: 'GET',
        }).then(res => {
            if (res.status == 404) {
                setResult(<h1>Drug Not Found</h1>)
                return;
            }
            return res.json()
        }).then(returnVal => {
            if (!returnVal) return;
            var result: any = returnVal.results[0];

            console.log(result)

            let activeIngredients: any = [];
            result.active_ingredients.forEach((k: any) => activeIngredients.push(<p>{k.name + ': ' + k.strength}<br/></p> ))
            setResult(
                <div>
                    <table>
                        <tr>
                            <td>Product NDC</td>
                            <td>{result.product_ndc}</td>
                        </tr>
                        <tr>
                            <td>SPL ID</td>
                            <td>{result.spl_id}</td>
                        </tr>
                        <tr>
                            <td>Generic Name</td>
                            <td>{result.generic_name}</td>
                        </tr>
                        <tr>
                            <td>Dosage Form</td>
                            <td>{result.dosage_form}</td>
                        </tr>
                        <tr>
                            <td>Product Type</td>
                            <td>{result.product_type}</td>
                        </tr>
                        <tr>
                            <td>Brand Name</td>
                            <td>{result.brand_name_base}</td>
                        </tr>
                        <tr>
                            <td>Labeler Name</td>
                            <td>{result.labeler_name}</td>
                        </tr>

                        <tr>
                            <td>Active Ingredients</td>
                            <td>{activeIngredients}</td>
                        </tr>
                        <tr>
                            <td>Finished</td>
                            <td>{result.finished ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td>Listing Expiration Date</td>
                            <td>{result.listing_expiration_date}</td>
                        </tr>
                        <tr>
                            <td>Marketing Category</td>
                            <td>{result.marketing_category}</td>
                        </tr>
                        <tr>
                            <td>Marketing Start Date</td>
                            <td>{result.marketing_start_date}</td>
                        </tr>
                        <tr>
                            <td>OpenFDA</td>
                            <td>{JSON.stringify(result.openfda)}</td>
                        </tr>
                        <tr>
                            <td>Packaging</td>
                            <td>{JSON.stringify(result.packaging)}</td>
                        </tr>
                        <tr>
                            <td>Product ID</td>
                            <td>{result.product_id}</td>
                        </tr>
                    </table>
                </div>);

            console.log("Finished setting result")
        }).catch()
    }, [])


    return (
        <div className={'container'}>
            <br/>
            <Callout title={"Warning"} icon={"issue"} intent={"warning"} className={"middlealert"}>
                Do not rely on medi.study to make decisions regarding medical care. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated
            </Callout>


            {result}
            <br/>
        </div>
    );
}

export default Drug;
