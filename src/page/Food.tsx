import React, {useEffect, useState} from 'react';
import {InputGroup, Card, Button, ButtonGroup, Spinner, Callout, Code} from "@blueprintjs/core";

function Food(props : any) {
    let [result, setResult] = useState(<Spinner size={25} className={'spinner'}/>);

    useEffect(() => {
        console.log("result of -> " + props.match.params.foodName)
        fetch('https://api.medi.study/food?food=' + props.match.params.foodName, {
            method: 'GET',
        }).then(res => {
            if (res.status == 404) {
                setResult(<h1>Food Not Found</h1>)
                return;
            }
            console.log(res)
            return res.json()
        }).then(returnVal => {
            if (!returnVal) return;
            var result: any = returnVal

            console.log(result)

            var totalNutrientsDisplay: any = []
            Object.values(result.totalNutrients).forEach((nutrient: any) => {
                totalNutrientsDisplay.push(<tr>
                    <td>{nutrient.label}</td>
                    <td>{nutrient.quantity + ' ' + nutrient.unit}</td>
                </tr>)
            })
            var totalNutrientsKcalDisplay: any = []
            Object.values(result.totalNutrientsKCal).forEach((nutrient: any) => {
                totalNutrientsKcalDisplay.push(<tr>
                    <td>{nutrient.label}</td>
                    <td>{nutrient.quantity + ' ' + nutrient.unit}</td>
                </tr>)
            })


            let cautionsDisplay: any = []
            result.cautions.forEach((k: any) => cautionsDisplay.push(<p>{k}<br /></p>));
            let dietLabelsDisplay: any = []
            result.dietLabels.forEach((k: any) => dietLabelsDisplay.push(<p>{k}<br /></p>));
            let healthLabelDisplay: any = []
            result.healthLabels.forEach((k: any) => healthLabelDisplay.push(<p>{k}<br /></p>));

            setResult(
                <div className={'container'}>
                    <table>
                        <tr>
                            <td>Food Name</td>
                            <td>{props.match.params.foodName}</td>
                        </tr>
                        <tr>
                            <td>Calories</td>
                            <td>{result.calories}</td>
                        </tr>
                        <tr>
                            <td>Total Weight</td>
                            <td>{result.totalWeight}</td>
                        </tr>
                        <tr>
                            <td>Diet Labels</td>
                            <td>{dietLabelsDisplay}</td>
                        </tr>
                        <tr>
                            <td>Cautions</td>
                            <td>{cautionsDisplay}</td>
                        </tr>
                        <tr>
                            <td>Health Labels</td>
                            <td>{healthLabelDisplay}</td>
                        </tr>
                        {totalNutrientsDisplay}
                        {totalNutrientsKcalDisplay}
                    </table>
                </div>);

            console.log("Finished setting result")
        }).catch()
    }, [])

    return (
        <div>
            <br/>
            {result}
            <br/>
        </div>
    );
}

export default Food;
