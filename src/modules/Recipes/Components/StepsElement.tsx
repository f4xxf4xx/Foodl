import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import { Step, Recipe } from "modules/Recipes/models";
import AddStepForm from "modules/Recipes/Components/AddStepForm";
import { updateStep, deleteStep } from "store/recipes/recipeActions";

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
      id: "1",
      order: 1,
      text: "mix",
    },
    {
      id: "2",
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
              className="input-step-text"
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
            <button
              onClick={() => dispatch(deleteStep(step.id))}
              disabled={updatingSteps}
            >
              Delete step
            </button>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="recipe-steps">
      <h2>Steps</h2>
      {loadingSteps ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>{renderSteps()}</tbody>
        </table>
      )}
      <AddStepForm editing={editing} currentStepCount={steps.length + 1} />
    </div>
  );
};

export default StepsElement;
