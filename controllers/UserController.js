class UserController{

    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
    
    }

    // Criando um metodo que percorre todo o formulario, pegamos dados do campos e cria um JSOn
    getValues(){
        //o let user faz essa variavel existir somente aqui
        let user = {}; 
        
        this.formEl.elements.forEach(function(field){

            if(field.name == "gender"){
               
                if(field.checked) {
        
                    user[field.name] = field.value ;
                
                }
                  
            }else{
                
                user[field.name] = field.value ;
                //user[name] = o valor do field
            }
        
        });
        
        return  new User(
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

    onSubmit(){
              
       this.formEl.addEventListener("submit", event=>{
    
            //cancela o comportamento padrão do submit, que é o envio. 
            event.preventDefault();

            let user = this.getValues();
            
            this.addLine(user)
        
        })

    }

    addLine(dataUser){

       
    
        this.tableEl.innerHTML = `
        
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
       
        
        `    
    }


}