import React from "react";

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
                    <h6>
                        {subtitle}
                    </h6>
                    <h2>{title}</h2>
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
