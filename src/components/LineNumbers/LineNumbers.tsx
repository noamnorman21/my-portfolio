import { useEffect, useState } from "react";

const LineNumbers: React.FC = () => {

    const [rows, setRows] = useState<number>(10);

    useEffect(() => {
        const screenHeight = document.body.scrollHeight * 1.1;
        const lineHeight = 16 * 1.5;
        setRows(Math.floor(screenHeight / lineHeight));


    }, []);

    return (
        <div id="lines">
            {[...Array(rows)].map((row, index) => <p tabIndex={0} key={index} id={index.toString()}></p>)}
        </div>
    );
};


export default LineNumbers;
