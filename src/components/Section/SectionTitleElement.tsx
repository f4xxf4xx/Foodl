import React from "react";

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
                    <h3>{title}</h3>
                </div>
                <div>
                    {button}
                </div>
            </>
        );
    }
}

export default SectionTitleElement;
