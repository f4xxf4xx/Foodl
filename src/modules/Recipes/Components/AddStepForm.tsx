import { Box, TextField, Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ApplicationState } from "../../..";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import * as recipeActions from "../../../store/recipes/recipeActions";
import { Recipe, Step } from "../models";
import { RecipeService } from "../../../services/RecipeService";

interface OwnProps {
    editing: boolean;
    currentStepCount: number;
}

interface StateProps {
    recipe: Recipe;
    loadingSteps: boolean;
}

interface State {
    newStep: Step;
}

interface DispatchProps {
    updateStepsStart: typeof recipeActions.updateStepsStart;
    updateStepsStop: typeof recipeActions.updateStepsStop;
    updateSteps: typeof recipeActions.updateSteps;
    addStep: typeof recipeActions.addStep;
}

type Props = OwnProps & StateProps & DispatchProps;

class AddStepFormBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newStep: {
                order: props.currentStepCount,
                text: "",
            },
        };
    }

    public updateFormText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { newStep } = this.state;

        this.setState({
            newStep: { ...newStep, text: e.target.value },
        });
    }

    public addStep = () => {
        const { newStep } = this.state;
        const { recipe } = this.props;

        this.props.updateStepsStart();
        RecipeService.addStep(recipe.id, newStep)
            .then((step) => {
                this.props.addStep(step);
                this.props.updateStepsStop();
                this.setState((prevState) => {
                    return {
                        newStep: {
                            ...newStep,
                            text: "",
                            order: prevState.newStep.order + 1,
                        },
                        currentSelectStep: null,
                        currentSelectType: null,
                    };
                });
                toast.success("Added!");
            })
            .catch(() => {
                this.props.updateStepsStop();
                toast.error("Error adding the step item!");
            });
    }

    preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    public render() {
        const { editing } = this.props;
        const { newStep } = this.state;

        return (
            <>
                {editing &&
                    <StyledPaper>
                        <form onSubmit={this.preventDefault}>
                            <Typography variant="h6">
                                Add step
                            </Typography>
                            <Box>
                                <TextField
                                    id="input-text"
                                    label="Text"
                                    multiline={true}
                                    rows={2}
                                    rowsMax={4}
                                    value={newStep.text}
                                    onChange={this.updateFormText}
                                />
                            </Box>
                            <ButtonPrimary
                                onClick={this.addStep}
                            >
                                Add
                            </ButtonPrimary>
                        </form>
                    </StyledPaper>
                }
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    recipe: state.recipe.recipe,
    steps: state.recipe.steps,
    loadingSteps: state.recipe.loadingSteps,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateStepsStart: bindActionCreators(recipeActions.updateStepsStart, dispatch),
    updateStepsStop: bindActionCreators(recipeActions.updateStepsStop, dispatch),
    addStep: bindActionCreators(recipeActions.addStep, dispatch),
    fetchStepsStart: bindActionCreators(recipeActions.fetchStepsStart, dispatch),
    fetchStepsStop: bindActionCreators(recipeActions.fetchStepsStop, dispatch),
});

const AddStepForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(AddStepFormBase);

export default AddStepForm;
