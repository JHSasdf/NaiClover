import '../../styles/ErrorLogPageBeforeAfter.scss';

function BeforeAfter(props: any) {
    const { comment } = props;
    const content = comment.split('/./');
    const before = content[0].replace(
        /\{([^}]+)\}/g,
        '<span style = "color: red;text-decoration: line-through">$1</span>'
    );
    const after = content[1].replace(
        /\{([^}]+)\}/g,
        '<span style="color : green">$1</span>'
    );
    return (
        <>
            <div className="beforeafter-container">
                <div className="before-container">
                    <div className="before-text"></div>
                    <div
                        className="before-content"
                        dangerouslySetInnerHTML={{
                            __html: before,
                        }}
                    ></div>
                </div>
                <div className="after-container">
                    <div className="after-text"></div>
                    <div
                        className="after-content"
                        dangerouslySetInnerHTML={{
                            __html: after,
                        }}
                    ></div>
                </div>
            </div>
            <div className="line"></div>
        </>
    );
}

export default BeforeAfter;
