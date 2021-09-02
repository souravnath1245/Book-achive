const searchInput = () => {
  const input = document.querySelector("#searchInput");
  const url = `http://openlibrary.org/search.json?q=${input.value}`;
  if (input.value === "") {
    alert("You have to write something in input field.");
  }
  fetch(url)
    .then((res) => res.json())
    .then((data) => searchResult(data.docs));
  input.value = "";
};

const searchResult = (data) => {
  if (data.length === 0) {
    alert("No Result Found. Please Try Again.");
  } else {
    const item = document.querySelector("#resultItem");
    item.innerHTML = `<h6> There are ${data.length} numbers of books.</h6> `;

    const resultDiv = document.querySelector("#searchResult");
    resultDiv.innerHTML = "";
    data.forEach((items) => {
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
      div.classList.add("card", "mb-4");
      div.style.width = "18rem";
      div.innerHTML = `

      
      <img src="${link}" class="card-img-top mx-auto" alt="..." />
      <div onclick='bookImage(${cover_i})' class="card-body">
        <h5 class="card-title ">${subject ? subject[0] : ""}</h5>
        
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"> Author : ${
          author_name ? author_name[0] : ""
        }</li>
        <li class="list-group-item">Publisher : ${
          publisher ? publisher[0] : ""
        }</li>
        <li class="list-group-item">${
          first_publish_year ? first_publish_year : ""
        }</li>
      </ul>
      
      `;
      resultDiv.appendChild(div);
    });
  }
};

const bookImage = (item) => {
  console.log(item);
  let link = `https://covers.openlibrary.org/b/id/${item}-M.jpg`;
  const image = document.querySelector("#detailcard");
  image.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card mx-auto" style="width: 20rem;">
  <img src="${link}" class="card-img-top" alt="...">

</div>
  `;
  image.appendChild(div);
};


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
