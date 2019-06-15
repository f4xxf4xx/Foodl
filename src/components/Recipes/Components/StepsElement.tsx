import React, { PureComponent } from 'react';
import { Step, Recipe } from '../models';
import { Table, TableBody, Divider, TableRow, TableCell, Button, Typography, Paper, TextField } from '@material-ui/core';
import * as recipeActions from '../recipeActions';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import AddStepForm from './AddStepForm';

interface OwnProps {
    id: string;
    editing: boolean;
}

type StateProps = {
    steps: Step[];
    loadingSteps: boolean;
    updatingSteps: boolean;
}

type DispatchProps = {
    fetchStepsStart: typeof recipeActions.fetchStepsStart;
    fetchStepsStop: typeof recipeActions.fetchStepsStop;
    updateStepsStart: typeof recipeActions.updateStepsStart;
    updateStepsStop: typeof recipeActions.updateStepsStop;
    updateSteps: typeof recipeActions.updateSteps;
    updateStep: typeof recipeActions.updateStep;
    deleteStep: typeof recipeActions.deleteStep;
}

type Props = OwnProps & StateProps & RouteComponentProps & DispatchProps;

class StepsElementBase extends PureComponent<Props> {    
    componentDidMount() {
        const { id } = this.props;

        this.props.fetchStepsStart()
        recipeService.getSteps(id)
            .then((steps) => {
                if (steps.length > 0) {
                    this.props.updateSteps(steps);
                }
                this.props.fetchStepsStop();
            })
            .catch(() => {
                this.props.fetchStepsStart();
                toast.error("Error fetching the ingredient items!");
            })

    }

    deleteStep = (stepId: string) => {
        const { id } = this.props;

        this.props.updateStepsStart();
        recipeService.deleteStep(id, stepId)
            .then(() => {
                this.props.deleteStep(stepId);
                this.props.updateStepsStop();
                toast.success("Deleted!");
            })
            .catch(() => {
                this.props.updateStepsStop();
                toast.error("Error deleting the ingredient item!");
            });
    }

    updateStep = (step: Step, key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        this.props.updateStepsStart();
        recipeService.updateStepText(this.props.id, step.id, value)
            .then(() => {
                this.props.updateStep({...step, [key]: value});
                this.props.updateStepsStop();              
            })
            .catch(() => {
                this.props.updateStepsStop();
                toast.error("Error updating the step");
            })
    }

    render() {
        const { steps, editing, loadingSteps, updatingSteps } = this.props;

        return (
            <>
                <Typography variant="h5">Steps</Typography>
                <Paper>
                    {loadingSteps ?
                        <Loader active inline='centered' />
                        :
                        <Table>
                            <TableBody>
                                {steps.map((step, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                <Typography>
                                                    {step.order}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {editing ?
                                                    <TextField
                                                        id="input-step-text"
                                                        placeholder="Step text"
                                                        type="text"
                                                        defaultValue={step.text}
                                                        onBlur={this.updateStep(step, "text")}
                                                        disabled={updatingSteps}
                                                    />
                                                    :
                                                    <Typography>
                                                        {step.text}
                                                    </Typography>

                                                }
                                            </TableCell>
                                            <TableCell>
                                                {editing &&
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => this.deleteStep(step.id)}
                                                        disabled={updatingSteps}
                                                    >
                                                        Delete step
                                                    </Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                }
                            </TableBody>
                        </Table>
                    }
                </Paper>
                <Divider />
                <AddStepForm editing={editing} currentStepCount={(steps.length + 1)} />
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        steps: state.recipe.steps,
        loadingSteps: state.recipe.loadingSteps,
        updatingSteps: state.recipe.updatingSteps
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchStepsStart: bindActionCreators(recipeActions.fetchStepsStart, dispatch),
        fetchStepsStop: bindActionCreators(recipeActions.fetchStepsStop, dispatch),
        updateStepsStart: bindActionCreators(recipeActions.updateStepsStart, dispatch),
        updateStepsStop: bindActionCreators(recipeActions.updateStepsStop, dispatch),
        updateSteps: bindActionCreators(recipeActions.updateSteps, dispatch),
        updateStep: bindActionCreators(recipeActions.updateStep, dispatch),
        deleteStep: bindActionCreators(recipeActions.deleteStep, dispatch),
    };
};

const StepsElement = compose(
    connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)
)(StepsElementBase);

export default StepsElement;