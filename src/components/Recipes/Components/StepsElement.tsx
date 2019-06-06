import React, { PureComponent } from 'react';
import { Recipe } from '../models';
import { Typography } from '@material-ui/core';

type Props = {
    recipe: Recipe;
}

class StepsElement extends PureComponent<Props> {
    render() {
        const { recipe } = this.props;

        return (
            <>
                <Typography variant="h5">Steps</Typography>
                <ol>
                    {/* {recipe && recipe.recipeSteps.map((recipeStep, index) => {
                        return <li key={index}>{recipeStep.description}</li>
                    })} */}
                </ol>
            </>
        );
    }
}

export default StepsElement;