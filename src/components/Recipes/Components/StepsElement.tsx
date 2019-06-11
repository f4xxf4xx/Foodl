import React, { PureComponent } from 'react';
import { Step } from '../models';
import { Table, TableBody, Divider, TableRow, TableCell, Button, Typography, Paper } from '@material-ui/core';
import * as recipeActions from '../recipeActions';
import { recipeService } from '../recipeService';
import { toast } from 'react-toastify';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';

interface OwnProps {
    editing: boolean;
    id: string;
}

type StateProps = {
    steps: Step[];
    loadingSteps: boolean;
}

type DispatchProps = {
    fetchStepsStart: typeof recipeActions.fetchStepsStart;
    fetchStepsStop: typeof recipeActions.fetchStepsStop;
    updateStepsStart: typeof recipeActions.updateStepsStart;
    updateStepsStop: typeof recipeActions.updateStepsStop;
    updateSteps: typeof recipeActions.updateSteps;
    deleteStep: typeof recipeActions.deleteStep;
}

type Props = OwnProps & StateProps & RouteComponentProps & DispatchProps;

class StepsElementBase extends PureComponent<Props> {
    componentDidMount() {
        const { id } = this.props;

        if (this.props.steps.length == 0) {
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

    render() {
        const { steps, editing, loadingSteps } = this.props;

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
                                                <Typography>
                                                    {step.text}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {editing &&
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => this.deleteStep(step.id)}
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
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        steps: state.recipe.steps,
        loadingSteps: state.recipe.loadingSteps
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchStepsStart: bindActionCreators(recipeActions.fetchStepsStart, dispatch),
        fetchStepsStop: bindActionCreators(recipeActions.fetchStepsStop, dispatch),
        updateStepsStart: bindActionCreators(recipeActions.updateStepsStart, dispatch),
        updateStepsStop: bindActionCreators(recipeActions.updateStepsStop, dispatch),
        updateSteps: bindActionCreators(recipeActions.updateSteps, dispatch),
        deleteStep: bindActionCreators(recipeActions.deleteStep, dispatch),
    };
};

const StepsElement = compose(
    connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)
)(StepsElementBase);

export default StepsElement;