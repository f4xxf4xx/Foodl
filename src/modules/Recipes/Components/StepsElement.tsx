import React, { PureComponent } from 'react';
import { Step, Recipe } from '../models';
import { Table, TableBody, Divider, TableRow, TableCell, Button, Typography, Paper, TextField } from '@material-ui/core';
import * as recipeActions from '../../../store/recipes/recipeActions';
import { recipeService } from '../../../services/recipeService';
import { toast } from 'react-toastify';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import AddStepForm from './AddStepForm';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { ButtonError } from '../../../layout/Styles/Buttons';
import { ApplicationState } from '../../..';

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

const SortableStep = SortableElement(({ step, index, editing, updatingSteps, updateStep, deleteStep }) => {
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
                        onBlur={updateStep(step, "text")}
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
                    <ButtonError
                        variant="contained"
                        color="primary"
                        onClick={() => deleteStep(step.id)}
                        disabled={updatingSteps}
                    >
                        Delete step
                    </ButtonError>
                }
            </TableCell>
        </TableRow>
    )
});

const SortableSteps = SortableContainer(({ steps, editing, updatingSteps, updateStep, deleteStep }) => {
    return (
        <ul>
            {steps.map((step, index) => (
                <SortableStep
                    key={step.id}
                    index={index}
                    step={step}
                    editing={editing}
                    updatingSteps={updatingSteps}
                    updateStep={updateStep}
                    deleteStep={deleteStep}
                />
            ))}
        </ul>
    );
});

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
                this.props.updateStep({ ...step, [key]: value });
                this.props.updateStepsStop();
            })
            .catch(() => {
                this.props.updateStepsStop();
                toast.error("Error updating the step");
            })
    }

    onSortEnd = ({ oldIndex, newIndex }) => {

    };

    renderSteps() {
        const { steps, editing, updatingSteps } = this.props;

        return (
            steps.map((step, index) => (
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
                            <ButtonError
                                variant="contained"
                                color="primary"
                                onClick={() => this.deleteStep(step.id)}
                                disabled={updatingSteps}
                            >
                                Delete step
                            </ButtonError>
                        }
                    </TableCell>
                </TableRow>
            ))
        )
    }

    render() {
        const { loadingSteps, editing, steps } = this.props;

        return (
            <>
                <Typography variant="h5">Steps</Typography>
                <Paper>
                    {loadingSteps ?
                        <Loader active inline='centered' />
                        :
                        <Table>
                            <TableBody>
                                {this.renderSteps()}
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

const mapStateToProps = (state: ApplicationState) => ({
    steps: state.recipe.steps,
    loadingSteps: state.recipe.loadingSteps,
    updatingSteps: state.recipe.updatingSteps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchStepsStart: bindActionCreators(recipeActions.fetchStepsStart, dispatch),
    fetchStepsStop: bindActionCreators(recipeActions.fetchStepsStop, dispatch),
    updateStepsStart: bindActionCreators(recipeActions.updateStepsStart, dispatch),
    updateStepsStop: bindActionCreators(recipeActions.updateStepsStop, dispatch),
    updateSteps: bindActionCreators(recipeActions.updateSteps, dispatch),
    updateStep: bindActionCreators(recipeActions.updateStep, dispatch),
    deleteStep: bindActionCreators(recipeActions.deleteStep, dispatch),
});

const StepsElement = compose(
    connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)
)(StepsElementBase);

export default StepsElement;