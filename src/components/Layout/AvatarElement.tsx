import React from "react";
import { Media } from "reactstrap";

type Props = {
    text: string;
    imageUrl: string;
}

class AvatarElement extends React.Component<Props> {
    render() {
        const { text, imageUrl } = this.props;
        return (
            <Media className="align-items-center">
                <a
                    className="avatar rounded-circle mr-3"
                    onClick={e => e.preventDefault()}
                >
                    <img
                        alt={text}
                        src={require("../../assets/img/theme/vue.jpg")}
                    />
                </a>
                <Media>
                    <span className="mb-0 text-sm">
                        {text}
                    </span>
                </Media>
            </Media>
        );
    }
}

export default AvatarElement;
