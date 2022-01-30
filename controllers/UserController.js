class UserController {
  constructor(formIdCreate, formIdUpdate, tableId) {
    this.formEl = document.getElementById(formIdCreate);
    this.formEUpdateEl = document.getElementById(formIdUpdate);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
    this.onEdit();
  }

  onEdit() {
    document
      .querySelector("#box-user-update .btn-cancel")
      .addEventListener("click", (e) => {
        this.showPanelCreate();
      });

    this.formEUpdateEl.addEventListener("submit", (event) => {
      event.preventDefault();

      let btn = this.formEUpdateEl.querySelector("[type=submit]");

      btn.disabled = true;

      let values = this.getValues(this.formEUpdateEl);

      let index = this.formEUpdateEl.dataset.trIndex;

      let tr = this.tableEl.rows[index];

      let userOld = JSON.parse(tr.dataset.user);

      let result = Object.assign({}, userOld, values);

      tr.dataset.user = JSON.stringify(result);

      this.showPanelCreate();

      this.getPhoto(this.formEUpdateEl).then(
        (content) => {
          if (!values.photo) {
            result._photo = userOld._photo;
          } else {
            result._photo = content;
          }

          tr.innerHTML = `        
                    <td><img src="${
                      result._photo
                    }" alt="User Image" class="img-circle img-sm"></td>
                    <td>${result._name}</td>
                    <td>${result._email}</td>
                    <td>${result._admin ? "Sim" : "Não"}</td>          
                    <td>${Utils.dateFormat(result._register)}</td> 
                    <td>
                        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>      
                
                `;

          this.addEventsTr(tr);

          this.formEUpdateEl.reset();

          this.updateCount();

          btn.disabled = false;
        },
        (e) => {
          console.log(e);
        }
      );
    });
  }

  onSubmit() {
    this.formEl.addEventListener("submit", (event) => {
      //cancela o comportamento padrão do submit, que é o envio.
      event.preventDefault();

      let values = this.getValues(this.formEl);

      let btn = this.formEl.querySelector("[type=submit]");
      btn.disabled = true;

      if (!values) return false;
      this.getPhoto(this.formEl).then(
        (content) => {
          values.photo = content;
          this.addLine(values);
          this.formEl.reset();
          btn.disabled = false;
        },
        (e) => {
          console.log(e);
        }
      );
    });
  }

  //Metodo para Lê o caminho da foto
  getPhoto(formEl) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();

      let elements = [...formEl.elements].filter((item) => {
        if (item.name === "photo") {
          return item;
        }
      });

      let file = elements[0].files[0];

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      FileReader.onerror = (e) => {
        reject(e);
      };

      if (file) {
        fileReader.readAsDataURL(file);
      } else {
        resolve("dist/img/boxed-bg.jpg");
      }
    });
  }

  // Criando um metodo que percorre todo o formulario, pegamos dados do campos e cria um JSOn
  getValues(formEl) {
    //o let user faz essa variavel existir somente aqui
    let user = {};
    let isValid = true;
    // console.log(typeof this.formEl.elements);

    [...formEl.elements].forEach(function (field, index) {
      if (
        ["name", "email", "password"].indexOf(field.name) > -1 &&
        !field.value
      ) {
        field.parentElement.classList.add("has-error");
        isValid = false;
      }

      if (field.name == "gender") {
        if (field.checked) {
          user[field.name] = field.value;
        }
      } else if (field.name == "admin") {
        user[field.name] = field.checked;
      } else {
        user[field.name] = field.value;
        //user[name] = o valor do field
      }
    });

    if (!isValid) {
      return false;
    }

    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );
  }

  //Cria uma função que adiciona uma linha na tabela
  addLine(dataUser) {
    let tr = document.createElement("tr");

    tr.dataset.user = JSON.stringify(dataUser);

    tr.innerHTML = `
        
            <td><img src="${
              dataUser.photo
            }" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin ? "Sim" : "Não"}</td>          
            <td>${Utils.dateFormat(dataUser.register)}</td> 
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>      
        
        `;

    this.addEventsTr(tr);

    this.tableEl.appendChild(tr);

    this.updateCount();
  }

  addEventsTr(tr) {
    tr.querySelector(".btn-edit").addEventListener("click", (e) => {
      //Interpreta uma string JSON.Parse converte em Objeto JSON.
      let json = JSON.parse(tr.dataset.user);

      this.formEUpdateEl.dataset.trIndex = tr.sectionRowIndex;

      for (let name in json) {
        let field = this.formEUpdateEl.querySelector(
          "[name=" + name.replace("_", "") + "]"
        );

        if (field) {
          switch (field.type) {
            case "file":
              continue;
              break;
            case "radio":
              field = this.formEUpdateEl.querySelector(
                "[name=" + name.replace("_", "") + "][value=" + json[name] + "]"
              );
              field.checked = true;
              break;
            case "checkbox":
              field.checked = json[name];
              break;
            default:
              field.value = json[name];
          }
        }
      }
      this.formEUpdateEl.querySelector(".photo").src = json._photo;

      this.showPanelUpdate();
    });
  }

  updateCount() {
    let numberUsers = 0;
    let numberAdmin = 0;

    [...this.tableEl.children].forEach((tr) => {
      numberUsers++;

      let user = JSON.parse(tr.dataset.user);

      if (user._admin) numberAdmin++;
    });

    document.querySelector("#number-users").innerHTML = numberUsers;
    document.querySelector("#number-users-admin").innerHTML = numberAdmin;
  }
  showPanelUpdate() {
    document.querySelector("#box-user-update").style.display = "block";
    document.querySelector("#box-user-create").style.display = "none";
  }

  showPanelCreate() {
    document.querySelector("#box-user-update").style.display = "none";
    document.querySelector("#box-user-create").style.display = "block";
  }
}
