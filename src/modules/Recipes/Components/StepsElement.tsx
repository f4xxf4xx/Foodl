import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../..";
import { ButtonError } from "../../../layout/Styles/Buttons";
import { Step, Recipe } from "../models";
import AddStepForm from "./AddStepForm";
import { updateStep, deleteStep } from "../../../store/recipes/recipeActions";

interface Props {
  recipe: Recipe;
  editing: boolean;
}

const StepsElement: React.FC<Props> = ({ recipe, editing }) => {
  const loadingSteps = useSelector(
    (state: ApplicationState) => state.recipe.loadingSteps
  );
  const updatingSteps = useSelector(
    (state: ApplicationState) => state.recipe.updatingSteps
  );
  const dispatch = useDispatch();
  const steps: Step[] = [
    {
      order: 1,
      text: "mix",
    },
    {
      order: 2,
      text: "stir",
    },
  ];

  const renderSteps = () => {
    return steps.map((step) => (
      <tr key={step.id}>
        <th>
          <p>{step.order}</p>
        </th>
        <td>
          {editing ? (
            <input
              id="input-step-text"
              placeholder="Step text"
              type="text"
              defaultValue={step.text}
              onBlur={() =>
                dispatch(
                  updateStep({
                    id: step.id,
                    text: step.text,
                  })
                )
              }
              disabled={updatingSteps}
            />
          ) : (
            <p>{step.text}</p>
          )}
        </td>
        <td>
          {editing && (
            <ButtonError
              onClick={() => dispatch(deleteStep(step.id))}
              disabled={updatingSteps}
            >
              Delete step
            </ButtonError>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h5>Steps</h5>
      {loadingSteps ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>{renderSteps()}</tbody>
        </table>
      )}
      <AddStepForm editing={editing} currentStepCount={steps.length + 1} />
    </>
  );
};

export default StepsElement;
