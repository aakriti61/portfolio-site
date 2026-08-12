function FormattedText({ text }) {
    const blocks = text.split('\n\n');

    return (
        <>
            {blocks.map((block, i) => {
                const lines = block.split('\n').filter(Boolean);
                const bulletLines = lines.filter((line) => line.trim().startsWith('-'));
                const headingLines = lines.filter((line) => !line.trim().startsWith('-'));

                if (bulletLines.length > 0) {
                    return (
                        <div key={i}>
                            {headingLines.map((line, h) => (
                                <p key={`h-${h}`}><strong>{line}</strong></p>
                            ))}
                            <ul className="feature-list">
                                {bulletLines.map((line, j) => (
                                    <li key={j}>{line.trim().replace(/^-\s*/, '')}</li>
                                ))}
                            </ul>
                        </div>
                    );
                }

                return <p key={i}>{block}</p>;
            })}
        </>
    );
}

export default FormattedText;