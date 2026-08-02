function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  function handleClickOptions(e) {
    const button = e.target.closest("button");
    if (!button) return;
    console.log("hi", button);

    const index = Number(button.dataset.index);
    console.log(index);
    dispatch({ type: "newAnswer", payload: index });
  }
  return (
    <div className="options" onClick={(e) => handleClickOptions(e)}>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option 
            ${index === answer ? "answer" : ""} 
            ${hasAnswer ? (index === question.correctOption ? "correct" : "wrong") : ""}
            `}
          key={option}
          data-index={index}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
