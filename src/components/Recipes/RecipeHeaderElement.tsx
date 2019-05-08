import React from "react";
import {
    Card, CardHeader, CardBody, Row, Col, Input, Button
} from "reactstrap";
import { Recipe } from "./models";
import Statistic from "../Layout/Statistic";

type Props = {
    recipe: Recipe;
    editing: boolean;
    updateRecipe: (key: string, value: string) => void;
    col: string;
    toggleEdit: () => void;
}

class RecipeHeaderElement
    extends React.Component<Props> {
    updateRecipe = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { updateRecipe } = this.props;
        updateRecipe(key, e.currentTarget.value);
    }

    renderStatistics() {
        const { recipe } = this.props;

        return (
            recipe &&
            <>
                {recipe.recipeType &&
                    <Statistic
                        name={"Type"}
                        value={recipe.recipeType.name}
                        icon={"fa-th-large"}
                        bgColor="bg-purple"
                        col="4"
                    />
                }
                {recipe.duration &&
                    <Statistic
                        name={"Duration"}
                        value={recipe.duration.toString()}
                        icon={"fa-clock"}
                        bgColor="bg-danger"
                        col="4"
                    />
                }
                {recipe.ingredientItems &&
                    <Statistic
                        name={"Ingredient number"}
                        value={recipe.ingredientItems.length.toString()}
                        icon={"fa-apple-alt"}
                        bgColor="bg-warning"
                        col="4"
                    />
                }
            </>

        )
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
                                            <Input defaultValue={recipe.name} onBlur={this.updateRecipe("name")} />
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
                                                onBlur={this.updateRecipe("description")}
                                            />
                                            :
                                            <p className="text-light">
                                                {recipe.description}
                                            </p>
                                        }
                                    </Col>
                                    <Col xl="8">
                                        <Row>
                                            {this.renderStatistics()}
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
