import React from "react";
import { Typography } from "@material-ui/core";

type Props = {
    title?: string;
    button?: any;
};

class SectionTitleElement extends React.Component<Props> {
    render() {
        const { title, button } = this.props;

        return (
            <>
                <div>
                    <Typography variant="h3">{title}</Typography>
                </div>
                <div>
                    {button}
                </div>
            </>
        );
    }
}

export default SectionTitleElement;
