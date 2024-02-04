import '../../styles/CorrectingPageSentence.scss';
import { useRef, useState } from 'react';

function SentenceCorrection(props: any) {
    const { index, line, tempLines, setTempLines, content } = props;

    const [showInput, setShowInput] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const afterDiv = useRef<any>();
    const after = useRef<any>();
    const before = useRef<any>();
    const handleCorrectingClick = () => {
        setShowInput(true);
    };

    const correctExec = (str1: string, str2: string): string[] => {
        const res: string[] = [];
        // 자~~ 작업 해볼까!!
        // 자~~ 작업 해볼까!!
        // 자~~ 작업 해볼까!!
        // 자~~ 작업 해볼까!!
        const beforeLine = `{${str1}}`;
        const afterLine = `{${str2}}`;
        res.push(beforeLine);
        res.push(afterLine);
        return res;
    };
    const correctLines = () => {
        const res = correctExec(content[index], after.current.value);
        setShowInput(false);
        setTimeout(() => {
            afterDiv.current.innerHTML = res[1].replace(
                /\{([^}]+)\}/g,
                '<span style="color : green">$1</span>'
            );
        }, 0);
        // const newLine = res[0] + '/./' + res[1];
        // tempLines[index] = newLine;
        // setTempLines(tempLines);

        const newLine = res[0] + '/./' + res[1];
        const newTempLines = [...tempLines];
        newTempLines[index] = newLine;
        setTempLines(newTempLines);
        setTimeout(() => {
            before.current.innerHTML = res[0].replace(
                /\{([^}]+)\}/g,
                '<span style = "color: red;text-decoration: line-through">$1</span>'
            );
        }, 0);
        return;
    };

    return (
        <>
            <div className="sentence-container">
                <div className="sentence-header">
                    {/* 비포 */}
                    <div ref={before} className="sentence-content">
                        {props.line}
                    </div>
                    {showInput && isFixed ? (
                        <div
                            onClick={() => {
                                correctLines();
                            }}
                        >
                            첨삭
                        </div>
                    ) : (
                        <div
                            className="correcting"
                            onClick={handleCorrectingClick}
                        ></div>
                    )}
                </div>
                {showInput || (
                    // 에프터 div
                    <div ref={afterDiv} className="sentence-content"></div>
                )}
                {showInput && (
                    <div>
                        {/* 에프터 인풋 */}
                        <input
                            type="text"
                            defaultValue={props.line}
                            className="inputcorrecting"
                            ref={after}
                            autoFocus
                            onChange={() => {
                                if (after.current?.value != props.line) {
                                    setIsFixed(true);
                                } else {
                                    setIsFixed(false);
                                }
                            }}
                            onBlur={() => {
                                if (props.line === after.current?.value) {
                                    tempLines[index] = line;
                                    setTempLines(tempLines);
                                    before.current.innerText = line;
                                    setShowInput(false);
                                } else {
                                    setShowInput(true);
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default SentenceCorrection;
