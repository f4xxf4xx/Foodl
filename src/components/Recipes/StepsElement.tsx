import React, { PureComponent } from 'react';
import { Fetcher } from '../../services/Fetcher';
import { Recipe, InputAddIngredientItem } from './models';
import SectionElement from '../Section/SectionElement';

type Props = {
    recipe: Recipe;
}

class StepsElement extends PureComponent<Props> {
    render() {
        const { recipe } = this.props;

        return (
            <SectionElement title="Steps" col="12">
                <ol>
                    {recipe.recipeSteps && recipe.recipeSteps.map((recipeStep, index) => {
                        return <li key={index}>{recipeStep.description}</li>
                    })}
                </ol>
            </SectionElement>
        );
    }
}

export default StepsElement;