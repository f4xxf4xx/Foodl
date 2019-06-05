import React from "react";

type Props = {
    text: string;
    imageUrl: string;
}

class AvatarElement extends React.Component<Props> {
    render() {
        const { text, imageUrl } = this.props;
        return (
            <>
                <a
                    className="avatar rounded-circle mr-3"
                    onClick={e => e.preventDefault()}
                >
                    <img
                        alt={text}
                    />
                </a>
                <span className="mb-0 text-sm">
                    {text}
                </span>
            </>
        );
    }
}

export default AvatarElement;
