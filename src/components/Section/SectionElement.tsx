import React from "react";
import SectionTitleElement from "./SectionTitleElement";

type Props = {
    title?: string;
    button?: any;
};

class SectionElement extends React.Component<Props> {
    render() {
        const { title, children, button } = this.props;

        return (
            <>
                {title &&
                    <SectionTitleElement title={title} button={button} />
                }
                {children}
            </>
        );
    }
}

export default SectionElement;
