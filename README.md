# An Express Server Template

# API for Qoura-likes backend application

_Description_
This is API back-end project build to reconstruct Qoura web application, where client can read and create Questions and Answers.

**The key feature inclueds**
_For Questions:_

- Users can create questions.
- A question will have a title and a description.
- Questions will be categorized, such as Software, Food, Travel, Science, etc.
- Users can view all questions.
- Users can view each individual question by its ID.
- Users can edit the title or description of a question.
- Users can delete a question.
- Users can search for questions by title or category.

  _For Answers:_

- Users can create an answer for a specific question.
- An answer will be a long text, no more than 300 characters.
- Users can view the answer to each question.
- Users can delete an answer.
  When a question is deleted, its corresponding answers will also be deleted.

  _For Voting:_

- Users can click "Agree" or "Disagree" on an answer.
- The number of people agreeing or disagreeing can be shown as + and -.
- Users can also agree or disagree with a question itself.

**How to Install and Run the Project**
_package_
1.express
2.nodemon
3.dotenv
4.pg
5.swagger-jsdoc
6.swagger-ui-express

**API list**
Metod | Endpoint | Description
-----| -----| -----|
1.POST | /questions | Create a new question.
2.GET | /questions | Get all questions.
3.GET | /questions/:questionId | Get a question by ID.
4.PUT | /questions/:questionId | Update a question by ID.
5.DELETE | /questions/:questionId | Delete a question by ID.
6.GET | /questions/search | Search questions by title or category.
7.POST | /questions/:questionId/answers | Create an answer for a question.
8.GET | /questions/:questionId/answers | Get answers for a question.
9.DELETE | /questions/:questionId/answers | Delete answers for a question.
10.POST | /questions/:questionId/vote | Vote on a question.
11.POST | /answers/:answerId/vote | Vote on an answer.

# License

This project is part of Techup Bootcamp, for Education and Experiment.
