class UserController {
    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }

    onSubmit() {
        this.formEl.addEventListener("submit", (event) => {
            //cancela o comportamento padrão do submit, que é o envio.
            event.preventDefault();

            let values = this.getValues();

            let btn = this.formEl.querySelector("[type=submit]")

            btn.disabled = true;

            this.getPhoto().then(
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
    getPhoto() {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter((item) => {
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
    getValues() {
        //o let user faz essa variavel existir somente aqui
        let user = {};
        let isValid = true;

        console.log(typeof this.formEl.elements);
        [...this.formEl.elements].forEach(function (field, index) {

            if(['name', 'email', 'password'].indexOf(field.name) >-1 && !field.value){

                field.parentElement.classList.add('has-error');
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

        if(!isValid){
            return false;
        }

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.passowrd,
            user.photo,
            user.admin
        );
    }

    //Cria uma função que adiciona uma linha na tabela
    addLine(dataUser) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>      
        
        `;

        this.tableEl.appendChild(tr);
    }
}
