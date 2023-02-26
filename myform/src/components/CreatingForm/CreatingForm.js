import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import ListingPage from "../ListingPage/ListingPage";
import "./CreatingForm.css"

const CreatingForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [answerType, setAnswerType] = useState("");
  const [choices, setChoices] = useState("");
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '500px',
      width: '800px',
      backgroundColor: '#f8f8f8', /* change this to your desired color */
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
      borderRadius: '10px',
      padding: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize:"20px"
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '9999',
    },
  };
  
  
  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  const handleQuestionTitleChange = (event) => {
    setQuestionTitle(event.target.value);
  };

  const handleAnswerTypeChange = (event) => {
    setAnswerType(event.target.value);
  };

  const handleChoicesChange = (event) => {
    setChoices(event.target.value);
  };

  const handleAddQuestion = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleSaveQuestion = () => {
    const newQuestion = {
      title: questionTitle,
      type: answerType,
      choices: choices.split("\n").map((choice) => choice.trim()),
    };
    setQuestions([...questions, newQuestion]);
    setModalIsOpen(false);
    setQuestionTitle("");
    setAnswerType("");
    setChoices("");
  };

  const handleSaveForm = () => {
    const formData = {
      name: formName,
      questions: questions,
      // add any other form data as necessary
    };

    axios.post("/api/forms", formData)
      .then((response) => {
        console.log("Form saved successfully:", response.data);
        // handle successful form submission
      })
      .catch((error) => {
        console.error(error);
        // handle form submission error
      });
  };
  return (
    <div className="create-form" style={{width:''}}>
      <div className="form-name">
        <label htmlFor="formName">Form Name:</label>
        <input
          type="text"
          id="formName"
          value={formName}
          onChange={handleFormNameChange}
        />
      </div>
      <div className="add-question">
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} style={customStyles}>
        <h2>Add Question</h2>
        <div className="question-title">
          <label htmlFor="questionTitle">Question Title:</label>
          <input
            type="text"
            id="questionTitle"
            value={questionTitle}
            onChange={handleQuestionTitleChange}
          />
        </div>
        <div className="answer-type">
          <label htmlFor="answerType">Answer Type:</label>
          <select id="answerType" onChange={handleAnswerTypeChange}>
            <option value="">Select Answer Type</option>
            <option value="text">Text</option>
            <option value="multichoice">Multichoice Checkbox</option>
            <option value="singleselect">Single Select (radio)</option>
          </select>
        </div>
        {answerType === "multichoice" && (
          <div className="choices">
            <label htmlFor="choices">Choices (one per line):</label>
            <textarea
              id="choices"
              value={choices}
              onChange={handleChoicesChange}
            ></textarea>
          </div>
        )}
        <div className="save-question">
          <button onClick={handleSaveQuestion}>Save Question</button>
          <button onClick={handleModalClose}>Cancel</button>
        </div>
      </Modal>
      <div className="questions">
        <h2>Questions</h2>
        <table>
          <thead>
            <tr>
              <th>Question Title</th>
              <th>Answer Type</th>
              <th>Choices</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td>{question.title}</td>
                <td>{question.type}</td>
                <td>
                  {question.choices.map((choice, index) => (
                    <div key={index}>{choice}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="save-form">
        <button onClick={handleSaveForm}>Save Form</button>
      </div>
      <ListingPage/>
    </div>
  );
};

export default CreatingForm;
