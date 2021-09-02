//=================== Search Input Field function Start
const searchInput = () => {
  const input = document.querySelector("#searchInput");
  const url = `https://openlibrary.org/search.json?q=${input.value}`;
  //=================== Error Message : When Your search Field is Empty
  if (input.value === "") {
    alert("You have to write something in input field.");
  }
  //=================== Api Calling
  fetch(url)
    .then((res) => res.json())
    .then((data) => searchResult(data.docs));
  input.value = "";
};


//===================== Search Result Function
const searchResult = (data) => {
  //=================== Error Message : when Your result no found
  if (data.length === 0) {
    alert("No Result Found. Please Try Again.");
  } else {
    const item = document.querySelector("#resultItem");
    const limit = data.slice(0, 12);
    item.innerHTML = `<h6 class='bg-danger rounded-pill text-white my-2 p-2 text-center'> There are ${data.length} numbers of books. Only ${limit.length} Books are shown here </h6> 
    `;

    const resultDiv = document.querySelector("#searchResult");
    //===========================================Clear Data
    resultDiv.innerHTML = "";
    limit.forEach((items) => {
      const {
        author_name,
        first_publish_year,
        publisher,
        author_alternative_name,
        cover_i,
        subject,
      } = items;
      let link = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
      let div = document.createElement("div");
      div.classList.add("card", "mb-4", "col-4");
      div.style.width = "18rem";
      div.innerHTML = `

      
      <img class='w-100 h-75 p-4 mx-auto ' src="${
        link ? link : ""
      }" class="card-img-top mx-auto" alt="..." />
      <div onclick='bookImage(${cover_i})' class="card-body">
        <h5 class="card-title ">${subject ? subject[0] : "Not Found"}</h5> 
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"> Author : ${
          author_name ? author_name[0] : "Not Found"
        }</li>
        <li class="list-group-item">Publisher : ${
          publisher ? publisher[0] : "Not found"
        }</li>
        <li class="list-group-item">${
          first_publish_year ? first_publish_year : "---"
        }</li>
      </ul>
      
      `;
      resultDiv.appendChild(div);
    });
  }
};

//========================Click Event Handler Functionn
const bookImage = (item) => {
  console.log(item);
  let link = `https://covers.openlibrary.org/b/id/${item}-M.jpg`;
  const image = document.querySelector("#detailcard");
  //======================== clear Data
  image.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card mx-auto my-4" style="width: 20rem;">
  <img src="${link}" class="card-img-top" alt="...">

</div>
  `;
  image.appendChild(div);
};

//============================================== Extra Work Using Table. Please Check

// const searchResult = (data) => {
//   if (data.length === 0 ) {
//     alert("No Result Found. Please Try Again.");
//   } else {
//     const item = document.querySelector("#resultItem");
//     item.innerHTML = `<h6> There are ${data.length} numbers of books.</h6> `;

//     const resultDiv = document.querySelector("#tableBody");
//     resultDiv.innerHTML = "";
//     data.forEach((items) => {
//       const {
//         author_name,
//         first_publish_year,
//         publisher,
//         author_alternative_name,
//         cover_i,
//         subject,
//       } = items;
//       let tableRow = document.createElement("tr");
//       tableRow.innerHTML = `
//         <th scope="row">${subject ? subject[0] : ""}</th>
//         <td >${author_name ? author_name[0] : ""}</td>
//         <td>${publisher ? publisher[0] : ""}</td>
//         <td>${first_publish_year ? first_publish_year : ""}</td>
//         <td> <button onclick='bookImage(${cover_i})' class='btn btn-primary'>Click Me</button></td>
//       `;
//       resultDiv.appendChild(tableRow);
//     });
//   }
// };
