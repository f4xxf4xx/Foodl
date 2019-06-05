import React from "react";

type Props = {
    name: string;
    value: string;
    icon: string;
};

class Statistic extends React.Component<Props> {
    render() {
        const { name, value, icon } = this.props;
        return (
            <>
                {name}
                {value}
                <i className={`fas ${icon}`} />
            </>
        );
    }
}

export default Statistic;
