import React, { PureComponent } from 'react';
import { Recipe, Step } from '../models';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import { Table, TableBody, Divider, TableRow, TableCell, Button, Typography, Avatar, FormLabel, TextField, Paper } from '@material-ui/core';
import * as recipeActions from '../recipeActions';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';

type OwnProps = {
    editing: boolean;
    currentStepCount: number;
}

type StateProps = {
    recipe: Recipe;
    loadingSteps: boolean;
}

type State = {
    newStep: Step;
}

type DispatchProps = {
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
                text: ""
            },
        };
    }

    updateFormText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { newStep } = this.state;
        this.setState({
            newStep: { ...newStep, text: e.target.value }
        });
    }

    addStep = () => {
        const { newStep } = this.state;
        const { recipe } = this.props;

        this.props.updateStepsStart();
        recipeService.addStep(recipe.id, newStep)
            .then((step) => {
                this.props.addStep(step);
                this.props.updateStepsStop();
                this.setState((prevState) => {
                    return {
                        newStep: {
                            ...newStep,
                            text: "",
                            order: prevState.newStep.order + 1
                        },
                        currentSelectStep: null,
                        currentSelectType: null
                    }
                });
                toast.success("Added!");
            })
            .catch(() => {
                this.props.updateStepsStop();
                toast.error("Error adding the step item!");
            });
    }

    render() {
        const { editing } = this.props;
        const { newStep } = this.state;

        return (
            <Paper>
                {editing &&
                    <form onSubmit={e => { e.preventDefault(); }}>
                        <Typography variant="h6">
                            Add step
                        </Typography>
                        <div>
                            <FormLabel htmlFor="input-quantity">
                                Text
                            </FormLabel>
                            <TextField
                                id="input-text"
                                placeholder="Text"
                                multiline={true}
                                value={newStep.text}
                                onChange={this.updateFormText}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addStep}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                }
            </Paper>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        recipe: state.recipe.recipe,
        steps: state.recipe.steps,
        loadingSteps: state.recipe.loadingSteps
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateStepsStart: bindActionCreators(recipeActions.updateStepsStart, dispatch),
        updateStepsStop: bindActionCreators(recipeActions.updateStepsStop, dispatch),
        addStep: bindActionCreators(recipeActions.addStep, dispatch),
        fetchStepsStart: bindActionCreators(recipeActions.fetchStepsStart, dispatch),
        fetchStepsStop: bindActionCreators(recipeActions.fetchStepsStop, dispatch)
    };
};

const AddStepForm = compose(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(AddStepFormBase);

export default AddStepForm;