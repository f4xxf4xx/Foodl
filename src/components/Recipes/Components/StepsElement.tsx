import React, { PureComponent } from 'react';
import { Recipe } from '../models';
import SectionElement from '../../Layout/Section/SectionElement';

type Props = {
    recipe: Recipe;
}

class StepsElement extends PureComponent<Props> {
    render() {
        const { recipe } = this.props;

        return (
            <SectionElement title="Steps">
                <ol>
                    {/* {recipe && recipe.recipeSteps.map((recipeStep, index) => {
                        return <li key={index}>{recipeStep.description}</li>
                    })} */}
                </ol>
            </SectionElement>
        );
    }
}

export default StepsElement;