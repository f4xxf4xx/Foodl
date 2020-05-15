import { Box, TextField, p } from "@material-ui/core";
import React, { useState } from "react";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledPaper } from "../../../layout/Styles/Sections";
import { useDispatch, useSelector } from "react-redux";
import * as recipeService from "../../../services/recipeService";
import { ApplicationState } from "../../..";

interface OwnProps {
  editing: boolean;
  currentStepCount: number;
}

type Props = OwnProps;

const AddStepForm = (props: Props) => {
  const dispatch = useDispatch();
  const [newStep, setNewStep] = useState({
    order: props.currentStepCount,
    text: "",
  });
  const recipe = useSelector((state: ApplicationState) => state.recipe.recipe);

  const updateFormText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStep({ ...newStep, text: e.target.value });
  };

  const addStep = () => {
    if (newStep.text === "") {
      return;
    }

    dispatch(recipeService.addStepAsync(recipe.id, newStep));
    setNewStep({
      ...newStep,
      text: "",
      order: newStep.order + 1,
    });
  };

  const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {props.editing && (
        <StyledPaper>
          <form onSubmit={preventDefault}>
            <p variant="h6">Add step</p>
            <Box>
              <TextField
                id="input-text"
                label="Text"
                multiline={true}
                rows={2}
                rowsMax={4}
                value={newStep.text}
                onChange={updateFormText}
              />
            </Box>
            <ButtonPrimary onClick={addStep}>Add</ButtonPrimary>
          </form>
        </StyledPaper>
      )}
    </>
  );
};

export default AddStepForm;
