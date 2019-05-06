import React from "react";
import {
    Card, CardHeader, CardBody, Row, Col, Input, Button
} from "reactstrap";
import { Recipe } from "./models";
import Statistic from "../Layout/Statistic";

type Props = {
    recipe: Recipe;
    editing: boolean;
    updateRecipeName: (name: string) => void;
    updateRecipeDescription: (text: string) => void;
    col: string;
    toggleEdit: () => void;
}

class RecipeHeaderElement
    extends React.Component<Props> {
    updateRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { updateRecipeName } = this.props;
        updateRecipeName(e.currentTarget.value);
    }
    
    updateRecipeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { updateRecipeDescription } = this.props;
        updateRecipeDescription(e.currentTarget.value);
    }

    render() {
        const { recipe, col, editing, toggleEdit } = this.props;

        return (
            recipe ?
                <Row>
                    <Col className="mb-5 mb-xl-0" xl={col}>
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        {editing ?
                                            <Input defaultValue={recipe.name} onBlur={this.updateRecipeName} />
                                            :
                                            <h2 className="text-white mb-0">{recipe.name}</h2>
                                        }
                                    </div>
                                    <div className="col text-right">
                                        <Button onClick={toggleEdit}>
                                            {editing ? "Stop editing" : "Edit"}
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xl="4">
                                        {editing ?
                                            <Input
                                                defaultValue={recipe.description}
                                                type="textarea"
                                                onBlur={this.updateRecipeDescription}
                                            />
                                            :
                                            <p className="text-light">
                                                {recipe.description}
                                            </p>
                                        }
                                    </Col>
                                    <Col xl="8">
                                        <Row>
                                            <Statistic
                                                name={"Type"}
                                                value={recipe && recipe.recipeType && recipe.recipeType.name}
                                                icon={"fa-th-large"}
                                                bgColor="bg-purple"
                                                col="4"
                                            />
                                            <Statistic
                                                name={"Duration"}
                                                value={recipe && recipe.duration.toString()}
                                                icon={"fa-clock"}
                                                bgColor="bg-danger"
                                                col="4"
                                            />
                                            <Statistic
                                                name={"Ingredient number"}
                                                value={recipe && recipe.ingredientItems.length.toString()}
                                                icon={"fa-apple-alt"}
                                                bgColor="bg-warning"
                                                col="4"
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                : null
        );
    }
}

export default RecipeHeaderElement;
