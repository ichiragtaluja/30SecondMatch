console.log("connected");
let answers = [];
let isDeleted = false;

function makeCombination() {
  let userCombination = "";

  answers.map((answer) => {
    if (answer.selectedAnswer == "option1") {
      userCombination += "A";
    } else {
      userCombination += "B";
    }
  });
  return userCombination;
}

function handleClick(e, index, option, question) {
  for (let i = 0; i < 2; i++) {
    let id = `question${question["question-id"]}answer${i + 1}`;
    let input = document.querySelector(`#${id}`);

    if (input && input.checked) {
      const correspondingLabel = document.querySelector(`.${id}`);
      correspondingLabel.style.color = "green";
    } else {
      const correspondingLabel = document.querySelector(`.${id}`);
      correspondingLabel.style.color = "black";
    }
  }

  let userAnswer = {};
  userAnswer.questionId = question["question-id"];
  userAnswer.selectedAnswer = `option${index + 1}`;

  if (answers.some((answer) => answer.questionId === question["question-id"])) {
    answers = answers.map((answer) => {
      if (answer.questionId === question["question-id"]) {
        answer.selectedAnswer = userAnswer.selectedAnswer;
      }
      return answer;
    });
  } else {
    answers.push(userAnswer);
  }
}

let currQuestion = 1;
let totalQuestions;

function displayQuestions(questions) {
  let questionUl = document.querySelector("#questions");
  let questionIndex = 0;
  questions.forEach(function (question) {
    console.log(question);
    question.answered = false;

    let listquestion = document.createElement("li");
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let ul = document.createElement("ul");
    ul.id = `answer${questionIndex + 1}`;
    ul.classList.add("options");

    h2.classList.add("question-heading");
    if (questionIndex == 0) {
      h2.classList.add("active");
      ul.classList.add("active");
    }

    for (let i = 0; i < 2; i++) {
      let option = document.createElement("li");
      let label = document.createElement("label");
      label.textContent = question[`option${i + 1}`];
      label.setAttribute("for", question["question-id"]);
      label.setAttribute(
        "class",
        `question${question["question-id"]}answer${i + 1}`
      );

      let input = document.createElement("input");
      input.name = question["question-id"];
      input.type = "radio";
      input.id = `question${question["question-id"]}answer${i + 1}`;
      let img = document.createElement("img");
      if (i == 0) {
        input.setAttribute("required", "required");
      }

      img.src = question[`option${i + 1}-image`];
      img.alt = question[`option${i + 1}`];
      label.appendChild(input);
      option.appendChild(img);
      option.appendChild(input);
      option.appendChild(label);

      option.addEventListener("click", (e) => {
        handleClick(e, i, option, question);
      });
      ul.appendChild(option);
    }

    h2.textContent = question.question;
    h2.id = `question${questionIndex + 1}`;

    questionUl.appendChild(listquestion);
    listquestion.appendChild(div);
    div.appendChild(h2);
    div.appendChild(ul);

    questionIndex++;
  });
}

let isLoggedIn = false;
let role;

function showNextQuestion() {
  if (currQuestion > totalQuestions - 1) {
    currQuestion++;
    let widthPercentage = ((currQuestion - 1) / totalQuestions) * 100;
    document.querySelector(".progress").style.width = `${widthPercentage}%`;

    document.querySelector("#questions-section").style.display = "none";
    document.querySelector("#match-section").style.display = "block";
  } else {
    if (true) {
      let questionId = `question${currQuestion}`;
      let answerId = `answer${currQuestion}`;

      let currentQuestion = document.querySelector(`#${questionId}`);
      let currentAnswer = document.querySelector(`#${answerId}`);

      currentQuestion.classList.remove("active");
      currentAnswer.classList.remove("active");

      currQuestion++;

      updatedQuestionId = `question${currQuestion}`;
      updatedAnswerId = `answer${currQuestion}`;

      let widthPercentage = ((currQuestion - 1) / totalQuestions) * 100;

      document.querySelector(".progress").style.width = `${widthPercentage}%`;
      document.querySelector("#progress-child").style.animation = "none";
      void document.querySelector("#progress-child").offsetWidth;
      document.querySelector("#progress-child").style.animation = "";

      let nextQuestion = document.querySelector(`#${updatedQuestionId}`);
      let nextAnswer = document.querySelector(`#${updatedAnswerId}`);

      nextQuestion.classList.add("active");
      nextAnswer.classList.add("active");
    }
  }
}

function getQuestions(displayQuestionsFn) {
  updateNavbar();

  let xhrQuestions = new XMLHttpRequest();
  xhrQuestions.onreadystatechange = function () {
    if (xhrQuestions.readyState === XMLHttpRequest.DONE) {
      if (xhrQuestions.status == 200) {
        let data = JSON.parse(xhrQuestions.responseText);
        totalQuestions = data.length;
        displayQuestionsFn(data);
      }
    }
  };

  xhrQuestions.open("GET", "php/get-questions.php", true);
  xhrQuestions.send();
}

window.onload = function () {
  getQuestions(displayQuestions);
};

function displayType(data) {
  document.querySelector("#results-section").style.display = "block";

  document
    .querySelector("#results-section")
    .scrollIntoView({ behavior: "smooth", block: "start" });

  let h2 = document.querySelector("#type");
  h2.innerHTML = `You are an ${data[0].type}`;

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        let data = JSON.parse(xhr.responseText);
        console.log("data", data);
        isLoggedIn = data;
        console.log(isLoggedIn);
      }
    }
  };

  xhr.open("GET", "php/check-login.php", true);
  xhr.send();
}

function revealEmail(index) {
  if (isLoggedIn) {
    document.querySelector(`#email-${index + 1}`).style.display = "block";
    document.querySelector(`#email-btn-${index + 1}`).style.display = "none";
  } else {
    console.log("sign up page");
    loginform.style.display = "block";

    document.querySelector("#login-section").style.display = "block";
    loginform.emailIndex = index;

    document
      .querySelector("#login-section")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function displayMatch(data) {
  const matches = document.querySelector("#matches");

  data.map((match, i) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let age = document.createElement("p");
    let email = document.createElement("p");
    let showEmailBtn = document.createElement(`button`);
    showEmailBtn.setAttribute("class", "primary-btn");

    showEmailBtn.addEventListener("click", () => revealEmail(i));

    showEmailBtn.setAttribute("id", `email-btn-${i + 1}`);
    email.setAttribute("id", `email-${i + 1}`);
    email.classList.add("email");

    h3.textContent = match.name;
    img.src = match.image;
    img.alt = match.name;
    p.textContent = match.personality;
    age.textContent = `${match.age} years`;
    email.textContent = `Email: ${match.email}`;
    showEmailBtn.textContent = `Reveal Contact`;

    li.appendChild(img);
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(age);
    li.appendChild(email);
    li.appendChild(showEmailBtn);
    matches.appendChild(li);
  });
}
let personality;

function handleFindType() {
  if (currQuestion == totalQuestions) {
    showNextQuestion();
    let userCombination = makeCombination();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          let data = JSON.parse(xhr.responseText);
          displayType(data);
          personality = data[0].type;

          if (personality) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                  let data = JSON.parse(xhr.responseText);
                  displayMatch(data);
                  document.querySelector("#match-section").style.display =
                    "block";

                  document
                    .querySelector("#match-section")
                    .scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
              }
            };
            xhr.open(
              "GET",
              `php/find-matches.php?personality=${personality}`,
              true
            );
            xhr.send();
          }
        }
      }
    };
    xhr.open(
      "GET",
      `php/calculate-type.php?combination=${userCombination}`,
      true
    );
    xhr.send();
  } else {
    showNextQuestion();
  }
}

const findTypeBtn = document.querySelector("#find-type");
findTypeBtn.addEventListener("click", handleFindType);

const signupform = document.forms.signup;
const loginform = document.forms.login;

// function processSignup(event, name, dob, email, password, userPersonality) {}

function signupHandler(e, i) {
  e.preventDefault();

  let hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "personality");
  hiddenInput.setAttribute("value", personality);

  signupform.appendChild(hiddenInput);

  let req = new XMLHttpRequest();
  const formData = new FormData(signupform);
  console.log("formdata", formData);

  req.onreadystatechange = function (resEvent) {
    console.log("inside here");
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        console.log("inside hereeeee");
        let responseJSON = JSON.parse(req.responseText);
        console.log(responseJSON);
        if (responseJSON.success == "true") {
          isLoggedIn = true;
          console.log("isloggedin", isLoggedIn);
          updateNavbar();
          document.querySelector("#sign-up-section").style.display = "none";
          if (i >= 0) {
            revealEmail(i);
          }
        } else {
          console.log("oops failure");
          // document.querySelector("#output").innerHTML = "OOPS FAILURE";
        }
      } else {
        console.log(" last here");
        //status code error
      }
    }
  };
  req.open("POST", "php/process-signup.php");
  //   req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   req.send(`name=${personName.value}&email=${email.value}`);  req.send(`name=${personName.value}&email=${email.value}`);
  req.send(formData);
}

function loginHandler(e, i) {
  e.preventDefault();

  let req = new XMLHttpRequest();
  const formData = new FormData(loginform);
  console.log("formdata", formData);

  req.onreadystatechange = function (resEvent) {
    console.log("inside here");
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        console.log("inside hereeeee");
        let responseJSON = JSON.parse(req.responseText);
        console.log(responseJSON);
        role = responseJSON[0].role;

        isLoggedIn = true;
        updateNavbar();

        if (isLoggedIn && role == "admin") {
          document.querySelector("#view-questions-section").style.display =
            "block";
        }

        document.querySelector("#login-section").style.display = "none";
        if (i >= 0) {
          revealEmail(i);
        }
      } else {
        console.log(" last here");
        //status code error
      }
    }
  };
  req.open("POST", "php/process-login.php");
  //   req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   req.send(`name=${personName.value}&email=${email.value}`);  req.send(`name=${personName.value}&email=${email.value}`);
  req.send(formData);
}

signupform.addEventListener("submit", (e) =>
  signupHandler(e, signupform.emailIndex)
);

loginform.addEventListener("submit", (e) =>
  loginHandler(e, loginform.emailIndex)
);

document.querySelector("#go-to-signup").addEventListener("click", () => {
  signupform.emailIndex = loginform.emailIndex;
  document.querySelector("#login-section").style.display = "none";
  signupform.style.display = "block";
  document.querySelector("#sign-up-section").style.display = "block";

  document
    .querySelector("#sign-up-section")
    .scrollIntoView({ behavior: "smooth", block: "center" });
});

let loginBtn = document.querySelector("#nav-login");
loginBtn.addEventListener("click", () => {
  loginform.style.display = "block";
  document.querySelector("#login-section").style.display = "block";
});
let logoutBtn = document.querySelector("#nav-logout");
logoutBtn.addEventListener("click", () => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        isLoggedIn = false;
        updateNavbar();
        window.location.reload();
      }
    }
  };
  xhr.open("GET", `php/logout.php`, true);
  xhr.send();
});

function updateNavbar() {
  let loginBtn = document.querySelector("#nav-login");
  let logoutBtn = document.querySelector("#nav-logout");
  if (!isLoggedIn) {
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
  } else {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
  }
}

document.querySelector(".take-test").addEventListener("click", () => {
  document.querySelector("#questions-section").style.display = "block";
});

document.querySelector(".take-test-btn").addEventListener("click", () => {
  document.querySelector("#questions-section").style.display = "block";
});

//administrator
document.querySelector("#view-questions-link").addEventListener("click", () => {
  updateNavbar();
  let xhrQuestions = new XMLHttpRequest();
  xhrQuestions.onreadystatechange = function () {
    if (xhrQuestions.readyState === XMLHttpRequest.DONE) {
      if (xhrQuestions.status == 200) {
        document.querySelector("#view-questions").style.display = "block";
        let data = JSON.parse(xhrQuestions.responseText);
        totalQuestions = data.length;
        viewQuestions(data);
      }
    }
  };

  xhrQuestions.open("GET", "php/get-questions.php", true);
  xhrQuestions.send();
});

function viewQuestions(questions) {
  let questionUl = document.querySelector("#view-questions");
  let questionIndex = 0;
  questions.forEach(function (question) {
    console.log(question);
    question.answered = false;

    let listquestion = document.createElement("li");
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let ul = document.createElement("ul");
    let addBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    addBtn.classList.add("secondary-btn");
    editBtn.classList.add("secondary-btn");
    deleteBtn.classList.add("secondary-btn");

    deleteBtn.textContent = "Delete";
    addBtn.textContent = "Add";
    editBtn.textContent = "Edit";
    deleteBtn.addEventListener("click", () => {
      let xhrQuestions = new XMLHttpRequest();
      xhrQuestions.onreadystatechange = function () {
        if (xhrQuestions.readyState === XMLHttpRequest.DONE) {
          if (xhrQuestions.status == 200) {
            console.log("hereee");

            let data = JSON.parse(xhrQuestions.responseText);
            console.log(data);
            window.location.reload();
          } else {
            console.log("theree", question["question-id"]);
          }
        }
      };
      xhrQuestions.open(
        "GET",
        `php/delete-question.php?question-id=${question["question-id"]}`,
        true
      );
      xhrQuestions.send();
    });

    // window.onload = function () {
    //   document.querySelector("#view-questions-link").click();
    // };

    for (let i = 0; i < 2; i++) {
      let option = document.createElement("li");
      let label = document.createElement("label");
      label.textContent = question[`option${i + 1}`];
      label.setAttribute("for", question["question-id"]);

      let input = document.createElement("input");
      input.name = question["question-id"];
      input.type = "radio";
      let img = document.createElement("img");

      img.src = question[`option${i + 1}-image`];
      img.alt = question[`option${i + 1}`];
      label.appendChild(input);
      option.appendChild(img);
      option.appendChild(input);
      option.appendChild(label);

      option.addEventListener("click", (e) => {
        handleClick(e, i, option, question);
      });
      ul.appendChild(option);
    }

    h2.textContent = question.question;

    questionUl.appendChild(listquestion);
    listquestion.appendChild(div);
    div.appendChild(h2);
    div.appendChild(ul);
    div.appendChild(addBtn);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    questionIndex++;
  });
}
