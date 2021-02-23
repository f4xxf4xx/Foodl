import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import {
    addCookbookAsync,
} from "modules/cookbooks/store/cookbooks-actions";
import { auth } from "firebase-config";
import styled from "styled-components";
import { Theme } from "theme";
import { useHistory } from "react-router-dom";

const StyledModal = styled.div<{ theme: Theme }>`
  width:500px;
  height:500px;
  background-color: blue;
`;

interface Props {
    visible: boolean
}

const NewCookbookModal: React.FC<Props>= ({ visible}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isUpdating = useSelector(
        (state: ApplicationState) => state.cookbooks.isUpdating
    );
    const uid = auth.currentUser.uid;
    const [newCookbookName, setNewCookbookName] = useState("");

    const updateNewCookbookName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCookbookName(e.target.value);
    };

    const handleKeyPress = (event: any) => {
        if (event.charCode === 13) {
            addCookbook();
        }
    };

    const addCookbook = async () => {
        if (newCookbookName === "") {
            return;
        }

        dispatch(addCookbookAsync(newCookbookName, uid, history));
        setNewCookbookName("");
    };

    if(!visible) {
        return null
    }

    return (
        <StyledModal>
            <div>
                <p>New cookbook</p>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                    <div>
                        <input
                            id="input-cookbook-name"
                            type="text"
                            onChange={updateNewCookbookName}
                            value={newCookbookName}
                            disabled={isUpdating}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <button onClick={addCookbook} disabled={isUpdating}>
                        Create
                    </button>
                </form>
            </div>
        </StyledModal>
    );
};

export default NewCookbookModal;
