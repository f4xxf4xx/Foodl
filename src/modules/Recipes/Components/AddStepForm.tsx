import React, { useState } from "react";
import { ButtonPrimary } from "../../../layout/Styles/Buttons";
import { StyledSection } from "../../../layout/Styles/Sections";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../..";
import { addStepAsync } from "../../../store/recipes/recipeActions";

interface Props {
  editing: boolean;
  currentStepCount: number;
}

const AddStepForm: React.FC<Props> = (props: Props) => {
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

    dispatch(addStepAsync(recipe.id, newStep));
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
        <StyledSection>
          <form onSubmit={preventDefault}>
            <p>Add step</p>
            <div>
              <input
                id="input-text"
                value={newStep.text}
                onChange={updateFormText}
              />
            </div>
            <ButtonPrimary onClick={addStep}>Add</ButtonPrimary>
          </form>
        </StyledSection>
      )}
    </>
  );
};

export default AddStepForm;
