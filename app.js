const addBtn = document.querySelector("#addBtn");
const textInput = document.querySelector("#textInput");
const lists = document.querySelector("#lists");
const total = document.querySelector("#total");
const doneTotal = document.querySelector("#doneTotal");
// const data = ["aaa", "bbb", "ccc", "ddd", "eee"];

const count = () => {
  const totalCount = lists.children.length;
  const doneTotalCount = [...lists.children].filter(
    (el) => el.querySelector(".form-check-input").checked === true
  ).length;
  total.innerText = totalCount;
  doneTotal.innerText = doneTotalCount;
};

window.addEventListener("load", count)

const createLi = (text) => {
  const li = document.createElement("li");
  const dynamicId = "flexCheck" + Math.random();
  // li.addEventListener("dblclick", editBtn);
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `<div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="${dynamicId}"
                      onclick="done(event)"
                    />
                    <label class="form-check-label" for="${dynamicId}">
                      ${text}
                    </label>
                  </div>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-dark" onclick="editBtn(event)">
                      <i class="bi bi-pencil pe-none"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-dark" onclick="delBtn(event)">
                      <i class="bi bi-trash3 pe-none"></i>
                    </button>
                  <div>`;
  return li;
};

const addList = () => {
  if (textInput.value.trim()) {
    lists.append(createLi(textInput.value));
    textInput.value = null;
    count();
  } else {
    alert("Input text is empty");
    textInput.value = null;
  }
};

const editBtn = (event) => {
  console.dir(event);
  const oldText = event.target.closest("li").querySelector(".form-check-label");
  const newText = prompt("Input New Text ...", oldText.innerText);
  if (newText && newText.trim()) {
    oldText.innerText = newText;
  } else {
    alert("New text cannot be empty");
  }
};

// data.forEach((d) => lists.append(createLi(d)));

const delBtn = (event) => {
  if (confirm("Are you sure want to delete ?")) {
    event.target.closest("li").remove();
    count();
  }
};

const done = (event) => {
  event.target.nextElementSibling.classList.toggle(
    "text-decoration-line-through"
  );
  count();
};

addBtn.addEventListener("click", addList);

textInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    addList();
  }
});
