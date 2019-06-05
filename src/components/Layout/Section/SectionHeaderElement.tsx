import React from "react";
import { Typography } from "@material-ui/core";

type Props = {
    title: string;
    subtitle?: string;
    button?: any;
};

class SectionHeaderElement
    extends React.Component<Props> {
    render() {
        const { title, subtitle, children, button } = this.props;

        return (
            <>
                <div>
                    <Typography variant="h6">
                        {subtitle}
                    </Typography>
                    <Typography variant="h2">{title}</Typography>
                </div>
                <div>
                    {button}
                </div>
                {children}
            </>
        );
    }
}

export default SectionHeaderElement;
